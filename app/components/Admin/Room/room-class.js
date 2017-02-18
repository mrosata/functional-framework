import moment from 'moment'
import { database } from '../../../utils/firebase-app'


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
        return typeof number === "number" &&
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
        return newRoom.set({
            number,
            name,
            description,
            active
        })
    }

}
