"use strict"
import dom from '../../../utils/dom';
import Room from './room-class.js'

var tempRoom = new Room();


function saveRoom() {
    getFormValues();

    //validate
    if (!Room.hasRoomInfo(tempRoom)) {
        console.log('missing room info');
        throw "Before Saving Room To Firebase Ensure It Has Proper Info"
    }

    Room.save(tempRoom);
}

function deleteRoom() {
    Room.delete(tempRoom);
}

function clearRoom() {
    Room.setCurrentRoom(null);
}

function loadRooms() {
    Room.loadRooms();
}

function getFormValues() {
    const number = +document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const active = document.getElementById('active').checked;

    tempRoom.number = number;
    tempRoom.name = name;
    tempRoom.description = description;
    tempRoom.active = active;
}



function handleNameChange(event) {
    // const target = event.target;
    // var value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    // if (name == 'number')
    //     value = +value; //convert to number

    // tempRoom[name] = value;
}


export default ({state}) => {
    console.log('in room detail', state);
    tempRoom = state.currentRoom;

    if (state.currentRoom == null)
        tempRoom = new Room();

    function getButtons() {
        return (
            <div>
                <span className="btn btn-success" onclick={() => saveRoom()}>Save</span>
                <span className="btn btn-danger" onclick={() => deleteRoom()}>Delete</span>
                <span className="btn btn-info" onclick={() => clearRoom()}>Clear</span>
                <span className="btn btn-success" onclick={() => loadRooms()}>Load</span>
            </div>
        );
    }

    return (
        <div>
            <h3>Room Detail</h3>
            <div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="key" className="col-2 col-form-label">Key</label>
                        <div className="col-10">
                           <label htmlFor="key" className="col-10 col-form-label">{tempRoom.key}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="number" className="col-2 col-form-label">Room #</label>
                        <div className="col-10">
                            <input className="form-control" type="text" required="true" value={tempRoom.number} placeholder="Room Number" onchange={handleNameChange} id="number" name="number"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-2 col-form-label">Room Name</label>
                        <div className="col-6">
                            <input className="form-control" type="text" required value={tempRoom.name} placeholder="Room Name" onchange={handleNameChange} id="name" name="name"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-2 col-form-label">Description</label>
                        <div className="col-6">
                            <input className="form-control" type="text" required value={tempRoom.description} placeholder="Description" onchange={handleNameChange} id="description" name="description" ></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="active" className="col-2 col-form-label">Active</label>
                        <div className="col-6">
                            <input className="form-control" type="checkbox" checked={tempRoom.active} placeholder="Active" onchange={handleNameChange} id="active" name="active"></input>
                        </div>
                    </div>
                </form>
                {getButtons()}
            </div>
        </div>
    );
}