import { Argon2id } from "oslo/password"



///Posts Helpers
export async function hasherPassword(password: string) {
  const hashedPassword = await new Argon2id().hash(password)
  return hashedPassword
}
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

