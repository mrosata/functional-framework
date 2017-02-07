"use strict"
import Footer from './Footer';
import dom from '../utils/dom';


export default (state) => {
  return (
    <div className="page">
    {/*  Page Content  */}

      <div className="row">

        {/*  Blog Entries Column  */}
        <div className="col-md-8">

          <h1 className="page-header">
            Functional Programming
            <small>Michael Rosata</small>
          </h1>

          {/*  First Blog Post  */}
          <h2>
            <a href="#">Starter Kit</a>
          </h2>
          <p className="lead">
            for MA Web Devs Meetup
          </p>
          <p><span className="glyphicon glyphicon-time">&nbsp;</span> Created February 06, 2017</p>
          <hr/>
          <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
          <hr/>
          <p>
            <strong>MA Web Developer!</strong> Glad you could join us! This starter kit is
            just a basic "web app" starter. If your familar with React or Redux then you'll
            do fine, and if your not, well, I still have faith in you. This kit doesn't
            actually use Redux or React, it's just similar to both and simple to use to boot!
            Speaking of boots.. did I mention this kit has BootStrap too? Well it does!
          </p>

          <hr/>

          {/*  Pager  */}
          <ul className="pager">
            <li className="previous">
              <a href="#">&larr;</a>
            </li>
            <li className="next">
              <a href="#">&rarr;</a>
            </li>
          </ul>

        </div>

        {/*  Blog Sidebar Widgets Column  */}
        <div className="col-md-4">

          {/*  Blog Search Well  */}
          <div className="well">
            <h4>Search Events</h4>
            <div className="input-group">
              <input type="text" className="form-control"/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-search">&nbsp;</span>
                </button>
              </div>
            </div>
            {/*  /.input-group  */}
          </div>

          {/*  Blog Categories Well  */}
          <div className="well">
            <h4>Event Listing</h4>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Something Day Parade</a>
                  </li>
                  <li>
                    <a href="#">Something Day Parade</a>
                  </li>
                  <li>
                    <a href="#">Something Day Parade</a>
                  </li>
                </ul>
              </div>
              {/*  /.col-lg-6  */}
              <div className="col-lg-6">
                <ul class="list-group">
                  <li class="list-group-item danger">Whhhaaa</li>
                  <li class="list-group-item warning">Zooooomm</li>
                  <li class="list-group-item info">PAannng!</li>
                </ul>
              </div>
              {/*  /.col-lg-6  */}
            </div>
            {/*  /.row  */}
          </div>

          {/*  Side Widget Well  */}
          <div className="well">
            <h4>FEBRUARY</h4>
            <code>[ ][ ][ ][ ][ ][ ][ ]</code><br/>
            <code>[ ][ ][ ][ ][ ][ ][ ]</code><br/>
            <code>[ ][ ][ ][ ][ ][ ][ ]</code><br/>
            <code>[ ][ ][ ][ ][ ][ ][ ]</code><br/>
          </div>

        </div>

      </div>
      {/*  /.row  */}

      <hr/>

      <Footer/>

    </div>
  )
}
