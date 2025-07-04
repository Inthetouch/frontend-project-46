import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { parse, genDiff } from '../src/parser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectResult = {
  'host': 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '- follow': false,
  '+ verbose': true,
}

describe('Сравнение двух файлов', () => {
  test.each([
    { file1: 'file1.json', file2: 'file2.json', format: 'JSON' },
    { file1: 'file1.yml', file2: 'file2.yaml', format: 'YAML' },
  ])('Проверка работы функции сравнения $format файлов', ({ file1, file2 }) => {
    const filepath1 = getFixturePath(file1)
    const filepath2 = getFixturePath(file2)
    expect(genDiff(parse(filepath1), parse(filepath2))).toEqual(expectResult)
  })
})
