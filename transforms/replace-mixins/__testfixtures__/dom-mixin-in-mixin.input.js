import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Mixin from '@ember/object/mixin';

export default Mixin.create(DomMixin, OtherMixin, {
  someFunction(event) {
    console.log(event);
  },

  init() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', this.someFunction);
    this.removeEventListener(this.element, 'mouseover', this.someFunction);
  },
});
