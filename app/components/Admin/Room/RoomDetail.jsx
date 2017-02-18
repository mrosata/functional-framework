"use strict"
import dom from '../../../utils/dom';
import Room from './room-class.js'

const tempRoom = new Room(456, 'Room1', '4th floor');

function addTestRoom() {
    console.log('addTestRoom');

    return new Promise((resolve, reject) => {
        //let room = new Room(115, 'Large Meeting Room', '1st floor', true);
        console.log(tempRoom);

        //validate
        if (!Room.hasRoomInfo(tempRoom)) {
            console.log('missing room info');
            throw "Before Saving Room To Firebase Ensure It Has Proper Info"
        }

        //save to firebase
        Room.saveToFirebase(tempRoom);

        //need to dispatch?

    })
}


function handleNameChange(event) {
    const target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    if (name == 'number')  
        value = +value; //convert to numberr

    tempRoom[name] = value;

    console.log('tempRoom -->');
    console.log(tempRoom);
}


export default () => {

    return (
        <div class="container">
            <div>
                <form>
                    <div class="form-group row">
                        <label for="number" class="col-2 col-form-label">Room #</label>
                        <div class="col-10">
                            <input class="form-control" type="text" value={tempRoom.number} placeholder="Room Number" onchange={handleNameChange}  id="number" name="number"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class="col-2 col-form-label">Room Name</label>
                        <div class="col-10">
                            <input class="form-control" type="text" required value={tempRoom.name} placeholder="Room Name" onchange={handleNameChange} id="name" name="name"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="description" class="col-2 col-form-label">Description</label>
                        <div class="col-10">
                            <input class="form-control" type="text" style="width:400px" required value={tempRoom.description} placeholder="Description" onchange={handleNameChange} id="description" name="description" ></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="active" class="col-2 col-form-label">Active</label>
                        <div class="col-10">
                            <input class="form-control" type="checkbox" checked={tempRoom.active} placeholder="Active" onchange={handleNameChange} id="active" name="active"></input>
                        </div>
                    </div>
                </form>
                <div>{JSON.stringify(tempRoom)}</div>
                <span className="btn btn-success"
                    onclick={
                        () => addTestRoom()
                        
                        }>Add Room</span>
            </div>
        </div>
    );
}