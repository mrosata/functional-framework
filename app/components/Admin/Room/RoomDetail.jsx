"use strict"
import dom from '../../../utils/dom';
import Room from './room-class.js'

const tempRoom = new Room();

function addTestRoom() {
    console.log('addTestRoom');

    return new Promise((resolve, reject) => {
        let room = new Room(115, 'Large Meeting Room', '1st floor', true);
        console.log(room);

        //validate
        if (!Room.hasRoomInfo(room)) {
            console.log('missing room info');
            throw "Before Saving Room To Firebase Ensure It Has Proper Info"
        }

        //save to firebase
        //Room.saveToFirebase(room);

        //need to dispatch?

    })
}


function handleNameChange(event) {
    tempRoom.name = event.target.value;
    console.log(tempRoom);
}


export default () => {

    return (
        <div class="container">
            <div>
                <form>
                    <div class="form-group row">
                        <label for="room_number" class="col-2 col-form-label">Room #</label>
                        <div class="col-10">
                            <input class="form-control" type="text" value="" placeholder="Room Number" id="room_number"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="room_name" class="col-2 col-form-label">Room Name</label>
                        <div class="col-10">
                            <input class="form-control" type="text" required value="" placeholder="Room Name" onchange={handleNameChange} id="room_name"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="room_desc" class="col-2 col-form-label">Description</label>
                        <div class="col-10">
                            <input class="form-control" type="text" required value="" placeholder="Description" onchange={handleNameChange} id="room_desc"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="room_active" class="col-2 col-form-label">Active</label>
                        <div class="col-10">
                            <input class="form-control" type="checkbox" value="" placeholder="Active" onchange={handleNameChange} id="room_active"></input>
                        </div>
                    </div>
                </form>
                <span className="btn btn-success"
                    onclick={
                        () => addTestRoom()}>Add Room</span>
            </div>
        </div>
    );
}