import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', event => {
      // something
    });
  },

  destroy() {
    this._super(...arguments);
  }
});