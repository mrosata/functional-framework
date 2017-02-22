
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
  
        if (!Room.hasRoomInfo(room)) {
            throw "Before Saving Room To Firebase Ensure It Has Proper Info"
        }

        const {number, name, description, active} = room

        //push and set at the same time
        let newRoom = roomsRef.push({
            number,
            name,
            description,
            active
        });

        room.key = newRoom.getKey();
        return room;
    }

    static setCurrentRoom(room)
    {
        dispatch({type: 'CURRENT_ROOM', value: room})
    }

    static update(room)
    {
        dispatch({type: 'UPDATE_ROOM', value: room})
    }

    static delete(room)
    {
        dispatch({type: 'DELETE_ROOM', value: room})
    }

    static save(room) {

        //TODO this is is a test to add to memory only
        var newRoom = Object.assign({}, room);
        newRoom.key = Date.now();
        dispatch({type: 'ADD_ROOM', value: newRoom})

        /*
        //create promise which will perform database update
        var promise = new Promise(function (resolve, reject) {
            try {
                //var newRoom = Room.saveToFirebase(room);

                var newRoom = room;
                newRoom.key = Date.now();

                resolve(newRoom); 
            }
            catch (e) {
                reject(Error("unable to save room"));
            }
        });

        //pass promise to dispatch
        dispatchAsync('ADD_ROOM', promise);
        */
    }
}

