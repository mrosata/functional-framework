"use strict"
import R from 'ramda';
import dom from '../../../utils/dom';
import Room from './room-class.js'
import Field from '../../Form/Field-class';
import { dispatch, dispatchAsync } from '../../../index'

var tempRoom = new Room();

const {is, isEmpty} = R;

const isNonEmptyString = (value) => is(String, value) && !isEmpty(value)
const isPositive = (value) => +value >= 0;

const RoomNameInput = new Field({
    name: 'name',
    type: 'text',
    errorMsg: 'Please enter a value for Room.',
    willDispatch: false,
    validation: isNonEmptyString
});

const MinInput = new Field({
    name: 'min',
    type: 'number',
    errorMsg: 'Minimum Capacity must be a number zero or greater.',
    willDispatch: false,
    validation: isPositive
});


/**
 * Gets user input from forms and validates. If all controls are valid then 
 * the Room.save method is called to persist the changes.
 */
function saveRoom() {
    getFormValues();

    if (fieldsValid())
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


/**
 * Gets the values from the form and sets each controls value.  This will call validate function and set isValid boolean.
 */
function getFormValues() {
    const number = +document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const active = document.getElementById('active').checked;
    const min = document.getElementById('min').value;
    const max = document.getElementById('max-capacity').value;

    RoomNameInput.value = name;
    MinInput.value = min;

    tempRoom.number = number;
    tempRoom.name = name;
    tempRoom.description = description;
    tempRoom.active = active;
    tempRoom.capacity.min = min;
    tempRoom.capacity.max = max;
}

/**
 * Make sure all fields are valid before continuing with save.
 */
function fieldsValid() {
    if (!RoomNameInput.isValid || !MinInput.isValid) {
        dispatch({ type: 'NOT_HANDLED_BUT_NEEDED', value: '' })
        return false;
    }

    return true;
}


export default ({state}) => {
    tempRoom = state.currentRoom;

    if (state.currentRoom == null) {
        tempRoom = new Room();
    }

    RoomNameInput.value = tempRoom.name;
    MinInput.value = tempRoom.capacity.min;








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
                        <div className="col-sm-6">
                            <input className="form-control" type="text" required="true" value={tempRoom.number} id="number" name="number"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label col-sm-2">Room Name</label>
                        {RoomNameInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="control-label col-sm-2">Description</label>
                        <div className="col-sm-6">
                            <input className="form-control" type="text" required value={tempRoom.description} id="description" name="description" ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="min-capacity" className="control-label col-sm-2">Minimum Capacity</label>
                        {MinInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="max-capacity" className="control-label col-sm-2">Maximum Capacity</label>
                        <div className="col-sm-6">
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
