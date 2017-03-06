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
export default ({state, dispatch}) => {

	return (
		<section>
			<div className="toggle-form-container">
				<div className="form-inline">
					<div className="toggle-wrapper">

							<span><input id="input-1" type="checkbox" checked={state[0].visible} onchange={toggleRoom(state[0])}/><span className="checkboxText">The Library</span></span>

							<span><input id="input-2" type="checkbox" checked={state[1].visible} onchange={toggleRoom(state[1])}/><span className="checkboxText">Cesar Chavez</span></span>

							<span><input id="input-3" type="checkbox" checked={state[2].visible} onchange={toggleRoom(state[2])}/><span className="checkboxText">Rosa Parks</span></span>

							<span><input id="input-4" type="checkbox" checked={state[3].visible} onchange={toggleRoom(state[3])}/><span className="checkboxText">Nelson Mandela</span></span>

					</div>
				</div>
			</div>

		</section>
	)
}


function toggleRoom(room) {
	return () => {
			dispatch({type: 'TOGGLEROOM', value: room})
		}
}
jQuery(document).ready(function($) {
	displayCalendarFilter();
});


