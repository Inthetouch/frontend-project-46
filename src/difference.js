import { parseFile } from '../src/parser.js'
import { buildAnser } from '../src/builder.js'
import { format } from '../src/formatters/index.js'

export function genDiff(file1, file2, formatName = 'stylish') {
  const data1 = parseFile(file1)
  const data2 = parseFile(file2)
  const diff = buildAnser(data1, data2)
  const result = format(diff, formatName)
  return result
}
