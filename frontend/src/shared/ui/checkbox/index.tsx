import React, { FC, ReactNode } from 'react'
import { CheckboxWrapper, ErrorText, HelperText } from './styles'

interface CustomCheckboxProps {
	label?: string | ReactNode
	checked?: boolean
	onChange: () => void
	className?: string
	error?: boolean | undefined
	errorMessage?: string
	helperText?: string
}

const Checkbox: FC<CustomCheckboxProps> = ({
	label,
	checked = false,
	onChange,
	className,
	error,
	helperText,
	errorMessage,
}) => {
	return (
		<>
			<CheckboxWrapper
				checked={checked}
				className={`${error ? 'error' : ''} ${className}`}
			>
				<input hidden type='checkbox' checked={checked} onChange={onChange} />

				<span></span>

				{label && <label>{label}</label>}
			</CheckboxWrapper>

			{errorMessage ? (
				<ErrorText>{errorMessage}</ErrorText>
			) : (
				<HelperText>{helperText}</HelperText>
			)}
		</>
	)
}

export default Checkbox
