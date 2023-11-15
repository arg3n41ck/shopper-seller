import React, { ReactNode } from 'react'

interface ProductTableProps {
  tableHeader: ReactNode
  tableBody: ReactNode
  tableFooter: ReactNode
}

export const ProductTable: React.FC<ProductTableProps> = ({ tableHeader, tableBody, tableFooter }) => {
  return (
    <div>
      <table
        className="relative w-full 
        table-fixed overflow-auto
        before:pointer-events-none
        before:absolute
        before:bottom-0
        before:left-0
        before:right-0 before:top-0 
        before:border-[0.5px] before:border-neutral-300 
        
      "
      >
        <thead className="bg-neutral-100">
          <tr>{tableHeader}</tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </table>

      <div className="flex items-center justify-end gap-[10px] border-[0.5px] border-t-0 border-neutral-300 bg-neutral-100 px-5 py-3">
        {tableFooter}
      </div>
    </div>
  )
}
