import Page from './Page';
import Navigation from './Navigation';
import dom from '../utils/dom';

const AppComponent = ({state}) => {

  return (
    <div className="container">
      {/*  Navigation  */}
      <Navigation/>

      {/*  Page and Footer  */}
      <Page/>
    </div>
  );
};


export default AppComponent
