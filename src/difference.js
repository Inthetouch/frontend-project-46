import fs from 'fs'
import path from 'path'
import parseContent from '../src/parser.js'
import { buildAnser } from '../src/builder.js'
import { format } from '../src/formatters/index.js'

function readFile(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFileFormat = filepath => path.extname(filepath).slice(1)

export function parseFile(filepath) {
  const content = readFile(filepath)
  const format = getFileFormat(filepath)
  return parseContent(content, format)
}

export default function genDiff(file1, file2, formatName = 'stylish') {
  const data1 = parseFile(file1)
  const data2 = parseFile(file2)
  const diff = buildAnser(data1, data2)
  const result = format(diff, formatName)
  return result
}
