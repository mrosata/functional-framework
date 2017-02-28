"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'
import renderCalendar from '../utils/calendar-utils'



/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {calendarEvents,route}}) => {

  return (
      <section>
        <div id="calendar" />
      </section>
  )
}

// Loades the calendar if the main view is the calendar view when the document loads.
jQuery(document).ready(function($) {
  // page is now ready, initialize the calendar...
  // Method call stems from our utils/calendar-utils.js file imported above
  renderCalendar();
});
