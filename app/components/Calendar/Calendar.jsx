"use strict"
import dom from '../../utils/dom'
import gcal from '../../utils/gcal'
import {log} from '../../utils/logger'
import CalendarDrawer from 'CalendarDrawer'

import {renderCalendar,populateGoogleDates} from '../../utils/calendar-utils'

gcal.getEvents()
  .then(function (events) {
    console.log('got events!', events);
  })


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {
  renderCal(state.sources);
  return (
      <section>
        <CalendarDrawer state={state}></CalendarDrawer>
        <div id="calendar" />
      </section>
  );
}

function renderCal(sources){
  setTimeout(renderCalendar,14,sources);
}



