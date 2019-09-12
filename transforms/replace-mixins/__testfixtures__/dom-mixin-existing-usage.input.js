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
