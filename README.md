unfatten
===

[![Greenkeeper badge](https://badges.greenkeeper.io/skewten/unfatten.svg)](https://greenkeeper.io/)

[![npm version](https://img.shields.io/npm/v/unfatten.svg?style=flat-square)](https://npmjs.com/package/unfatten)
[![javascript standard style](https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square)](http://standardjs.com/)
[![travis build](https://img.shields.io/travis/skewten/unfatten/master.svg?style=flat-square)](https://travis-ci.org/skewten/unfatten)
[![coveralls coverage](https://img.shields.io/coveralls/skewten/unfatten.svg?style=flat-square)](https://coveralls.io/github/skewten/unfatten)
[![david dependencies](https://david-dm.org/skewten/unfatten.svg?style=flat-square)](https://david-dm.org/skewten/unfatten)
[![david dev dependencies](https://david-dm.org/skewten/unfatten/dev-status.svg?style=flat-square)](https://david-dm.org/skewten/unfatten)

Simple schema-based object filtering

**Requires node v4 or above**

`npm install unfatten`

- [usage](#usage)
- [api](#api)

---

usage
---

```js
import unfatten from 'unfatten'

const fatObj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    a: 2,
    b: [3, 'a', {hi: 'hello', bye: 'goodbye'}],
    c: 4,
    d: 5,
    e: [6, 7, 8]
  }
}

const filter = {
  a: true,
  c: true,
  d: {
    b: [true, false, {hi: true}],
    c: true,
    e: {
      1: true
    }
  }
}

const thinObj = unfatten(fatObj, filter)

console.log(thinObj)
/*
{
  a: 1,
  c: 3,
  d: {
    b: [3, {hi: 'hello'}],
    c: 4,
    e: [7]
  }
}
*/
```

api
---

`unfatten(data, schema)`

Filters an object to given filters.

`data` is a non-null object that will be filtered

`schema` is the schema that we use to filter the object with. See the example in the usage above.

Properties of the object are 1:1 mappings against the source object. If a value encountered during filtering is `undefined`, then the filter will throw an error.

The schema's value's function is dependent on the source object property's value:

For primitive values (`null`, `string`, `number`):

- `true` will include the value in the filtered object.
- `false` will not include the value in the filtered object. If not part of an object, it will be `undefined`.
- Everything else will throw an error.

For arrays (`[]`):

- `true` will include the value in the filtered object.
- `false` will not include the value in the filtered object. If not part of an object, it will be `undefined`.
- An array will include a _filtered_ array, with these rules:
  - Given array must have valid unfatten schemas, for recursive filtering.
  - The array will filter the source object array by index, a 1:1 mapping. For example, in array [1, 2, 3, 4], [true, false, true] will filter the array to [1, 3].
- An object will include a _filtered_ array, with these rules:
  - Given object's properties must be valid unfatten schemas, for recursive filtering.
  - The object will filter the source object array by index, defined by the object's properties. For example, in array [1, 2, 3, 4], {0: true, 1: false, 2: true} will filter the array to [1, 3].
- Everything else will throw an error.

For objects (`{}`):

- `true` will include the value in the filtered object.
- `false` will not include the value in the filtered object. If not part of an object, it will be `undefined`.
- An object will recurse the filter on the source object's property, using the given object as the unfatten schema.
- Everything else will throw an error.
