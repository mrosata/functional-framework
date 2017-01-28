import Footer from './Footer';
import dom from '../utils/dom';


export default (state) => {
  return (
    <div className="container">
    {/*  Page Content  */}

      <div className="row">

        {/*  Blog Entries Column  */}
        <div className="col-md-8">

          <h1 className="page-header">
            Page Heading
            <small>Secondary Text</small>
          </h1>

          {/*  First Blog Post  */}
          <h2>
            <a href="#">Blog Post Title</a>
          </h2>
          <p className="lead">
            by <a href="index.php">Start Bootstrap</a>
          </p>
          <p><span className="glyphicon glyphicon-time">&nbsp;</span> Posted on August 28, 2013 at 10:00 PM</p>
          <hr/>
          <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
          <hr/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.</p>
          <a className="btn btn-primary" href="#">Read More <span className="glyphicon glyphicon-chevron-right">&nbsp;</span></a>

          <hr/>

          {/*  Pager  */}
          <ul className="pager">
            <li className="previous">
              <a href="#">&larr; Older</a>
            </li>
            <li className="next">
              <a href="#">Newer &rarr;</a>
            </li>
          </ul>

        </div>

        {/*  Blog Sidebar Widgets Column  */}
        <div className="col-md-4">

          {/*  Blog Search Well  */}
          <div className="well">
            <h4>Blog Search</h4>
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
            <h4>Blog Categories</h4>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                </ul>
              </div>
              {/*  /.col-lg-6  */}
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                  <li>
                    <a href="#">Category Name</a>
                  </li>
                </ul>
              </div>
              {/*  /.col-lg-6  */}
            </div>
            {/*  /.row  */}
          </div>

          {/*  Side Widget Well  */}
          <div className="well">
            <h4>Side Widget Well</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, perspiciatis adipisci accusamus laudantium odit aliquam repellat tempore quos aspernatur vero.</p>
          </div>

        </div>

      </div>
      {/*  /.row  */}

      <hr/>

      <Footer/>

    </div>
  )
}
