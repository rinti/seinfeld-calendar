import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    let now = moment()
    let months = []

    for(let j=0; j<5; j++) {
      let month = j===0 ? now.clone() : now.clone().add(j, 'months')

      let firstDayOfMonth = month.clone().startOf('month')
      let lastDayOfMonth = month.clone().endOf('month')
      let daysDiff = lastDayOfMonth.diff(firstDayOfMonth, 'days')
      let days = []
      let pad;
      let day = firstDayOfMonth.day()

      if(day === 0) {
        pad = 7
      } else if (day === 1) {
        pad = 0
      } else {
        pad = day
      }

      for(let x=0; x < pad; x++) {
        days.push({
          date: moment(),
          hidden: true,
        })
      }

      const getActive = (key) => {
        let store = JSON.parse(localStorage.getItem('calendar'))
        if(store) {
          return store[key]
        }
        return false;
      }

      for(let i=0; i < daysDiff; i++) {
        let start = month.clone().startOf('month');
        let key = start.clone().add(i, 'days').format('YYYY-MM-DD')
        days.push({
          key,
          date: start.clone().add(i, 'days'),
          active: getActive(key),
        })
      }

      months.push({month, days})
    }

    return months
  }
});
