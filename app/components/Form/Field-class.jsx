import {dispatch} from '../../index';
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
const {toLower, toUpper, isNil, is, type, isEmpty} = R;
const isCallable = is(Function);


/**
 * This holds default values, type of fields allowed and error
 * messages. The Field component will extend this which should
 * hopefully make the `Field` class look a bit cleaner with all
 * these default values out of the way. Also we have 1 place to
 * edit these "base" values.
 */
class BaseField {

  static get TYPES() {
    return [
      'number', 'text', 'checkbox', 'radio'
    ];
  }

  static get DEFAULTS () {
    return {
      number:   0,
      text:     '',
      checkbox: '',
      radio:    ''
    };
  }

  static error(fieldType, value) {

    switch (toLower(fieldType)) {
      case 'name':
        throw new Error(`Fields require a name, you passed ${type(value)}`);
        break;
      case 'type':
        throw new Error(`Invalid field type ${type(value)}`);
        break;
      case 'validation':
        throw new Error(`Field "validation" type must be function, you passed ${type(value)}`)
        break;
      default:
        throw new Error(`Unknown Error in field; type: ${fieldType}, info: ${value}`);
    }
  }

  constructor({
    name, id, type:inputType, defaultValue, className, errorClass, errorMsg, eventType, willDispatch, validation = () => true}) {

    const toLowerType = toLower(inputType);

    this.isValid      = true;
    this.willDispatch = !!willDispatch;
    this.className    = className || 'input-control';
    this.errorClass   = errorClass || 'error';
    this.errorMsg     = is(String, errorMsg) ? errorMsg : 'Invalid Input Value!'
    this.eventType    = is(String, eventType) && !isEmpty(eventType) ? eventType : 'FIELD_ONCHANGE' ;
    this.name         = name ? name : BaseField.error('name', name);
    this.id           = id ? id : name;
    this.type         = BaseField.TYPES.includes(toLowerType) ? inputType : Field.error('type', inputType);
    this.validation   = isCallable(validation) ? validation : Field.error('validation', validation);
    this.defaultValue = defaultValue || BaseField.DEFAULTS[toLowerType];
  }

  get value() {
    return isNil(this._value) ? this.defaultValue : this._value;
  }

  set value(value) {
    this._value = value;
    this.validate(value);
  }

  validate(value) {
    console.log('VALIDATING');
    this.isValid = this.validation(value);
  }

}


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
    const wrapperClass = ['control-group', !this.isValid ? 'error' : ''].join(' ');

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
  onchange({currentTarget: {value = null}}) {
    this.value = value;

    if (this.willDispatch) {
      dispatch({type: toUpper(this.eventType), value: value})
    }
  }

}


export default Field;
