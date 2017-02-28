/**
 * Created by markgrover on 2/27/17.
 */
import renderCalendar from '../../utils/calendar-utils'
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
                // page is now ready, initialize the calendar...
                setTimeout(renderCalendar, 0);
            }

        default:
            // @desc Always have a default to return state object
            return state
    }
}
