"use strict"
import dom from '../../utils/dom'
import gcal from '../../utils/gcal'
import {log} from '../../utils/logger'
import ToggleCalendar from 'ToggleCalendars'

import {renderCalendar,populateGoogleDates} from '../../utils/calendar-utils'

gcal.getEvents()
  .then(function (events) {
    // UNCOMMENT THE LINE BELOW TO SEE HUNDREDS OF EVENTS!!
    //console.log('got events!', events);
  })

/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {sources,calendarEvents,route}}) => {
  renderCal(sources);
  return (
      <section>
        <ToggleCalendar state={sources}></ToggleCalendar>
        <div id="calendar" />
      </section>
  );
}

function renderCal(sources){
  setTimeout(renderCalendar,14,sources);
}



