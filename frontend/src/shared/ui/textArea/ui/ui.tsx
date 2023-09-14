import { ChangeEvent, FC, ReactNode, useRef, useState } from 'react'
import {
	EndAdornmentCont,
	TAErrorText,
	TAHelperText,
	TALabel,
	TextAreaCont,
	TextAreaInput,
	TextAreaWrapper,
} from './styles'

interface TextAreaProps {
	startAdornment?: ReactNode
	endAdornment?: ReactNode
	value: string
	label?: string | ReactNode
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
	error?: boolean
	errorMessage?: any
	helperText?: string
	className?: string
	[x: string]: any
}

const TextArea: FC<TextAreaProps> = ({
	startAdornment,
	endAdornment,
	value,
	label,
	onChange,
	error,
	errorMessage,
	helperText,
	className,
	...others
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [focused, setFocus] = useState(false)
	const isActive = focused || value ? 'active' : ''
	const isError = error ? 'error' : ''

	return (
		<TextAreaWrapper className={className}>
			{label && <TALabel className={`${isActive}`}>{label}</TALabel>}
			<TextAreaCont
				onClick={() => textareaRef.current && textareaRef.current.focus()}
				className={`${isError} ${isActive}  ${label ? 'mt-2' : ''}`}
			>
				{startAdornment && startAdornment}

				<TextAreaInput
					ref={textareaRef}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					value={value}
					onChange={onChange}
					autoComplete='new-password'
					className={`${isError}`}
					rows={10}
					{...others}
				/>

				{endAdornment && (
					<EndAdornmentCont className={`${isActive}`}>
						{endAdornment}
					</EndAdornmentCont>
				)}
			</TextAreaCont>
			{errorMessage ? (
				<TAErrorText>{errorMessage}</TAErrorText>
			) : (
				<TAHelperText>{helperText}</TAHelperText>
			)}
		</TextAreaWrapper>
	)
}

export default TextArea
