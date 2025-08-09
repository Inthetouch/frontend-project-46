import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFileFormat = filepath => path.extname(filepath).slice(1)

function readFile(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

function parseContent(content, format) {
  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yml':
    case 'yaml':
      return yaml.load(content)
    default:
      throw new Error(`Не известный формат: ${format}`)
  }
}

export function parseFile(filepath) {
  const content = readFile(filepath)
  const format = getFileFormat(filepath)
  return parseContent(content, format)
}