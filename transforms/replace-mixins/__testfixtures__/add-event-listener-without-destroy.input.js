import DomMixin from 'ember-lifeline/mixins/dom';
import OtherMixin from 'other-mixin';
import Component from '@ember/component';

export default Component.extend(DomMixin, OtherMixin, {
  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'mouseover', event => {
      console.log(event);
    });
  }
});
