import TextField from '@/shared/ui/textField'
import React, { useState } from 'react'
import { X } from 'react-feather'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

export const AddTagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault()
      onChange([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    onChange(updatedTags)
  }

  return (
    <div className="flex max-w-[490px] flex-col gap-[12px]">
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Добавьте тэги для поиска"
      />
      <div className="flex flex-wrap gap-[12px]">
        {tags.map((tag, index) => (
          <div
            className="flex cursor-pointer items-center gap-[8px] border-[1px] border-neutral-900 bg-none px-[8px] py-[8px]"
            key={index}
          >
            <p className="text-[16px] text-neutral-900">{tag}</p>
            <span className="cursor-pointer" onClick={() => handleTagRemove(tag)}>
              <X size={16} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
