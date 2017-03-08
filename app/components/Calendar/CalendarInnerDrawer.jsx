"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'

import ToggleCalendar from 'ToggleCalendars'

/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {
	if(!state.calendarDrawer){
		return (
				<div className={state.calendarDrawer} id="collapseExample">
					<div className="card card-block">
						<ToggleCalendar state={state} />
					</div>
				</div>
				)
	}};