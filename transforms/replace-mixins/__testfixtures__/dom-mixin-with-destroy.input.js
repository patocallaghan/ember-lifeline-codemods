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
