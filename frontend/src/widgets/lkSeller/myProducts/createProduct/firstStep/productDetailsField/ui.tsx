import React, { FC } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import Button from '@/shared/ui/button'
import TextField from '@/shared/ui/textField'
import { Plus } from 'react-feather'
import {
	ChildFormContainer,
	FormAndHeadTextContainer,
	HeadTextOfForm,
	SelectedOptionsType,
} from '../styles'

interface SpecificationInput {
	value: string
	placeholder: string
}

interface SpecificationGroup {
	inputs: SpecificationInput[]
}

interface ProductDetailsFieldProps {
	title?: string
	fieldName: string
	className?: string
	formik: any
}

const ProductDetailsField: FC<ProductDetailsFieldProps> = ({
	title,
	fieldName,
	className,
	formik,
}) => {
	const handleAddInput = () => {
		const updatedValues = [...formik.values[fieldName]]
		const newGroup: SpecificationGroup = {
			inputs: [
				{ value: '', placeholder: 'Состав товара' },
				{ value: '', placeholder: '40%' },
			],
		}
		updatedValues.push(newGroup)
		formik.setFieldValue(fieldName, updatedValues)
	}

	const handleInputChange = (
		groupIndex: number,
		inputIndex: number,
		value: string
	) => {
		const updatedValues = [...formik.values[fieldName]]
		if (groupIndex >= 0 && groupIndex < updatedValues.length) {
			const group = updatedValues[groupIndex]
			if (inputIndex >= 0 && inputIndex < group.inputs.length) {
				const updatedInputs = [...group.inputs]
				updatedInputs[inputIndex] = { ...updatedInputs[inputIndex], value }
				updatedValues[groupIndex] = { ...group, inputs: updatedInputs }
				formik.setFieldValue(fieldName, updatedValues)
			}
		}
	}

	return (
		<FormAndHeadTextContainer className={className}>
			{title && <HeadTextOfForm>{title}</HeadTextOfForm>}

			<div className={'w-[100%] grid grid-cols-[1fr, 68px]'}>
				<ChildFormContainer>
					{formik.values[fieldName].map(
						(group: SpecificationGroup, groupIndex: number) => (
							<SelectedOptionsType key={groupIndex}>
								{group.inputs.map(
									(input: SpecificationInput, inputIndex: number) => (
										<div key={inputIndex}>
											<TextField
												value={input.value}
												placeholder={input.placeholder}
												onChange={e =>
													handleInputChange(
														groupIndex,
														inputIndex,
														e.target.value
													)
												}
												// error={
												// 	formik.touched.specifications &&
												// 	formik.touched.specifications[groupIndex] &&
												// 	Boolean(
												// 		formik.errors.specifications &&
												// 			formik.errors?.specifications[groupIndex]
												// 	)
												// }
												// errorMessage={
												// 	formik.touched.specifications &&
												// 	formik.touched.specifications[groupIndex]
												// 		? formik.errors?.specifications[groupIndex]
												// 		: ''
												// }
											/>
										</div>
									)
								)}
							</SelectedOptionsType>
						)
					)}
				</ChildFormContainer>

				<Button
					onClick={handleAddInput}
					variant={BUTTON_STYLES.withoutBackground}
					className={'mt-5'}
				>
					<Plus />
				</Button>
			</div>
		</FormAndHeadTextContainer>
	)
}

export default ProductDetailsField

// interface ProductDetailsFieldProps
// {
// 	title?: string
// 	fieldName: string
// 	formik: any // Переданный объект formik
// 	className?: string
// }

// const ProductDetailsField: FC<ProductDetailsFieldProps> = ({
// 	title,
// 	fieldName,
// 	className,
// 	formik,
// }) => {
// 	return (
// 		<FormAndHeadTextContainer className={className}>
// 			{title && <HeadTextOfForm>{title}</HeadTextOfForm>}

// 			<div className={'w-[100%] grid grid-cols-[1fr, 68px]'}>
// 				<ChildFormContainer>
// 					{/* Отображение инпутов в соответствии с полем specifications в formik */}
// 					{formik.values[fieldName]?.map((value: string, index: number) => (
// 						<SelectedOptionsType key={index}>
// 							<div>
// 								<TextField
// 									value={value}
// 									placeholder={`Specification ${index + 1}`} // Или используйте нужный вам формат
// 									onChange={e => {
// 										const updatedValues = [...formik.values[fieldName]]
// 										updatedValues[index] = e.target.value
// 										formik.setFieldValue(fieldName, updatedValues)
// 									}}
// 								/>
// 							</div>
// 						</SelectedOptionsType>
// 					))}
// 				</ChildFormContainer>
// 			</div>
// 		</FormAndHeadTextContainer>
// 	)
// }

// export default ProductDetailsField
// import React, { FC } from 'react';
// import {
//   ChildFormContainer,
//   FormAndHeadTextContainer,
//   FormContainer,
//   HeadTextOfForm,
//   InputWithIconCont,
//   SelectedOptionsType,
// } from '../styles';
// import Autocomplete from '@/shared/ui/autocomplete';
// import TextField from '@/shared/ui/textField';
// import { Trash2 } from 'react-feather';
// import { OptionType } from '@/shared/lib/types/sellerTypes';

// interface ProductDetaulsFieldProps {
//   title: string;
//   placeholder: string;
//   options: any;
//   formik: any;
//   handleChangeOption: (type: any, value: string) => void;
//   handleFieldsValueChange: (type: string, value: string) => void;
//   handleRemoveOption: (type: any, index: number) => void;
//   fieldName: string;
// }

// const ProductDetailsField: FC<ProductDetaulsFieldProps> = ({
//   title,
//   placeholder,
//   options,
//   formik,
//   handleChangeOption,
//   handleFieldsValueChange,
//   handleRemoveOption,
//   fieldName,
// }) => {
//   return (
//     <FormAndHeadTextContainer>
//       <HeadTextOfForm>{title}</HeadTextOfForm>
//       <FormContainer>
//         <Autocomplete
//           placeholder={placeholder}
//           options={options}
//           onChange={(value) => handleChangeOption(fieldName, value)}
//           width="100%"
//           fieldTitle="title"
//           fieldValue="title"
//         />
//         <ChildFormContainer>
//           {!!formik.values?.[fieldName]?.length &&
//             formik.values?.[fieldName].map(
//               (option: OptionType, index: number) => (
//                 <SelectedOptionsType key={index}>
//                   <HeadTextOfForm>{option.name}</HeadTextOfForm>
//                   <InputWithIconCont>
//                     <TextField
//                       value={option.value}
//                       onChange={(e) =>
//                         handleFieldsValueChange(
//                           `${fieldName}.${index}.value`,
//                           e.target.value
//                         )
//                       }
//                       placeholder={'0%'}
//                       name={`${fieldName}.${index}.value`}
//                     />
//                     <Trash2
//                       cursor="pointer"
//                       onClick={() => handleRemoveOption(fieldName, index)}
//                     />
//                   </InputWithIconCont>
//                 </SelectedOptionsType>
//               )
//             )}
//         </ChildFormContainer>
//       </FormContainer>

//       {/* <SelectedOptionsType>
//         <HeadTextOfForm>Уход</HeadTextOfForm>
//         <InputWithIconCont>
//           <TextField value={formik.values.care} onChange={formik.handleChange} placeholder="Уход" name="care" />
//         </InputWithIconCont>
//       </SelectedOptionsType> */}

//       {/* <SelectedOptionsType>
//         <HeadTextOfForm>Номер актикля</HeadTextOfForm>
//         <InputWithIconCont>
//           <TextField
//             value={formik.values.article_number}
//             onChange={formik.handleChange}
//             placeholder={'Номер актикля'}
//             name="article_number"
//           />
//         </InputWithIconCont>
//       </SelectedOptionsType> */}
//     </FormAndHeadTextContainer>
//   );
// };

// export default ProductDetailsField;
