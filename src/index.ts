import { Command } from 'commander'
import * as fs from 'fs'
import * as path from 'path'

import * as packageInfo from '../package.json'

const scripts = fs
  .readdirSync(path.join(__dirname, 'scripts'))
  .filter((f) => /[.]ts$/.test(f))
  .map((f) => f.replace(/[.]ts$/, ''))

const start = async () => {
  const program = new Command()

  program.version(packageInfo.version)

  for (const script of scripts) {
    const s = await import(`./scripts/${script}`)

    s.register(program)
  }

  program.parse(process.argv)
}

start()
