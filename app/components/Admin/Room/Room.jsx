"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'

import RoomDetail from './RoomDetail'
import RoomList from './RoomList'
import Room from './room-class'

export default ({state, dispatch}) => {

    //default some rooms
    if(state.rooms.length == 0)
    {
        var room1 = new Room(201, 'Green', '2nd Floor', true);
        room1.key = 123;
        state.rooms.push(room1);

        var room2 = new Room(300, 'Blue', '3rd Floor', true);
        room2.key =124;
        state.rooms.push(room2);

        var room3 = new Room(115, 'Yellow', '1st Floor', true);
        room3.key = 125;
        state.rooms.push(room3);

        //why can't I call dispatch here?
    }


    return (
        <div>
            <RoomDetail state={state} />
            <RoomList state={state}  />
        </div>
    );
}