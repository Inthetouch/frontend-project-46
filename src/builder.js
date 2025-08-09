import _ from 'lodash'

export function buildAnser(data1, data2) {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy([...new Set([...keys1, ...keys2])])

  const diff = allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
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

    if (!_.isEqual(value1, value2)) {
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
