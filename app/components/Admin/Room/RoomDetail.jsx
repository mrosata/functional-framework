"use strict"
import dom from '../../../utils/dom';
import Room from './room-class.js'

function addTestRoom() {
    console.log('addTestRoom');

    return new Promise((resolve, reject) => {
        let room = new Room(3, 'Test Room', '3rd floor', true);
        console.log(room);

        //validate
        if (!Room.hasRoomInfo(room)) {
            console.log('missing room info');
            throw "Before Saving Room To Firebase Ensure It Has Proper Info"
        }

        //
        Room.saveToFirebase(room);

    })

    // Get the events from firebase
    //   return new Promise((resolve, reject) => {
    //     return DemoEvent.ref().on('value', (snapshot) => {
    //       // map the events from firebase snapshot into DemoEvent class instances
    //       try {
    //         let events = []
    //         snapshot.forEach(snap => {
    //           events.push(DemoEvent.fromFirebaseSnapshot(snap))
    //         })

    //         return resolve(events)
    //       }
    //       catch(e) {return reject(e)}

    //     })
    //   })
}


export default () => {

    return (
        <div>
            <span className="btn btn-success"
                onclick={
                    () => addTestRoom()}>Add Room</span>
            <form>
                <input></input>
            </form>
        </div>
    );
}