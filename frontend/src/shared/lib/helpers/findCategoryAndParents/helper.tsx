import { Category } from '@/shared/api/gen'

export const findCategoryAndParents = (categories: Category[] | undefined, identifier: string | number): string[] => {
  if (!categories) return []

  const queue: { category: Category; path: string[] }[] = categories.map((cat) => ({ category: cat, path: [] }))

  while (queue.length > 0) {
    const { category, path } = queue.shift()!

    const isMatch = typeof identifier === 'number' ? category.id === identifier : category.slug === identifier
    if (isMatch) {
      return [...path, category.title]
    }

    category.children?.forEach((child) => {
      queue.push({ category: child, path: [...path, category.title] })
    })
  }

  return []
}
