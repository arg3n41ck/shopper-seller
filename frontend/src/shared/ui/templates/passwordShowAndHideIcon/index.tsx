import React, { FC } from 'react'
import { Eye, EyeOff } from 'react-feather'

type TypePasswordTypeIcon = {
	show: boolean
	onHide: () => void
	onShow: () => void
}

const ShowAndHideIcon: FC<TypePasswordTypeIcon> = ({
	show,
	onHide,
	onShow,
}) => {
	return show ? (
		<EyeOff onClick={onHide} cursor='pointer' />
	) : (
		<Eye onClick={onShow} cursor='pointer' />
	)
}
export default ShowAndHideIcon
