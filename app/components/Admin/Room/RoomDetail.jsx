"use strict"
import R from 'ramda';
import dom from '../../../utils/dom';
import Room from './room-class.js'
import Field from '../../Form/Field-class';
import { dispatch, dispatchAsync } from '../../../index'

var tempRoom = new Room();

const {is, isEmpty} = R;

const isNonEmptyString = (value) => is(String, value) && !isEmpty(value)
const isNotNegative = (value) => +value >= 0;
const isPositive = (value) => +value > 0;

const RoomNumberInput = new Field({
    name: 'number',
    type: 'number',
    errorMsg: 'Room number must be greater than zero!',
    willDispatch: false,
    validation: isPositive,
    debug: true
});

const RoomNameInput = new Field({
    name: 'name',
    type: 'text',
    errorMsg: 'Please enter a value for Room!',
    willDispatch: false,
    validation: isNonEmptyString,
    debug: true
});

const RoomDescriptionInput = new Field({
    name: 'description',
    type: 'text',
    willDispatch: false
});

const MinInput = new Field({
    name: 'min',
    type: 'number',
    errorMsg: 'Minimum Capacity cannot be negative!',
    willDispatch: false,
    validation: isNotNegative
});

const MaxInput = new Field({
    name: 'max',
    type: 'number',
    errorMsg: 'Maximum Capacity cannot be negative!',
    willDispatch: false,
    validation: isNotNegative
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
 * Gets the values from the form and sets properties on tempRoom object
 */
function getFormValues() {
    //const number = +document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const active = document.getElementById('active').checked;
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;

    tempRoom.number = RoomNumberInput.value;
    tempRoom.name = name;
    tempRoom.description = description;
    tempRoom.active = active;
    tempRoom.capacity.min = +min;
    tempRoom.capacity.max = +max;

    Room.setCurrentRoom(tempRoom);
}

/**
 * Make sure all fields are valid before continuing with save.
 */
function fieldsValid() {
    if (!RoomNumberInput.isValid || !RoomNameInput.isValid || !MinInput.isValid || !MaxInput.isValid) {
        dispatch({ type: 'NOT_HANDLED_BUT_NEEDED', value: '' })
        return false;
    }
    else {
      dispatch({type: 'SOMETHING', value: ''})
    }

    return true;
}


export default ({state}) => {
    tempRoom = state.currentRoom;

    if (!state.currentRoom) {
        tempRoom = new Room();
    }

    //setting value property will call each controls validate function and set its isValid property.
    RoomNumberInput.value = tempRoom.number;
    RoomNameInput.value = tempRoom.name;
    RoomDescriptionInput.value = tempRoom.description;
    MinInput.value = tempRoom.capacity.min;
    MaxInput.value = tempRoom.capacity.max;


    //change button visibility based on whether or not user is logged in
    let saveClass = 'btn btn-success';
    let deleteClass = 'btn btn-danger';

    if (!state.auth) {
        saveClass += ' hide';
        deleteClass += ' hide';
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
                        {RoomNumberInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label col-sm-2">Room Name</label>
                        {RoomNameInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="control-label col-sm-2">Description</label>
                        {RoomDescriptionInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="min-capacity" className="control-label col-sm-2">Minimum Capacity</label>
                        {MinInput.jsx()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="max-capacity" className="control-label col-sm-2">Maximum Capacity</label>
                        {MaxInput.jsx()}
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label><input type="checkbox" checked={tempRoom.active} id="active" name="active"></input> Active</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <span className={saveClass} onclick={() => saveRoom()}>Save</span>
                    <span className={deleteClass} onclick={() => deleteRoom()}>Delete</span>
                    <span className="btn btn-info" onclick={() => clearRoom()}>Clear</span>
                    <span className="btn btn-success" onclick={() => loadRooms()}>Load</span>
                </div>
            </div>
        </div>
    );
}
