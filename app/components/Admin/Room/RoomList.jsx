"use strict"
import dom from '../../../utils/dom';
import { log } from '../../../utils/logger'

import Room from './room-class.js'

Room.ref().on('value', (snapshot) => {
    log('Room Data From Firebase -> ', snapshot.exportVal())
})

function getRoomsFromFirebase() {
    // Get the rooms from firebase
    return new Promise((resolve, reject) => {
        return Room.ref().on('value', (snapshot) => {
            // map the rooms from firebase snapshot into Room class instances
            try {
                let rooms = []
                snapshot.forEach(snap => {
                    rooms.push(Room.fromFirebaseSnapshot(snap))
                })

                return resolve(rooms)
            }
            catch (e) { return reject(e) }

        })
    })
}

export default () => {
    getRoomsFromFirebase().then(evts => {
        log('rooms from firebase', evts)
    });

    return (
        <div>
            <div className="row">
                <div className="col-sm-4">column 1</div>
                <div className="col-sm-4">.col-sm-4</div>
                <div className="col-sm-4">.col-sm-4</div>
            </div>
        </div>
    );
}