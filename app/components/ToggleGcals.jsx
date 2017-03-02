"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'
import {dispatch, dispatchAsync} from '../index'

const ToggleGcal = () => {

    return(
        <div>
            <button className="btn-default btn btn-lg">Cal One</button>
            <button className="btn-default btn btn-lg">Cal Two</button>
            <button className="btn-default btn btn-lg">Cal Three</button>
        </div>
    );
};

// toggle the google calendar


export default ToggleGcal