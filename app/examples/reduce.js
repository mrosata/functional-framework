"use strict"
/**
 * Reduce an array to a singular value
 *
 * @param  {function} reducer - function to reduce array with
 * @param  {*} defaultValue   - value to start with
 * @param  {array} list       - array to reduce
 * @return {*}                - final reduction value
 */
export default function reduce (reducer, defaultValue, list) {
  let accumulator = defaultValue;
  for (let i = 0; i < list.length; i++) {
    accumulator = reducer(accumulator, list[i])
  }
  return accumulator
}
