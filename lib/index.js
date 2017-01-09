'use strict'

function unfatten (data, filter) {
  if (typeof data === undefined) {
    throw new Error('data must not be undefined')
  }

  if (filter === true) {
    return data
  } else if (filter === false) {
    return undefined
  }

  let retval

  if (Array.isArray(data)) {
    // array data
    retval = []
    if (Array.isArray(filter)) {
      for (let i = 0; i < filter.length; i++) {
        const filterVal = filter[i]
        const filterData = data[i]
        if (filterData === undefined) {
          throw new Error('array value must not be undefined')
        }
        if (filterVal === false) continue
        retval.push(unfatten(filterData, filterVal))
      }
    } else if (filter && typeof filter === 'object') {
      for (let key of Object.keys(filter)) {
        const filterVal = filter[key]
        const filterData = data[key]
        if (filterData === undefined) {
          throw new Error('array value must not be undefined')
        }
        if (filterVal === false) continue
        retval.push(unfatten(filterData, filterVal))
      }
    } else {
      throw new Error('invalid filter type for array data')
    }
  } else if (data && typeof data === 'object') {
    // object data
    retval = {}
    if (filter && typeof filter === 'object') {
      for (let key of Object.keys(filter)) {
        const filterVal = filter[key]
        const filterData = data[key]
        if (filterData === undefined) {
          throw new Error('object value must not be undefined')
        }
        if (filterVal === false) continue
        retval[key] = unfatten(data[key], filterVal)
      }
    } else {
      throw new Error('invalid filter type for object data')
    }
  } else {
    throw new Error('invalid filter type for primitive data')
  }

  return retval
}

module.exports = unfatten
