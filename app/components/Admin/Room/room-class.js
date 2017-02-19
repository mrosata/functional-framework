
import { database } from '../../../utils/firebase-app'
import { dispatch, dispatchAsync } from '../../../index'


export default class Room {

    constructor(number, name, description, active = true) {
        this.number = number
        this.name = name
        this.description = description
        this.active = active
        this.key = void (0)
    }

    /**
     * Firebase Reference to Rooms
     * @return {object}
     */
    static ref() {
        return database.ref('rooms')
    }


    static fromFirebaseSnapshot(snapshot) {

        if (!snapshot || typeof snapshot.val !== "function") {
            throw "Room.fromFirebaseSnapshot expects child of 'rooms' snapshot"
        }

        // Create the instance of Event using Firebase Snapshot
        let {number, name, description, active} = snapshot.val()

        const evt = new Room(number, name, description, active)

        //console.log(snapshot.getKey());

        // Set the ID (//TODO: this might be better in constructor now that data is live)
        evt.key = snapshot.getKey();

        return evt
    }



    /**
     * Check that an object matches the signature of an room.
     * (useful for: checking type before storing to firebase)
     */
    static hasRoomInfo({number, name, description, active}) {
        return typeof number === "number" && Number.isInteger(number) && number > 0
        typeof name === "string" &&
            typeof description === "string" &&
            typeof active === "boolean"
    }


    /**
     * Save Room Into Firebase
     * @param  {Room} room
     * @return {Promise}
     */
    static saveToFirebase(room) {
        //TODO: Check for ID and if has id then update not push

        const roomsRef = database.ref('rooms')
        let newRoom

        if (!Room.hasRoomInfo(room)) {
            throw "Before Saving Room To Firebase Ensure It Has Proper Info"
        }

        const {number, name, description, active} = room

        newRoom = roomsRef.push()
        newRoom.set({
            number,
            name,
            description,
            active
        })

        room.key = newRoom.getKey();
        return room;
    }

    static save(room) {

        //create promise which will perform database update
        var promise = new Promise(function (resolve, reject) {
            try {
                var newRoom = Room.saveToFirebase(room);
                resolve(newRoom); 
            }
            catch (e) {
                reject(Error("unable to save room"));
            }
        });

        //pass promise to dispatch
        dispatchAsync('ADD_ROOM', promise);
    }


}

/*

RoomDetail.jsx - room form data
room-class.js - defines Room class with helper static methods for reading\writing to firebase
room-reducer.js - room specific reducer combined with other reducers

1) user submits form data on RoomDetail.jsx
2) form data is validated to make sure it's complete\accurate
3) saveRoom method is called in room-class.js which does the following:

//create a promise which will be passed to the reducer.  This promise contains the logic to save to the database.

var roomPromise = new Promise(function(resolve, reject) {
  // call firebase to add\update room

  var room = ....logic to get database ref and add room

  //room saved successfully
  if (success) {
    resolve(room); //resolve with the newly created\updated room object
  }
  else {
    reject(Error("unable to save room"));
  }
});


//pass this promise to dispatchAsync
dispatchAsync('ADD_ROOM', roomPromise);

//once resolved dispatchAsync will take care of calling the actual ADD_ROOM_RESOLVE reducer 
//which contains the logic to add\update rooms array without mutating state.

*/