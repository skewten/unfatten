import test from 'ava'
import unfatten from '../'

test('readme example should work', t => {
  t.plan(1)

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

  const thinObjExpected = {
    a: 1,
    c: 3,
    d: {
      b: [3, {hi: 'hello'}],
      c: 4,
      e: [7]
    }
  }

  t.deepEqual(thinObj, thinObjExpected)
})
