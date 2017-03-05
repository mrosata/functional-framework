"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import {dispatch} from '../../index'
import {displayCalendarFilter} from '../../utils/calendar-utils'

/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {
const myDisp = dispatch;
	return (
		<section>
			<div className="toggle-form-container">
				<div className="form-inline">
					<div className="toggle-wrapper">

							<input id="input-1" type="checkbox" checked={state[0].visible} onchange={sendalert(state[0], myDisp)}/><span className="checkboxText">The Library</span>

							<input id="input-2" type="checkbox" checked={state[1].visible} onchange={sendalert(state[1], myDisp)}/><span className="checkboxText">Cesar Chavez</span>

							<input id="input-3" type="checkbox" checked={state[2].visible} onchange={sendalert(state[2], myDisp)}/><span className="checkboxText">Rosa Parks</span>

							<input id="input-4" type="checkbox" checked={state[3].visible} onchange={sendalert(state[3], myDisp)}/><span className="checkboxText">Nelson Mandela</span>

					</div>
				</div>
			</div>

		</section>
	)
}


function sendalert(room,dispatch) {
	return () => {
			dispatch({type: `TOGGLEROOM${room.room}`, value: room})
		}
}
jQuery(document).ready(function($) {
	displayCalendarFilter();
});


