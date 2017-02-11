"use strict"
import {log} from '../utils/logger'

/**
 * Create a new Array with the results from a `predicate`
 * function performed individually over each item in `list`
 *
 * @param  {function} predicate - Function to apply
 * @param  {array} list            - Array with values to map over
 * @return {array}                 - Array with mapped results
 */
function basicMap (predicate, list) {
  // Create a new Array to hold the mapped values.
  const result = []
  // Go through each item in our list.
  for(let i = 0; i < list.length; i++) {
    // Map the result of applying current item to the predicate function
    // to the same index {i} on our results array
    result[i] = predicate(list[i])
  }

  return result
}


/**
 * map - A flexible implementation that will work over objects as well
 *       as arrays.
 *
 * @example map(double, { x:1, y:2, z:3 })  // { x: 2, y: 4, z: 6 }
 *
 * @param  {function} predicate - Function to apply
 * @param  {object|array} functor - Object|Array to map over
 * @return {object|array}
 */
export default function map (predicate, functor) {
  const emptyContainer = functor instanceof Array ? [] : {}

  return Object.keys(functor)
    .reduce((acc, key) => {
      acc[key] = predicate(functor[key])
      return acc
    }, emptyContainer)
}
