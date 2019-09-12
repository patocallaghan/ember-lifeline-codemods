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
