"use strict"
import R from 'ramda';
import dom from '../../../utils/dom';
import Room from './room-class.js'
import Field from '../../Form/Field-class';

var tempRoom = new Room();

const {is, isEmpty, propEq, prop, all, filter, map, join, compose} = R;

// Utils
const allValid = all(prop('isValid'))
const takeInvalidFields = filter(propEq('isValid', false));
const getErrorMessages = map(prop('errorMsg'));
const makeList = join('\r\n');
const errorMessageList = compose(makeList, getErrorMessages, takeInvalidFields);

// Validation
const isNonEmptyString = (value) => is(String, value) && !isEmpty(value)
const isNotNegative = (value) => +value >= 0;
const isPositive = (value) => +value > 0;

// Fields
const RoomNumberInput = new Field({
    name: 'number',
    type: 'number',
    errorMsg: 'Room number must be greater than zero!',
    willDispatch: true,
    validation: isPositive,
    debug: true
});

const RoomNameInput = new Field({
    name: 'name',
    type: 'text',
    errorMsg: 'Please enter a value for Room!',
    willDispatch: true,
    validation: isNonEmptyString,
    debug: true
});

const RoomDescriptionInput = new Field({
    name: 'description',
    type: 'text',
    willDispatch: true
});

const MinInput = new Field({
    name: 'min',
    type: 'number',
    errorMsg: 'Minimum Capacity cannot be negative!',
    willDispatch: true,
    validation: isNotNegative
});

const MaxInput = new Field({
    name: 'max',
    type: 'number',
    errorMsg: 'Maximum Capacity cannot be negative!',
    willDispatch: true,
    validation: isNotNegative
});

const ActiveInput = new Field({
  name: 'active',
  type: 'checkbox'
})


// All The Form Fields
const formFieldsList = [
  RoomNumberInput, RoomNameInput, RoomDescriptionInput, MinInput, MaxInput, ActiveInput
];



/**
 * Gets user input from forms and validates. If all controls are valid then
 * the Room.save method is called to persist the changes.
 */
function saveRoom(formFields) {
    getFormValues();

    if (allValid(formFields))
        Room.save(tempRoom);
    else
      alert(errorMessageList(formFieldsList));
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

    const active = document.getElementById('active').checked;
    tempRoom.active = ActiveInput.value;

    tempRoom.number = RoomNumberInput.value;
    tempRoom.name = RoomNameInput.value;
    tempRoom.description = RoomDescriptionInput.value;
    tempRoom.capacity.min = MinInput.value;
    tempRoom.capacity.max = MaxInput.value;

    Room.setCurrentRoom(tempRoom);
}



export default ({state}) => {
    tempRoom = state.currentRoom;

    if (!state.currentRoom) {
        tempRoom = new Room();
    }


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
                                <label>
                                  {ActiveInput.jsx()} Active</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <span className={saveClass} onclick={() => saveRoom(formFieldsList)}>Save</span>
                    <span className={deleteClass} onclick={() => deleteRoom()}>Delete</span>
                    <span className="btn btn-info" onclick={() => clearRoom()}>Clear</span>
                    <span className="btn btn-success" onclick={() => loadRooms()}>Load</span>
                </div>
            </div>
        </div>
    );
}
