import test from 'ava'
import {parse} from './index.js'

test('parsing .env.yml', async (t) => {
  t.deepEqual(await parse(), {
    STRING: 'Hello World!',
    MULTILINE_STRING: 'foo\nbar\nbaz\n',
    ARRAY: JSON.stringify(['One', 'Two', 'Three']),
    OBJECT: JSON.stringify({
      key: 'value'
    })
  })
})

test('setting environment variables from .env.yml without modifying existing variables', async (t) => {
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
})
