"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'

import RoomDetail from './RoomDetail'
import RoomList from './RoomList'

export default ({state, dispatch}) => {
    return (
        <div>
            <RoomDetail state={state} />
            <RoomList state={state}  />
        </div>
    );
}