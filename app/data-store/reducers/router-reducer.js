const DEFAULT_ROUTE = 'index'

/**
 * Action to handle navigation to another route
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
    window.history.pushState({state, prevRoute}, '', `${pathname}${search}#${currentRoute}`)
  }
  return Object.assign({}, state, {router: {route: currentRoute}})
}


export const getInitialRouter = (location = {hash: ''}) => {
  const hash = location.hash
  return {route: routeFromHash(hash)}
}


function routeFromHash(hash = '#', defaultRoute = DEFAULT_ROUTE) {
  const [, route=defaultRoute] = [].concat(/^#?([a-z0-9\-]+)/i.exec(hash), defaultRoute)
  return route
}


export default (state = {}, action) => {

  switch (action.type) {

    case 'NAVIGATE':
      return configureStateRouter(state, action)

    case 'NAVIGATE_FROM_HASH':
      const hashString = routeFromHash(action.value)
      return configureStateRouter(state, {value: hashString})

    default:
      // @desc Always have a default to return state object
      return state
  }
}
