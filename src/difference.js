import { parse } from '../src/parser.js'
import { buildAnser, format } from '../src/builder.js'

export default function genDiff(filepath1, filepath2) {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diff = buildAnser(data1, data2)
  const result = format(diff)
  return result
}
