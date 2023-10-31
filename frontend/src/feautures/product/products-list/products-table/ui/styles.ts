import styled from 'styled-components'
import * as palette from '@/shared/lib/consts/styles'

export const TableContainer = styled.table`
  position: relative;
  width: 100%;
  /* background-color: ${palette.NEUTRAL[50]}; */
  /* border-radius: 6px 6px 0 0; */
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0.5px solid ${palette.NEUTRAL[300]};
    /* border-radius: 6px 6px 0 0; */
    pointer-events: none;
  }
`

export const TableHeader = styled.thead`
  background-color: ${palette.NEUTRAL[100]};
`

// export const TableHeaderCell = styled.th`
// 	padding: 12px 20px;
// 	text-align: left;
// `

// export const TableHeaderCellText = styled.p`
// 	color: #171717;
// 	font-size: 12px;
// 	font-weight: 600;
// 	letter-spacing: 0.6px;
// 	text-transform: uppercase;
// `

// export const TableRow = styled.tr<{ selected: boolean }>`
// 	border-bottom: 0.5px solid ${palette.NEUTRAL[300]};
// 	/* background-color: ${props =>
// 		props.selected ? palette.PRIMARY.dashboard[50] : 'transparent'}; */
// 	background: #fff;
// `

// export const TableCell = styled.td`
// 	padding: 12px 20px;
// 	text-align: left;
// `

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TableBottom = styled.div`
  background-color: ${palette.NEUTRAL[100]};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  border: 0.5px solid ${palette.NEUTRAL[300]};
  border-top: none;
`

// export const TableBottomPaginationIconsContainer = styled.div`
// 	display: flex;
// 	align-items: center;
// 	gap: 20px;
// `
