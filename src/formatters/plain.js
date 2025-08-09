const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export function plain(tree) {
  const iter = (nodes, parentPath) => {
    const lines = nodes.reduce((acc, node) => {
      const fullPath = parentPath ? `${parentPath}.${node.key}` : node.key
      switch (node.type) {
        case 'nested':
          acc.push(iter(node.children, fullPath))
          break
        case 'added':
          acc.push(`Property '${fullPath}' was added with value: ${formatValue(node.value)}`)
          break
        case 'removed':
          acc.push(`Property '${fullPath}' was removed`)
          break
        case 'changed': {
          const value1 = formatValue(node.oldValue)
          const value2 = formatValue(node.newValue)
          acc.push(`Property '${fullPath}' was updated. From ${value1} to ${value2}`)
          break
        }
        case 'unchanged':
          break
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
      return acc
    }, [])
    return lines.flat().join('\n')
  }
  return iter(tree, '')
}
