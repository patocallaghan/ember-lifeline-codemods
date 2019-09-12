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
