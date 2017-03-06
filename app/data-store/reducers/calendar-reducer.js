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
            } else {
                const updatedSources = state.sources.map((source) => {
                    source.added = false;
                    return source;
                });
                return Object.assign({}, state, {sources:updatedSources});
            }
            return state;

        case 'TOGGLEROOM':
            const {value: {visible, room, added}} = action;
            const {sources} = state;
            const idx = room - 1;
            const newRoom = Object.assign({}, sources[idx], {visible: !visible, added: !added});
            const newSources = [].concat(sources.slice(0, idx), newRoom, sources.slice(idx+1));

            const newState = Object.assign({}, state, {sources:newSources});

            toggleCalendars(newState.sources[idx],newState.sources[idx].visible);
            return newState;

        case 'SOURCETOGGLED':
            const mySources = state.sources;
            const idX = action.value;
            const isAdded = !mySources[idX].added;
            const activeRoom = Object.assign({}, state,{added: isAdded});

            const newSourceArr = [].concat(mySources.slice(0, idX - 1),activeRoom, mySources.slice(idX));
            return Object.assign({}, state, {sources:newSourceArr});



        default:
            // @desc Always have a default to return state object
            return state
    }
}
