"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import {dispatch} from '../../index'


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

							<input id="input-1" type="checkbox" checked={state.room1.visible} onchange={sendalert(state.room1, myDisp)}/><span className="checkboxText">The Library</span>

							<input id="input-2" type="checkbox" checked={state.room2.visible} onchange={sendalert(state.room2, myDisp)}/><span className="checkboxText">Cesar Chavez</span>

							<input id="input-3" type="checkbox" checked={state.room3.visible} onchange={sendalert(state.room3, myDisp)}/><span className="checkboxText">Rosa Parks</span>

					</div>
				</div>
			</div>

		</section>
	)
}
jQuery(document).ready(function($) {
	$('#input-1').checkboxpicker({
		html: true,
		offLabel: '<span class="glyphicon glyphicon-remove">',
		onLabel: '<span class="glyphicon glyphicon-ok">',
		baseCls: 'btn btn-xs'
	});
	$('#input-2').checkboxpicker({
		html: true,
		offLabel: '<span class="glyphicon glyphicon-remove">',
		onLabel: '<span class="glyphicon glyphicon-ok">',
		baseCls: 'btn btn-xs'
	});
	$('#input-3').checkboxpicker({
		html: true,
		offLabel: '<span class="glyphicon glyphicon-remove">',
		onLabel: '<span class="glyphicon glyphicon-ok">',
		baseCls: 'btn btn-xs'
	});
});

function sendalert(room,dispatch) {
	return () => {
			dispatch({type: `TOGGLEROOM${room.room}`, value: room})
		}
	}


