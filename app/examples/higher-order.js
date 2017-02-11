"use strict"
import R from 'ramda'
import {log} from '../utils/logger'

/**
 * @module higher-order
 * head, tail, pair, query, pickAll,
 */

/**
 * Return the first element from an array
 * @param  {array<*>} a - list to get head of
 * @return {*}     - first element of list
 */
export const head = ([a]) => a


/**
 * Return the last elements of array unless the array has length of 1
 * this will be every item except the head. (I should look up and
 * check that is the default tail behaviour of single element array
 * for most tail implementations)
 * @param  {array<*>} list - list to get tail of
 * @return {array<*>}      - last elements of the array
 */
export const tail = list => {
  const _list = [].concat(list)
  const idx = Math.min(_list.length - 1, 1)
  return list.slice(idx)
}

/**
 * Create an immutable pair from 2 elements
 * @param  {*} first  - first element
 * @param  {*} second - second element
 * @return {array<*>}      - 2 element array "pair"
 */
export const pair = (first, second) => Object.freeze([first, second])


/**
 * Get selected properties from an object
 *
 * can be distilled down to:
 * reduce((result, key) => result[key] = record[key], {}, keys)
 *
 * @param  {string[]} keys   - keys to select
 * @param  {object}   record - object with properties to select from.
 * @return {object}   - Object with selected properties and values
 */
export const pickAll = (keys, record) => {
  const result = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    result[key] = record[key]
  }
  return result
}


/**
 * Query selected keys from a set of records
 *
 * can be distilled down to:
 * (keys, records) => records.map(record => pickAll(keys))
 *
 * @param  {string[]} keys    - keys to select
 * @param  {object[]} records - object which properties will be selected.
 * @return {object[]}         - array of objects with selected key:vales.
 */
export const query = (keys, records) => {
  let selected = []
  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    selected.push( pickAll(keys, record) )
  }
}
