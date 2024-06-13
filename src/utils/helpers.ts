


///Posts Helpers

export function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
export function generateCategoryData(categories) {
  let categoryData = []
  categories.forEach((category) => {
    categoryData.push({
      name: category,
      slug: `${slugify(category)}`
    })
  })
  return categoryData
}

