import { addEventListener, runDisposables } from "ember-lifeline";
import OtherMixin from 'other-mixin';

export default Component.extend(OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      // something
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});