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
    const min = document.getElementById('min-capacity').value;
    const max = document.getElementById('max-capacity').value;

    tempRoom.number = number;
    tempRoom.name = name;
    tempRoom.description = description;
    tempRoom.active = active;
    tempRoom.capacity.min = min;
    tempRoom.capacity.max = max;
}


export default ({state}) => {
    tempRoom = state.currentRoom;

    if (state.currentRoom == null)
        tempRoom = new Room();

    //change button visibility based on whether or not user is logged in
    let saveClass = 'btn btn-success';
    let deleteClass = 'btn btn-danger';

    if (!state.auth) {
        saveClass += ' hide';
        deleteClass += ' hide';
    }

    function getButtons() {
        return (
            <div>
                <span className={saveClass} onclick={() => saveRoom()}>Save</span>
                <span className={deleteClass} onclick={() => deleteRoom()}>Delete</span>
                <span className="btn btn-info" onclick={() => clearRoom()}>Clear</span>
                <span className="btn btn-success" onclick={() => loadRooms()}>Load</span>
            </div>
        );
    }

    return (
        <div>
            <h3>Room Detail</h3>
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="key" className="control-label col-sm-2">Key</label>
                        <div className="col-sm-10">
                            <label htmlFor="key" className="control-label">{tempRoom.key}</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number" className="control-label col-sm-2">Room #</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="text" required="true" value={tempRoom.number} id="number" name="number"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label col-sm-2">Room Name</label>
                        <div className="col-sm-6">
                            <input className="form-control" type="text" required value={tempRoom.name} id="name" name="name"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="control-label col-sm-2">Description</label>
                        <div className="col-sm-6">
                            <input className="form-control" type="text" required value={tempRoom.description} id="description" name="description" ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="min-capacity" className="control-label col-sm-2">Minimum Capacity</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="text" required value={tempRoom.capacity.min} placeholder="Minimum Capacity" id="min-capacity" name="min-capacity" ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="max-capacity" className="control-label col-sm-2">Maximum Capacity</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="text" required value={tempRoom.capacity.max} placeholder="Maximum Capacity" id="max-capacity" name="max-capacity" ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label><input type="checkbox" checked={tempRoom.active} id="active" name="active"></input> Active</label>
                            </div>
                        </div>
                    </div>
                </form>
                {getButtons()}
            </div>
        </div>
    );
}
