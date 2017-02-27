"use strict"
import dom from '../utils/dom';
import {Link} from './Router';

export default ({state, dispatch}, innerContent) => {

  return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      {/*  Nav Menu  */}
      <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle"
                  dataset={{toggle: "collapse", target: "#bs-example-navbar-collapse-1"}}>

            <span className="sr-only">Toggle Nav Menu</span>
            <span className="icon-bar">&nbsp;</span>
            <span className="icon-bar">&nbsp;</span>
            <span className="icon-bar">&nbsp;</span>
          </button>
          <a className="navbar-brand" href="#">{innerContent}</a>
        </div>
        {/*  Collect the nav links, forms, and other content for toggling  */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
              <Link route="index" state={state}>Calendar</Link>
            </li>
            <li>
              <Link route="example" state={state}>Example</Link>
            </li>
            <li>
              <Link route="admin" state={state}>Admin</Link>
            </li>
          </ul>
        </div>
        {/*  /.navbar-collapse  */}
      </div>
      {/*  /.container  */}
    </nav>
  );
}
