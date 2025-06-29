import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { parse, genDiff } from '../src/parser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('Сравнение двух JSON файлов', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  const exampleObject = {
    host: 'hexlet.io',
    '- timeout': 50,
    '+ timeout': 20,
    '- proxy': '123.234.53.22',
    '- follow': false,
    '+ verbose': true,
  }

  expect(genDiff(parse(filepath1), parse(filepath2))).toEqual(exampleObject)
})