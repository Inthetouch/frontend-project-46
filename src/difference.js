import { parse } from '../src/parser.js'
import { buildAnser } from '../src/builder.js'
import { format } from '../src/formatters/index.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diff = buildAnser(data1, data2)
  const result = format(diff, formatName)
  return result
}
