# envdotyml
[![npm](https://img.shields.io/npm/v/envdotyml.svg)](https://www.npmjs.com/package/envdotyml)
[![CI Status](https://github.com/vinsonchuong/envdotyml/workflows/CI/badge.svg)](https://github.com/vinsonchuong/envdotyml/actions?query=workflow%3ACI)
[![dependencies Status](https://david-dm.org/vinsonchuong/envdotyml/status.svg)](https://david-dm.org/vinsonchuong/envdotyml)
[![devDependencies Status](https://david-dm.org/vinsonchuong/envdotyml/dev-status.svg)](https://david-dm.org/vinsonchuong/envdotyml?type=dev)

Load environment variables from a `.env.yml` file

## Usage
Install [envdotyml](https://www.npmjs.com/package/envdotyml)
by running:

```sh
yarn add envdotyml
```

Then, at the top of a file that will be executed before you access any
environment variables, add:

```js
import 'envdotyml/set.js'
```

Alternatively, for more control over when environment variables are set:

```js
import {parse, set} from 'envdotyml'

async function run() {
  // Reads environment variables and mutates `process.env`
  await set()

  // Returns the environment variables without mutating `process.env`
  const vars = await parse()
}

run()
```

The `.env.yml` is expected to be an associative array:

```yaml
STRING: Hello World!
MULTILINE_STRING: |
  foo
  bar
  baz
ARRAY:
  - One
  - Two
  - Three
OBJECT:
  key: value
```

Strings are left as is. More complex values are converted to JSON strings.

If `.env.yml` does not exist, `parse` will return an empty object, and `set`
will do nothing.
