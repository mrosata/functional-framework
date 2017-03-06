import R from 'ramda';

const {is, isEmpty, isNil, toLower} = R;
const isCallable = is(Function);

/**
 * This holds default values, type of fields allowed and error
 * messages. The Field component will extend this which should
 * hopefully make the `Field` class look a bit cleaner with all
 * these default values out of the way. Also we have 1 place to
 * edit these "base" values.
 */
export default class BaseField {

  static get TYPES() {
    return [
      'number', 'text', 'checkbox', 'radio'
    ];
  }

  static get DEFAULTS() {
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

  /**
   * Make sure inputs that are numbers get formatted as numbers.
   * @param inputValue
   * @returns {number}
   */
  format(inputValue) {
    switch(toLower(this.type)) {
      case "number":
        return +inputValue;
      case "checkbox":
        return !!inputValue;
      default:
        return inputValue;
    }
  }

  constructor({
    name, id, type:inputType, defaultValue, className, errorClass, errorMsg, eventType, willDispatch, debug, validation = () => true
  }) {

    const toLowerType = toLower(inputType);

    this.isValid      = true;
    this.willDispatch = !!willDispatch;
    this.className    = className || 'input-control';
    this.errorClass   = errorClass || 'error';
    this.errorMsg     = is(String, errorMsg) ? errorMsg : 'Invalid Input Value!'
    this.eventType    = is(String, eventType) && !isEmpty(eventType) ? eventType : 'FIELD_ONCHANGE';
    this.name         = name ? name : BaseField.error('name', name);
    this.id           = id ? id : name;
    this.type         = BaseField.TYPES.includes(toLowerType) ? inputType : Field.error('type', inputType);
    this.validation   = isCallable(validation) ? validation : Field.error('validation', validation);
    this.defaultValue = defaultValue || BaseField.DEFAULTS[toLowerType];

    this.debug = debug ? !!debug : false;
  }

  get value() {
    return isNil(this._value) ? this.defaultValue : this.format(this._value);
  }

  set value(value) {
    this._value = value;
    this.validate(value);
  }

  validate(value) {
    console.log('VALIDATING');
    this.isValid = this.validation(value);
  }

  // abstract
  onchange(info) {
    throw new Error('All Inputs extending BaseField Must Implement an "onchange" method!')
  }

}
