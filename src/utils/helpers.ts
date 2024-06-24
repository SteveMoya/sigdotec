

import argon2 from 'argon2'

export async function hasherPassword(password: string) {
  const hashedPassword = await argon2.hash(password)
  return hashedPassword
}
///Posts Helpers
export async function slugify(string: string) {
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
export async function generateCategoryData(categories: any) {
  let categoryData = []
  categories.forEach((category) => {
    categoryData.push({
      name: category,
      slug: `${slugify(category)}`
    })
  })
  return categoryData
}

