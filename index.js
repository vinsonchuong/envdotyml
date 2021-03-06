import path from 'node:path'
import {promises as fs} from 'node:fs'
import yaml from 'js-yaml'
import {mapValues} from 'lodash-es'

export async function parse() {
  try {
    const config = yaml.load(await fs.readFile(path.resolve('.env.yml')))
    return mapValues(config, (value) =>
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {}
    }

    throw error
  }
}

export async function set() {
  const config = await parse()
  for (const [key, value] of Object.entries(config)) {
    if (key in process.env) {
      continue
    }

    process.env[key] = value
  }
}
