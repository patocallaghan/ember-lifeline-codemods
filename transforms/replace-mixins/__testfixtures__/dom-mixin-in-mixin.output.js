import { addEventListener, removeEventListener, runDisposables } from 'ember-lifeline';
import OtherMixin from 'other-mixin';
import Mixin from '@ember/object/mixin';

export default Mixin.create(OtherMixin, {
  someFunction(event) {
    console.log(event);
  },

  init() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', this.someFunction);
    removeEventListener(this, this.element, 'mouseover', this.someFunction);
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});
