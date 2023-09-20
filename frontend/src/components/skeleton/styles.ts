import styled from 'styled-components'
import { SkeletonProps } from '.'

export const StyledSkeleton = styled.div<SkeletonProps>`
	display: inline-block;
	position: relative;
	width: ${({ width }) => (width ? width : '100px')};
	height: ${({ height }) => (height ? height : '20px')};
	border-radius: ${({ border }) => (border ? border : '4px')};
	overflow: hidden;
	background-color: #e8e8e8;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -150px;
		width: 150px;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.2);
		animation: loading 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes loading {
		from {
			left: -150px;
		}
		to {
			left: 100%;
		}
	}
`
