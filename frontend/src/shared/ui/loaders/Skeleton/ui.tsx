import React, { ComponentPropsWithRef } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'

export const Skeleton = ({ className }: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn(`relative h-full w-full overflow-hidden rounded-md bg-[#e8e8e8]`, styles.StyledSkeleton, className)}
  />
)
