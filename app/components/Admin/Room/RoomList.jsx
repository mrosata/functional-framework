"use strict"
import dom from '../../../utils/dom';
import { log } from '../../../utils/logger'
import { dispatch, dispatchAsync } from '../../../index'

import Room from './room-class.js'


// Room.ref().on('value', (snapshot) => {
//     log('Room Data From Firebase -> ', snapshot.exportVal())
// })

// function getRoomsFromFirebase() {
//     // Get the rooms from firebase
//     return new Promise((resolve, reject) => {
//         return Room.ref().on('value', (snapshot) => {
//             // map the rooms from firebase snapshot into Room class instances
//             try {
//                 let rooms = []
//                 snapshot.forEach(snap => {

//                     rooms.push(Room.fromFirebaseSnapshot(snap))
//                 })

//                 return resolve(rooms)
//             }
//             catch (e) { return reject(e) }

//         })
//     })
// }






export default ({state}) => {

    function editRoom(key) {
        var room = state.rooms.find(x => x.key === key);
        Room.setCurrentRoom(room);
    }


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

