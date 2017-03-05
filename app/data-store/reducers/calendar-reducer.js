/**
 * Created by markgrover on 2/27/17.
 */
import {dispatch} from '../../index'
import {renderCalendar,populateGoogleDates, toggleCalendars,renderEventsOnNavigate} from '../../utils/calendar-utils'
/**
 * This Reducer is for the Calendar and any actions that stem from its views.
 *
 * @param state      - the current app state
 * @param action     - an action {type: string, action: mixed}
 * @returns {object} - the new app state (or the old state if no change)
 */
export default (state = {}, action) => {

    switch (action.type) {

        case 'NAVIGATE':
            if (state.router.route == 'index') {
                setTimeout(renderCalendar,1,state.sources);
                setTimeout(renderEventsOnNavigate,1,state.sources);
            }
            return state;

        case 'TOGGLEROOM1':
            Object.assign({}, state, state.sources[0].visible = !action.value.visible );
            toggleCalendars(action.value,action.value.visible);
            return state;

        case 'TOGGLEROOM2':
            Object.assign({}, state, state.sources[1].visible = !action.value.visible );
            toggleCalendars(action.value,action.value.visible);
            return state;

        case 'TOGGLEROOM3':
            Object.assign({}, state, state.sources[2].visible = !action.value.visible );
            toggleCalendars(action.value,action.value.visible);
            return state;

        case 'TOGGLEROOM4':
            Object.assign({}, state, state.sources[3].visible = !action.value.visible );
            toggleCalendars(action.value,action.value.visible);
            return state;

        default:
            // @desc Always have a default to return state object
            return state
    }
}
