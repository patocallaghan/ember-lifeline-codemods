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
