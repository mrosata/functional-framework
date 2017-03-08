"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import CalendarDrawer from 'CalendarDrawer'

import {renderCalendar,populateGoogleDates} from '../../utils/calendar-utils'
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



