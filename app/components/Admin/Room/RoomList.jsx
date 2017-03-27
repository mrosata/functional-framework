"use strict"
import dom from '../../../utils/dom';
import { log } from '../../../utils/logger'
import { dispatch, dispatchAsync } from '../../../index'

import Room from './room-class.js'


export default ({state, dispatch}) => {

    function editRoom(key) {
        //create new object rather than assign existing object.  This prevents the grid from updating while the item is being edited.
        var room = Object.assign({}, state.rooms.find(x => x.key === key));
        Room.setCurrentRoom(room);
    }

    //TODO why can't I do this?  Where would be the best place to do this?
    // if(state.rooms.length == 0)
    //     Room.loadRooms();

    function getTable() {
        if (state.rooms.length > 0) {
            return (

                <table className="table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>#</th>
                            <th>Room Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.rooms.map(item =>
                            <tr>
                                <td>{item.key}</td>
                                <td>{item.number}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td className="btn btn-success fa fa-pencil"
                                    onclick={
                                        () => editRoom(item.key)
                                    }></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            );
        }
    }

    return (
        <div>
            <h3>Room List</h3>
            {getTable()}
        </div>
    );
}

