import React, { useState } from 'react'

interface CustomSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleSwitchChange = () => {
    setIsChecked(!isChecked)
    onChange(!isChecked)
  }

  return (
    <label className="relative inline-block h-6 w-10 cursor-pointer">
      <input type="checkbox" className="hidden" checked={isChecked} onChange={handleSwitchChange} />
      <div className={`h-6 w-10 rounded-full shadow-inner ${isChecked ? 'bg-primaryDash600' : 'bg-[#676767]'}`}></div>
      <div
        className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-[#fff] shadow transition-transform ${
          isChecked ? 'translate-x-[80%] transform' : ''
        }`}
      ></div>
    </label>
  )
}

export default CustomSwitch
