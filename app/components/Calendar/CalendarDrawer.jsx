"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import CalendarInnerDrawer from 'CalendarInnerDrawer'
import {dispatch} from '../../index'
import {displayCalendarFilter} from '../../utils/calendar-utils'



/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {

	return (
		<div>
			<p className="glyph-container">
				<a visited="true"  ariaExpanded="false" ariaControls="collapseExample" onclick={() => {
					if(state.calendarDrawer === 'collapse'){
						return (
						dispatch({type: 'TOGGLEDRAWER', value: ''}),
						displayCalendarFilter(),

							jQuery('.glyphicon-chevron-down').toggleClass('hide'),
							jQuery('.glyphicon-chevron-up').toggleClass('hide')

						)
					} else {
						return (
							dispatch({type: 'TOGGLEDRAWER', value: 'collapse'}),
							jQuery('.glyphicon-chevron-down').toggleClass(state.showAllToggles),
							jQuery('.glyphicon-chevron-up').toggleClass(state.showAllToggles)
						)
					}

				}}>

					<span className="glyphicon glyphicon-cog"></span> Settings</a>
			</p>
			<CalendarInnerDrawer state={state} />

		</div>
	);
}