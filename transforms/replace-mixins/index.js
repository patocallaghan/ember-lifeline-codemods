const { getParser } = require('codemod-cli').jscodeshift;

const OPTS = {
  quote: 'single',
};

module.exports = function transformer(file, api) {
  const j = getParser(api);

  let code;
  let usesDomMixin = j(file.source).find(j.ImportDeclaration, path => {
    return path.specifiers.find(specifier => specifier.local.name === 'DomMixin');
  });

  if (!usesDomMixin.length) {
    return file.source;
  }

  if (usesDomMixin.length) {
    code = j(file.source)
      .find(j.CallExpression, {
        callee: {
          object: {
            type: 'ThisExpression',
          },
          property: {
            name: 'addEventListener',
          },
        },
      })
      .forEach(path => {
        let args = path.value.arguments;
        let newArgs = [j.identifier('this'), ...args];
        j(path).replaceWith(j.callExpression(j.identifier('addEventListener'), newArgs));
      })
      .toSource(OPTS);

    let hasEventsListenerImport = Boolean(
      j(file.source).find(j.ImportSpecifier, path => {
        return path.local.name === 'addEventListener';
      }).length,
    );
    code = j(code)
      .find(j.ImportDeclaration, {
        source: {
          value: 'ember-lifeline/mixins/dom',
        },
      })
      .forEach(path => {
        if (hasEventsListenerImport) {
          path.prune();
        } else {
          j(path).replaceWith(
            j.importDeclaration(
              [
                j.importSpecifier(j.identifier('addEventListener'), j.identifier('addEventListener')),
                j.importSpecifier(j.identifier('runDisposables'), j.identifier('runDisposables')),
              ],
              j.literal('ember-lifeline'),
            ),
          );
        }
      })
      .toSource(OPTS);
  }

  // remove DomMixin injection
  code = j(code)
    .find(j.CallExpression, {
      callee: {
        property: {
          name: 'extend',
        },
      },
    })
    .forEach(path => {
      path.value.arguments = path.value.arguments.filter(
        arg => arg.type !== 'Identifier' || (arg.type === 'Identifier' && arg.name !== 'DomMixin'),
      );
    })
    .toSource(OPTS);

  // Do we need to add `runDisposables`?
  let usesRunDisposables = j(code).find(j.CallExpression, {
    callee: {
      name: 'runDisposables',
    },
  });

  if (!usesRunDisposables.length) {
    let injectedRunDisposables = false;
    let runDisposableCall = j.callExpression(j.identifier('runDisposables'), [j.identifier('this')]);

    // inject `runDisposables` if `destroy` exists
    code = j(code)
      .find(j.ObjectMethod, {
        key: {
          name: 'destroy',
        },
      })
      .forEach(path => {
        injectedRunDisposables = true;
        let callExp = j.expressionStatement(runDisposableCall);
        path.value.body.body.push(callExp);
      })
      .toSource(OPTS);

    if (!injectedRunDisposables) {
      // inject `runDisposables` if `destroy` does not exist
      code = j(code)
        .find(j.ExportDefaultDeclaration, {
          declaration: {
            callee: {
              property: {
                name: 'extend',
              },
            },
          },
        })
        .forEach(path => {
          let ObjExp = path.value.declaration.arguments.find(arg => arg.type === 'ObjectExpression');
          let superCall = j.callExpression(j.memberExpression(j.thisExpression(), j.identifier('_super')), [
            j.identifier('...arguments'),
          ]);
          let prop = j.property(
            'init',
            j.identifier('destroy'),
            j.functionExpression(
              j.identifier('destroy'),
              [],
              j.blockStatement([j.expressionStatement(superCall), j.expressionStatement(runDisposableCall)]),
            ),
          );
          prop.method = true;
          let index = ObjExp.properties.findIndex(prop =>
            ['init', 'didInsertElement'].includes(prop.key.name),
          );
          if (index > -1) {
            ObjExp.properties.splice(index + 1, 0, prop);
          } else {
            ObjExp.properties.push(prop);
          }
        })
        .toSource(OPTS);
    }
  }

  return code;
};
