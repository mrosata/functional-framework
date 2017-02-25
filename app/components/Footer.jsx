"use strict"
import dom from '../utils/dom';

export default ({state}, innerContent) => {
  return (
    <footer>
      <div className="row">
        <div className="col-lg-12">
          <p>
            {innerContent}
          </p>
        </div>
      </div>
    </footer>
  );
}
