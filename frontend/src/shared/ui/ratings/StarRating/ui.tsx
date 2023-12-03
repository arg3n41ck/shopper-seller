import React, { useState } from 'react'
import FillStar from 'public/images/icons/ratings/fill-star.svg'
import EmptyStar from 'public/images/icons/ratings/empty-star.svg'
import Image from 'next/image'

interface StarRatingProps {
  getRating?: (rating: number) => void
  ratingCount?: number
  rating: number
  label?: string
  disabled?: boolean
}

export const StarRating = ({
  getRating,
  rating: ratingProps = 0,
  ratingCount = 5,
  label,
  disabled,
}: StarRatingProps) => {
  const [rating, setRating] = useState(ratingProps)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (ratingValue: number) => {
    if (disabled) return
    setRating(ratingValue)
    getRating && getRating(ratingValue)
  }

  const handleMouseEnter = (ratingValue: number) => {
    if (disabled) return
    setHoverRating(ratingValue)
  }

  const fillCondition = (value: number) => (value <= (hoverRating || rating) ? FillStar : EmptyStar)

  return (
    <div className="grid justify-start gap-y-5">
      {label ? <p className="text-[16px] font-bold">{label}</p> : null}

      <div className="flex items-center">
        {[...Array(ratingCount)].map((_, index) => {
          const ratingValue = index + 1
          return (
            <button
              className={`px-[2px] ${disabled && 'cursor-default'}`}
              type="button"
              key={ratingValue}
              onClick={() => handleClick(ratingValue)}
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Image className="transition-all" src={fillCondition(ratingValue)} alt="star" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
