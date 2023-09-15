import React, { FC } from 'react'
import { StyledSkeleton } from './styles'

export interface SkeletonProps {
	width?: string
	height?: string
	border?: string
}

const Skeleton: FC<SkeletonProps> = ({ width, height, border }) => (
	<StyledSkeleton width={width} height={height} border={border} />
)

export default Skeleton
