import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFileFormat = filepath => path.extname(filepath).slice(1)

export function parse(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const fileFormat = getFileFormat(absolutePath)

  if (fileFormat === 'json') {
    return JSON.parse(content)
  }
  else if (fileFormat === 'yml' || fileFormat === 'yaml') {
    return yaml.load(content)
  }
  else {
    throw new Error(`Unsupported file format: ${fileFormat}`)
  }
}
