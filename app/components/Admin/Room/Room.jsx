"use strict"
import dom from '../../../utils/dom';

import RoomDetail from './RoomDetail'
import RoomList from './RoomList'

export default ({state, myval}) => {
    console.log('Room');
    console.log(state);

    return (
        <div>
            This is the room component: val {myval}
            <RoomDetail />
            <RoomList />
        </div>
    );
}