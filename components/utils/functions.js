export const countAppliedFilters = (filters) => {
  const filterKeysToExclude = ['competition', 'title']
  return Object.keys(filters).reduce((count, key) => {
    // Contar solo los filtros que no están en la lista de exclusión y que no son null o vacíos
    if (!filterKeysToExclude.includes(key) && filters[key]) {
      return count + 1
    }
    return count
  }, 0)
}

export const cleanFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (filters[key] != null) {
      acc[key] = filters[key]
    }
    return acc
  }, {})
}
