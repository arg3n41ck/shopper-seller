import { SellerClient } from '@/shared/apis/sellerClient'
import Autocomplete from '@/shared/ui/inputs/autocomplete'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { X } from 'react-feather'
import cn from 'classnames'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  className?: string
}

const sellerClient = new SellerClient()

export const AddTagInput: React.FC<TagInputProps> = ({ tags, onChange, className }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { data: tagsFromBack } = useQuery(['tags'], sellerClient.fetchTags)

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleSelectOption = (selectedValue: string) => {
    if (!tags.includes(selectedValue)) {
      onChange([...tags, selectedValue])
    }
    setInputValue('')
  }

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    onChange(updatedTags)
  }

  return (
    <div className={cn('flex w-full flex-col gap-[12px]', className)}>
      <Autocomplete
        options={tagsFromBack || []}
        value={inputValue}
        onChange={(value) => {
          handleInputChange(value)
          handleSelectOption(value)
        }}
        placeholder="Добавьте тэги для поиска"
        fieldTitle="title"
        fieldValue="id"
        addIfNotExists
      />
      <div className="flex flex-wrap gap-[12px]">
        {tags.map((tag, index) => (
          <div
            className="flex cursor-pointer items-center gap-[8px] border-[1px] border-neutral-900 bg-none px-[8px] py-[8px]"
            key={index}
          >
            <p className="text-[16px] text-neutral-900">
              {tagsFromBack?.find((item) => item.id === Number(tag))?.title || tag}
            </p>
            <span className="cursor-pointer" onClick={() => handleTagRemove(tag)}>
              <X size={16} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
