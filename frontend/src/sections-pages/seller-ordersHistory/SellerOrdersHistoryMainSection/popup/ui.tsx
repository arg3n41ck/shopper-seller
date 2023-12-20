import React, { useState } from 'react'

export const OrderDetailPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const togglePopup = () => setIsPopupVisible(!isPopupVisible)

  return (
    <div>
      <button onClick={togglePopup} className="rounded border p-2">
        Показать попап
      </button>
    </div>
  )
}
