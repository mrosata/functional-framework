"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'

import jquery from 'jquery'
import fullCalendar from 'fullcalendar'

// A class to shape events (feel free to hack away)
import DemoEvent from '../utils/democracy-event-class.js'

function getEventsFromFirebase() {
  // Get the events from firebase
  return new Promise((resolve, reject) => {
    return DemoEvent.ref().on('value', (snapshot) => {
      // map the events from firebase snapshot into DemoEvent class instances
      try {
        let events = []
        snapshot.forEach(snap => {
          events.push(DemoEvent.fromFirebaseSnapshot(snap))
        })

        return resolve(events)
      }
      catch(e) {return reject(e)}

    })
  })
}


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {calendarEvents}, dispatch}) => {

  getEventsFromFirebase().then(evts => {
    log('calendarEvents', evts)
  })

  return (
    <section>
      <div id="calendar" />
    </section>
  )
}


jquery(document).ready(function($) {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
      header: { right: 'month,agendaWeek,agendaDay' }, // buttons for switching between views

      dayClick: function() {
        log('a day has been clicked!');
        // $('#calendar').fullCalendar( 'changeView', 'basicDay' )
    }
        // put your options and callbacks here
    })
});
