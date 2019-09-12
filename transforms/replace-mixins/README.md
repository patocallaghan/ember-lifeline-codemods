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
* [dom-mixin-existing-usage](#dom-mixin-existing-usage)
* [dom-mixin-with-destroy](#dom-mixin-with-destroy)
* [dom-mixin-without-destroy](#dom-mixin-without-destroy)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="dom-mixin-existing-usage">**dom-mixin-existing-usage**</a>

**Input** (<small>[dom-mixin-existing-usage.input.js](transforms/replace-mixins/__testfixtures__/dom-mixin-existing-usage.input.js)</small>):
```js
import { addEventListener, removeEventListener, runDisposables } from 'ember-lifeline';
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  someFunction(event) {
    console.log(event);
  },

  didInsertElement() {
    this._super(...arguments);

    addEventListener(this, this.element, 'mouseover', this.someFunction);
    this.addEventListener(this.element, 'mouseover', this.someFunction);

    removeEventListener(this, this.element, 'mouseover', this.someFunction);
    this.removeEventListener(this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```

**Output** (<small>[dom-mixin-existing-usage.output.js](transforms/replace-mixins/__testfixtures__/dom-mixin-existing-usage.output.js)</small>):
```js
import { addEventListener, removeEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  someFunction(event) {
    console.log(event);
  },

  didInsertElement() {
    this._super(...arguments);

    addEventListener(this, this.element, 'mouseover', this.someFunction);
    addEventListener(this, this.element, 'mouseover', this.someFunction);

    removeEventListener(this, this.element, 'mouseover', this.someFunction);
    removeEventListener(this, this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
---
<a id="dom-mixin-with-destroy">**dom-mixin-with-destroy**</a>

**Input** (<small>[dom-mixin-with-destroy.input.js](transforms/replace-mixins/__testfixtures__/dom-mixin-with-destroy.input.js)</small>):
```js
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  someFunction(event) {
    console.log(event);
  },
  
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', this.someFunction);
    this.removeEventListener(this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
  }
});

```

**Output** (<small>[dom-mixin-with-destroy.output.js](transforms/replace-mixins/__testfixtures__/dom-mixin-with-destroy.output.js)</small>):
```js
import { addEventListener, removeEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  someFunction(event) {
    console.log(event);
  },
  
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', this.someFunction);
    removeEventListener(this, this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
---
<a id="dom-mixin-without-destroy">**dom-mixin-without-destroy**</a>

**Input** (<small>[dom-mixin-without-destroy.input.js](transforms/replace-mixins/__testfixtures__/dom-mixin-without-destroy.input.js)</small>):
```js
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  someFunction(event) {
    console.log(event);
  },
  
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', this.someFunction);
    this.removeEventListener(this.element, 'mouseover', this.someFunction);
  },
});

```

**Output** (<small>[dom-mixin-without-destroy.output.js](transforms/replace-mixins/__testfixtures__/dom-mixin-without-destroy.output.js)</small>):
```js
import { addEventListener, removeEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(OtherMixin, {
  someFunction(event) {
    console.log(event);
  },

  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', this.someFunction);
    removeEventListener(this, this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});

```
<!--FIXTURES_CONTENT_END-->