import { ProductReview } from '@/shared/api/gen/dist'
import { StarRating } from '@/shared/ui/ratings'
import React, { FC } from 'react'

interface TypeProductDetailReviewProps {
  review: ProductReview
}

const ProductDetailReview: FC<TypeProductDetailReviewProps> = ({ review }) => {
  return (
    <div className="inline-flex w-full max-w-[548px] flex-col items-start justify-start gap-2 border-b border-neutral-200 pb-3">
      <div className="inline-flex w-full items-center justify-start gap-1">
        <p className="shrink grow basis-0  text-lg font-medium text-neutral-900">{review.customer?.full_name}</p>

        <StarRating rating={review.star} disabled />
      </div>

      <div className=" text-base font-normal text-black">{review.review}</div>
    </div>
  )
}

export default ProductDetailReview
