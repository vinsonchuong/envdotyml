import path from 'node:path'
import test from 'ava'
import {parse} from './index.js'

test.serial('parsing .env.yml', async (t) => {
  t.deepEqual(await parse(), {
    STRING: 'Hello World!',
    MULTILINE_STRING: 'foo\nbar\nbaz\n',
    ARRAY: JSON.stringify(['One', 'Two', 'Three']),
    OBJECT: JSON.stringify({
      key: 'value'
    })
  })
})

test.serial(
  'setting environment variables from .env.yml without modifying existing variables',
  async (t) => {
    process.env.STRING = 'Already Set'
    await import('./set.js')

    t.like(process.env, {
      STRING: 'Already Set',
      MULTILINE_STRING: 'foo\nbar\nbaz\n',
      ARRAY: JSON.stringify(['One', 'Two', 'Three']),
      OBJECT: JSON.stringify({
        key: 'value'
      })
    })
  }
)

test.serial(
  'returning an empty object if .env.yml does not exist',
  async (t) => {
    process.chdir(path.resolve('.github'))

    t.deepEqual(await parse(), {})
  }
)
