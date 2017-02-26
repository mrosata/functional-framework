"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {calendarEvents}}) => {

  return (
    <section>
      <div id="calendar" />
    </section>
  )
}


jQuery(document).ready(function($) {
  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    header: { right: 'month,agendaWeek,agendaDay' }, // buttons for switching between views

    googleCalendarApiKey: 'AIzaSyBKBzjJk06ARQsT8l1GuQSDfyppuIJEBjg',
    eventSources: [{
      googleCalendarId: 'ao2er574u284sfcoig545dp4vc@group.calendar.google.com',
      className: 'gcal-event'
    }],
    dayClick: function() {
      log('a day has been clicked!');
    }
  })
});
