import { StarRating } from '@/shared/ui/ratings'
import React from 'react'

const ProductDetailReview = () => {
  return (
    <div className="inline-flex w-full max-w-[548px] flex-col items-start justify-start gap-2 border-b border-neutral-200 pb-3">
      <div className="inline-flex w-full items-center justify-start gap-1">
        <p className="shrink grow basis-0  text-lg font-medium text-neutral-900">Имя пользователя</p>

        <StarRating rating={4} disabled />
      </div>
      <div className="inline-flex items-start justify-start gap-2">
        <p className=" text-base font-normal text-stone-500">Красный</p>
      </div>
      <div className=" text-base font-normal text-black">
        Ответственный выбор: Этот товар как минимум на 50% состоит из переработанных или повторно использованных
        материалов. Мы рекомендуем стирать вещи из переработанных синтетических тканей в специальном мешке, чтобы
        микропластик не попадал в сточные воды.
      </div>
    </div>
  )
}

export default ProductDetailReview
