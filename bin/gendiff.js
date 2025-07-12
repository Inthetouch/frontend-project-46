#!/usr/bin/env node
import { Command } from 'commander'
import { genDiff } from '../src/difference.js'

const program = new Command()

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .action((filepath1, filepath2) => {
    const options = program.opts()
    const diff = genDiff(filepath1, filepath2, options.format)
    console.log(diff)
  })

program.parse()
