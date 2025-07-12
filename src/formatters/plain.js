const formatValue = (value) => {
  if (typeof value === 'string' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export function plain(tree) {
  const iter = (nodes, parentPath) => {
    const lines = nodes.filter(node => node.type !== 'unchanged').map((node) => {
      const fullPath = parentPath ? `${parentPath}.${node.key}` : node.key
      switch (node.type) {
        case 'nested':
          return iter(node.children, fullPath)
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'changed':
          const value1 = formatValue(node.oldValue)
          const value2 = formatValue(node.newValue)
          return `Property '${fullPath}' was updated. From ${value1} to ${value2}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
    return lines.join('\n')
  }
  return iter(tree, '')
}
