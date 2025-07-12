const isObject = value => typeof value === 'object' && value !== null

export function stringify(value, deep) {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }
  const indent = ' '.repeat(deep * 4)
  const bracket = ' '.repeat(deep * 4 - 4)

  const lines = Object.entries(value).map(([key, value]) => {
    const formValue = stringify(value, deep + 1)
    return `${indent}${key}: ${formValue}`
  })
  return `{\n${lines.join('\n')}\n${bracket}}`
}

export function stylish(diff) {
  const iter = (tree, deep) => {
    const indent = deep * 4
    const currentIndent = ' '.repeat(indent - 2)
    const bracketIndent = ' '.repeat(indent - 4)

    const lines = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, deep + 1)}`
        case 'changed':
          const line1 = `${currentIndent}- ${node.key}: ${stringify(node.oldValue, deep + 1)}`
          const line2 = `${currentIndent}+ ${node.key}: ${stringify(node.newValue, deep + 1)}`
          return `${line1}\n${line2}`
        case 'added':
          return `${currentIndent}+ ${node.key}: ${stringify(node.value, deep + 1)}`
        case 'removed':
          return `${currentIndent}- ${node.key}: ${stringify(node.value, deep + 1)}`
        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${stringify(node.value, deep + 1)}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }
  return iter(diff, 1)
}

export { isObject }
