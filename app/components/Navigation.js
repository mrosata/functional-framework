import dom from '../utils/dom';

export default (state) => {

  return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      {/*  Navigation  */}
      <div className="container">
        {/*  Brand and toggle get grouped for better mobile display  */}
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1">

            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar">&nbsp;</span>
            <span className="icon-bar">&nbsp;</span>
            <span className="icon-bar">&nbsp;</span>
          </button>
          <a className="navbar-brand" href="#">Start Bootstrap</a>
        </div>
        {/*  Collect the nav links, forms, and other content for toggling  */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        {/*  /.navbar-collapse  */}
      </div>
      {/*  /.container  */}
    </nav>
  );
}
