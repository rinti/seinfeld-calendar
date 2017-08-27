import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleActive() {
      this.set('day.active', !this.get('day.active'))
      let store = JSON.parse(localStorage.getItem('calendar')) || {}
      store[this.get('day.key')] = this.get('day.active')
      localStorage.setItem('calendar', JSON.stringify(store))
    }
  }
});
