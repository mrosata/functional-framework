"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import ToggleCalendar from 'ToggleCalendars'

import {renderCalendar,populateGoogleDates} from '../../utils/calendar-utils'



/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {sources,calendarEvents,route}}) => {
  return (
      <section>
        <ToggleCalendar state={sources}></ToggleCalendar>
        <div id="calendar" onload={renderCal(sources)} />
      </section>
  );
}

function renderCal(sources){
  setTimeout(renderCalendar,14,sources);
}


