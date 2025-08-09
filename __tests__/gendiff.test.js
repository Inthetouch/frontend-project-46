import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import genDiff from '../src/difference.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const stylishResult = fs.readFileSync(getFixturePath('expected_result.txt'), 'utf-8')
const plainResult = fs.readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8')
const jsonResult = fs.readFileSync(getFixturePath('expected_result.json'), 'utf-8')

describe('gendiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', stylishResult],
    ['file1.yml', 'file2.yaml', 'stylish', stylishResult],
    ['file1.json', 'file2.json', 'plain', plainResult],
    ['file1.yml', 'file2.yaml', 'plain', plainResult],
    ['file1.json', 'file2.json', 'json', jsonResult],
    ['file1.yml', 'file2.yaml', 'json', jsonResult],
  ])('Проверка %s и %s в формате %s ', (file1, file2, format, expected) => {
    const filepath1 = getFixturePath(file1)
    const filepath2 = getFixturePath(file2)
    expect(genDiff(filepath1, filepath2, format)).toEqual(expected)
  })
})
