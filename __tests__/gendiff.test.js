import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { genDiff } from '../src/difference.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('Сравнение двух файлов', () => {
  test.each([
    { file1: 'file1.json', file2: 'file2.json', format: 'JSON' },
    { file1: 'file1.yml', file2: 'file2.yaml', format: 'YAML' },
  ])('Проверка работы функции сравнения $format файлов', ({ file1, file2 }) => {
    const filepath1 = getFixturePath(file1)
    const filepath2 = getFixturePath(file2)
    const expectResult = fs.readFileSync(getFixturePath('expect_result.txt'), 'utf-8')
    expect(genDiff(filepath1, filepath2)).toEqual(expectResult)
  })
})
