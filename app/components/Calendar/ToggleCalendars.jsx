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

	return (
		<section>
			<div className="toggle-form-container">
				<div className="form-inline">
					<div className="toggle-wrapper" onclick={() => {
						let boxes = jQuery("[id*='input-']");
						const checkedBoxes = boxes.filter((box) => {
						console.log(boxes[box].checked);
							return !boxes[box].checked;
						});
						if(checkedBoxes.length > 0){
							return dispatch({type: 'TOGGLEROOMS', value: 'show'});
						} else {
							return dispatch({type: 'TOGGLEROOMS', value: 'hide'});
						}
					}}>

						<span><input id="input-1" type="checkbox" checked={state.sources[0].visible} onchange={toggleRoom(state.sources[0])}/><span className="checkboxText">The Library</span></span>

						<span><input id="input-2" type="checkbox" checked={state.sources[1].visible} onchange={toggleRoom(state.sources[1])}/><span className="checkboxText">Cesar Chavez</span></span>

						<span><input id="input-3" type="checkbox" checked={state.sources[2].visible} onchange={toggleRoom(state.sources[2])}/><span className="checkboxText">Rosa Parks</span></span>

						<span><input id="input-4" type="checkbox" checked={state.sources[3].visible} onchange={toggleRoom(state.sources[3])}/><span className="checkboxText">Nelson Mandela</span></span>

						<span className={state.showAllToggles}><input id="toggle-all" type="checkbox" onchange={(e) => {
								if(e.target.checked){
								console.log('target',e.target);
								jQuery('#toggle-all').prop('checked', false);
									return (
										state.sources.forEach((room) => {
											if(!room.visible){
												jQuery('#input-'+room.room).prop('checked', true);
											}

											dispatch({type: 'TOGGLEROOMS', value: 'hide'});
										})
									)
								}
							}
						}/><span className="checkboxText">Show All</span></span>
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
function toggleAllRooms(rooms) {

	return () => {
		rooms.forEach((room) => {
			if(!room.visible){
				jQuery('#input-'+room.room).prop('checked', 'true');

			}
		});
	}
}

jQuery(document).ready(function($) {
	displayCalendarFilter();
});


