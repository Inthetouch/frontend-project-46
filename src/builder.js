const isObject = value => typeof value === 'object' && value !== null

export function buildAnser(data1, data2) {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = [...new Set([...keys1, ...keys2])]

  const diff = allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildAnser(value1, value2),
      }
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'removed',
        value: value1,
      }
    }

    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      }
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      }
    }
    return { key, type: 'unchanged', value: value1 }
  })
  return diff
};

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

export function format(diff) {
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
