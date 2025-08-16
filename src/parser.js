import yaml from 'js-yaml'

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

export default parseContent