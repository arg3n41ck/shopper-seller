import styled from 'styled-components'

export const ProductDetailCarouselContainer = styled.div`
	position: relative;
	max-width: 340px;
	overflow: hidden;
	height: 343px;

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: none;
		display: flex;
		justify-content: center;
	}

	.swiper-slide img {
		display: block;
		width: 252px;
		height: 315px;
		object-fit: cover;
	}

	/* .swiper {
		margin-left: auto;
		margin-right: auto;
	} */
`

export const CustomPrevButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	font-size: 18px;
	width: 36px;
	height: 36px;
	background-color: #171717;
	color: #fff;
	border: none;
	cursor: pointer;
	z-index: 10;
`

export const CustomNextButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	font-size: 18px;
	width: 36px;
	height: 36px;
	background-color: #171717;
	color: #fff;
	border: none;
	cursor: pointer;
	z-index: 10;
`

export const CustomPagination = styled.div`
	width: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	bottom: 0px !important;

	.swiper-pagination-bullet {
		width: 8px;
		height: 8px;
		background: #171717;
		margin: 0 4px 0 0 !important;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		bottom: 10px !important;
		left: 10px !important;
	}
`
