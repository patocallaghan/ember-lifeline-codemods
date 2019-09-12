# replace-mixins


## Usage

```
npx ember-lifeline-codemods replace-mixins path/of/files/ or/some**/*glob.js

# or

yarn global add ember-lifeline-codemods
ember-lifeline-codemods replace-mixins path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [add-event-listener-existing-usage](#add-event-listener-existing-usage)
* [add-event-listener-with-destroy](#add-event-listener-with-destroy)
* [add-event-listener-without-destroy](#add-event-listener-without-destroy)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="add-event-listener-existing-usage">**add-event-listener-existing-usage**</a>

**Input** (<small>[add-event-listener-existing-usage.input.js](transforms/replace-mixins/__testfixtures__/add-event-listener-existing-usage.input.js)</small>):
```js
import { addEventListener, runDisposables } from 'ember-lifeline';
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      console.log(event);
    });
    this.addEventListener(this.element, 'mouseover', event => {
      console.log(event);
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```

**Output** (<small>[add-event-listener-existing-usage.output.js](transforms/replace-mixins/__testfixtures__/add-event-listener-existing-usage.output.js)</small>):
```js
import { addEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      console.log(event);
    });
    addEventListener(this, this.element, 'mouseover', event => {
      console.log(event);
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
---
<a id="add-event-listener-with-destroy">**add-event-listener-with-destroy**</a>

**Input** (<small>[add-event-listener-with-destroy.input.js](transforms/replace-mixins/__testfixtures__/add-event-listener-with-destroy.input.js)</small>):
```js
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', event => {
      console.log(event);
    });
  },

  destroy() {
    this._super(...arguments);
  }
});

```

**Output** (<small>[add-event-listener-with-destroy.output.js](transforms/replace-mixins/__testfixtures__/add-event-listener-with-destroy.output.js)</small>):
```js
import { addEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      console.log(event);
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
---
<a id="add-event-listener-without-destroy">**add-event-listener-without-destroy**</a>

**Input** (<small>[add-event-listener-without-destroy.input.js](transforms/replace-mixins/__testfixtures__/add-event-listener-without-destroy.input.js)</small>):
```js
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', event => {
      console.log(event);
    });
  }
});

```

**Output** (<small>[add-event-listener-without-destroy.output.js](transforms/replace-mixins/__testfixtures__/add-event-listener-without-destroy.output.js)</small>):
```js
import { addEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      console.log(event);
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
<!--FIXTURES_CONTENT_END-->