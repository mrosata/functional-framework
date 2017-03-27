const DEFAULT_ROUTE = 'index'

/**
 * Action to handle navigation to another route. This also updates the
 * state of browser history
 *
 * @param state
 * @param action
 * @returns {*}
 */
function configureStateRouter(state={}, action) {
  const currentRoute = action.value || DEFAULT_ROUTE
  const prevRoute = state.router ? state.router.route : DEFAULT_ROUTE

  if (currentRoute !== prevRoute && window.history) {
    // Update the current history in browser
    const {pathname, search} = window.location
    window.history.pushState({}, '', `${pathname}${search}#${currentRoute}`)
  }
  return Object.assign({}, state, {router: {route: currentRoute}})
}


/**
 * To get the initial route when page loads
 *
 * @param location
 * @returns {{route: *}}
 */
export const getInitialRouter = (location = {hash: ''}) => {
  const hash = location.hash
  return {route: routeFromHash(hash)}
}


/**
 * Get the route name from a hash string
 * @param hash
 * @param defaultRoute
 * @returns {string}
 */
function routeFromHash(hash = '#', defaultRoute = DEFAULT_ROUTE) {
  const [, route=defaultRoute] = [].concat(/^#?([a-z0-9\-]+)/i.exec(hash), defaultRoute)
  return route
}


/**
 * Setup the history mechanism. This should be called on app initialization
 *
 * @param dispatch
 * @param environment the window
 */
export const setupRouterPopstate = (dispatch, environment = {}) => {
  environment.onpopstate = function(evt) {
    if (environment && environment.location) {
      const {hash} = environment.location || '#'
      dispatch({type: 'NAVIGATE_FROM_POPSTATE', value: hash})
    }
    return evt
  }

  environment.history.replaceState({ path: window.location.href }, '')
}


/**
 * Router Reducer
 * @module
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {

  switch (action.type) {
    /**
     * Takes a route name and set router.route to that name
     */
    case 'NAVIGATE':
      return configureStateRouter(state, action)

    /**
     * Takes a string like '#main' and sets router.route to 'main'
     */
    case 'NAVIGATE_FROM_POPSTATE':
      const hashString = routeFromHash(action.value)
      return Object.assign({}, state, {router: {route: hashString}})

    default:
      // @desc Always have a default to return state object
      return state
  }
}
