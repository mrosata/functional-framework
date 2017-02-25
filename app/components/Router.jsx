import dom from '../utils/dom'
import {dispatch} from '../index'

export const Link = ({state = {}, route = ''}, innerContent = ['']) => {
  const currentRoute = state.router ? state.router.route : ''
  const active       = route === currentRoute

  return (
    <a dataset={{route}} className={active ? 'active' : ''} onclick={() => dispatch({type: 'NAVIGATE', value: route})}>
      {innerContent}
    </a>)
}

export const Route = ({state = {}, dispatch, route = '', component} = {}, innerContent) => {

  const currentRoute = state.router ? state.router.route : ''

  return (currentRoute === route) ? (
      <section dataset={{route}}>
        {component({state, dispatch}, innerContent)}
      </section>
    ) : null
}

// This is the router
export default ({state = {}}, routeInnerContent = ['']) => {

  const route = state.router ? state.router.route : ''

  return (
    <section dataset={{route}}>
      {routeInnerContent}
    </section>
  )
}
