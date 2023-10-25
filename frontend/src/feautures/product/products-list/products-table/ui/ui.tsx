import React, { ReactNode, useState } from 'react'
import Checkbox from '@/shared/ui/checkbox'
import { TableBottom, TableContainer, TableHeader } from './styles'
import { ChevronLeft, ChevronRight } from 'react-feather'

interface Product {
	[key: string]: string | number | boolean
}

interface ProductTableProps {
	tableHeader: ReactNode
	tableBody: ReactNode
	tableFooter: ReactNode
}

export const ProductTable: React.FC<ProductTableProps> = ({
	tableHeader,
	tableBody,
	tableFooter,
}) => {
	const [selectedProducts, setSelectedProducts] = useState<boolean[]>([])

	const toggleCheckbox = (index: number) => {
		const updatedSelectedProducts = [...selectedProducts]
		updatedSelectedProducts[index] = !selectedProducts[index]
		setSelectedProducts(updatedSelectedProducts)
	}

	// if (!data?.length) return null

	return (
		<div>
			<TableContainer>
				<TableHeader>
					<tr>
						{/* {columns.map((column, index) => (
							<TableHeaderCell key={index}>
								<TableHeaderCellText>{column.title}</TableHeaderCellText>
							</TableHeaderCell>
						))} */}

						{tableHeader}
					</tr>
				</TableHeader>

				<tbody>
					{/* {data.map((product, index) => (
						<TableRow key={index} selected={selectedProducts[index] === true}>
							{columns.map((column, columnIndex) => (
								<TableCell key={columnIndex}>{product[column.value]}</TableCell>
							))}
						</TableRow>
					))} */}

					{tableBody}
				</tbody>
			</TableContainer>

			<TableBottom>
				{/* <p>1-10 из 276</p>
				<TableBottomPaginationIconsContainer className='flex items-center gap-5'>
					<ChevronLeft cursor={'pointer'} />
					<ChevronRight cursor={'pointer'} />
				</TableBottomPaginationIconsContainer> */}

				{tableFooter}
			</TableBottom>
		</div>
	)
}
