import { SellerClient } from '@/shared/apis/sellerClient'

const sellerClient = new SellerClient()

export const convertStringTagsToIds = async (stringTags: string[]) => {
  const createdTagIds: number[] = []

  await Promise.all(
    stringTags.map(async (tag) => {
      const response = await sellerClient.createTag(tag)
      !!response?.id && createdTagIds.push(response.id)
    }),
  )
  return createdTagIds
}
