import { addEventListener, runDisposables } from "ember-lifeline";
import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    addEventListener(this, this.element, 'mouseover', event => {
      // something
    });
    this.addEventListener(this.element, 'mouseover', event => {
      // something
    });
  },

  destroy() {
    this._super(...arguments);
    runDisposables(this);
  }
});