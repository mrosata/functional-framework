"use strict"
/**
 * Create actions (helper)
 * @param  {string} actionTitle         - action name, IE: 'INCREASE'
 * @param  {*?}     [defaultValue=null] - a default value
 * @return {Action}
 */
export const actionFactory = (actionTitle, defaultValue=null) => {
  return (value=defaultValue) => {action: actionTitle, value}
}

export const DEPOSIT = action('DEPOSIT')
