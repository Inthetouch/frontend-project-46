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

export function genDiff(objec1, objec2) {
  const keys1 = Object.keys(objec1)
  const keys2 = Object.keys(objec2)

  const result = {}
  const allKeys = new Set([...keys1, ...keys2])

  for (const key of allKeys) {
    if (key in objec1 && key in objec2) {
      if (objec1[key] === objec2[key]) {
        result[key] = objec1[key]
      }
      else {
        result[`- ${key}`] = objec1[key]
        result[`+ ${key}`] = objec2[key]
      }
    }
    else if (key in objec1) {
      result[`- ${key}`] = objec1[key]
    }
    else if (key in objec2) {
      result[`+ ${key}`] = objec2[key]
    }
  }
  return result
}
