import {dispatch} from '../../index';
import BaseField from './BaseField-class';
import dom from '../../utils/dom'
import R from 'ramda';

/**
 * toLower = makes a string lowercase
 * toUpper = makes a string uppercase
 * isNil   = checks if a value is null or undefined
 * is      = test if a value is a certain type ie: is(String)('yes')
 * type    = gives type of value ie: type({id:10})  // "Object"
 * isEmpty = bool flag for object, string or array is empty
 */
const {toUpper, toLower, isNil, is, type} = R;


/**
 * This is the main `Field` class
 */
class Field extends BaseField {

  constructor(configurationObject) {
    super(configurationObject);
  }

  /**
   * Set the value from state with no validation
   * @param value
   */
  fromState(value) {
    this._value = value;
  }

  /**
   * Debug info if field.debug == true
   */
  logFieldInfo(label) {
    if (this.debug) {
      const {type, name, _value, isValid} = this;
      console.log(`${label ? `[${label}] ` : ''}Field(${type}, ${name}) --> ${_value} --> ${isValid ? 'VALID' : 'INVALID'}`);
    }
  }

  logChangeInfo(prevValue, event) {
    if (this.debug) {
      const {type, name, value} = this;
      console.log(`Field(${type}, ${name}) -> ${prevValue} << Changed >> ${value}`, event);
    }
  }

  /**
   * Output a JSX Element to show input
   * @example
   * ```jsx
   *    const myField = new Field(config);
   *
   *    export () => (
   *      <SomeComponent>
   *        { myField.jsx() }
   *      </SomeComponent>
   *     );
   *
   * ```
   * @returns {VNode}
   */
  jsx() {

    const currentClass  = [this.className, !this.isValid ? this.errorClass : ''].join(' ');
    const onChangeEvent = this.onchange.bind(this);
    const wrapperClass  = ['control-group', !this.isValid ? 'error' : ''].join(' ');

    // This only logs if this.debug == true
    this.logFieldInfo('rendering...');

    return (
      <div className={wrapperClass}>
        <input id={this.id}
               type={this.type}
               name={this.name}
               value={this.value}
               className={currentClass}
               onchange={onChangeEvent}/>
        {(!this.isValid ? <span class="help-inline error">{this.errorMsg}</span> : '')}
      </div>
    )
  }

  /**
   * If this.willDispatch is true then we'll dispatch an event from here
   * onchange. Otherwise it should be handled from a component somehow
   * and using this.fromState(value) the component can change input value.
   */
  onchange({target: {value = null, checked=false}}) {
    // Previous value for debug reasons only
    const prevValue  = this._value;
    this.value = this.format(toLower(this.type) === "checkbox" ? checked : value);

    this.logChangeInfo(prevValue, ...arguments);

    if (this.willDispatch) {
      dispatch({type: toUpper(this.eventType), value: this._value});
    }
  }

  condDispatch(eventTypeSuccess, eventTypeFailure = 'FIELD_INVALID', returnValue) {
    let dispatchedEvent;
    if (this.isValid) {
      const eventType = eventTypeSuccess ? eventTypeSuccess : this.eventType;
      dispatchedEvent = dispatch({type: eventType, value: this.format(this._value)});
    }
    else {
      dispatchedEvent = dispatch({type: eventTypeFailure, value: this.format(this._value)});
    }
    // Returns the value of input.. or the optional returnValue
    return isNil(returnValue) ? dispatchedEvent : false;
  }

}


export default Field;
