import React, { useRef } from 'react'
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick'

interface PopupProps {
  isVisible: boolean
  children: React.ReactNode
  onClose: () => void
  outsideClick?: boolean
}

export const CustomPopup: React.FC<PopupProps> = ({ isVisible, children, onClose, outsideClick = true }) => {
  const popupRef = useRef(null)

  useOutsideClick(popupRef, () => {
    outsideClick && onClose()
  })

  if (!isVisible) return null

  return (
    <div ref={popupRef} className="absolute z-10 flex items-center justify-center">
      <div className="relative rounded border border-[#D6D6D6] bg-white p-3">{children}</div>
    </div>
  )
}
