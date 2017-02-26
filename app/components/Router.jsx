import dom from '../utils/dom'
import {dispatch} from '../index'

/**
 * @member Link
 * @memberOf app.components.Router
 *
 * @example
 *     ```jsx
 *         const menuLink = route => <Link state={state} route={route}>Goto Main</Link>
 *     ```
 *
 * @param {object} [state] pass state in and link will check the active route
 *                         in state and apply an 'active' css class if your route
 *                         param matches
 * @param {string} route   The name of the route to navigate to, there should be a
 *                         Route component somewhere in app that also has the same
 *                         route name you pass to the Link
 * @param {string} innerContent the text or markup to nest inside the <a> tag of link
 *
 * @returns {VNode}
 * @constructor
 */
export const Link = ({state = {}, dispatch, route = ''}, innerContent = ['']) => {
  const currentRoute = state.router ? state.router.route : ''
  const active       = route === currentRoute

  const navEvent = navigateToRoute(route)
  return (
    <a dataset={{route}} className={active ? 'active' : ''} onclick={navEvent}>
      {innerContent}
    </a>
  )
}

/**
 * @member Route
 * @memberOf app.components.Router
 *
 * This component contains the content for a specific route. Multiple routes can point
 * to the same route name so you could use different Route elements for different parts
 * of a template
 *
 * @example
 *     ```jsx
 *         const Page = ({state, dispatch}) => {
 *
 *           return (
 *             <div>
 *               <Route state={state} dispatch={dispatch} component={YourComponent}/>
 *             </div>
 *           )
 *         }
 *     ```
 *
 * @param state
 * @param dispatch
 * @param route
 * @param component
 * @param innerContent
 * @returns {*}
 * @constructor
 */
export const Route = ({state = {}, dispatch, route = '', component} = {}, innerContent) => {

  const currentRoute = state.router ? state.router.route : ''

  return (currentRoute === route) ? (
      <article dataset={{route}}>
        {component({state, dispatch}, innerContent)}
      </article>
    ) : null
}


/**
 * Create a navigation event function for clicks in Link
 * @param route
 * @returns {function()}
 */
function navigateToRoute (route) {
  return () => dispatch({type: 'NAVIGATE', value: route})
}


export default {Route, Link}
