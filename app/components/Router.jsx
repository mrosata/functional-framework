import dom from '../utils/dom';

export const Link = ({hash='', data={}, component}) => {
  console.log('component', component);
  return (<span dataset={{hash}} data={data}>
    {children}
  </span>)
}

export default ({state, dispatch}) => {
  const hash = {state: hash};
}
