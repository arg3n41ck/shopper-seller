import { PRIMARY } from '@/shared/lib/consts/styles'
import React from 'react'
import { X } from 'react-feather'

export const FilterTag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div className="inline-flex w-max items-center justify-center gap-1.5 rounded-[26px] border border-indigo-600 bg-indigo-600 bg-opacity-5 px-2.5 py-1.5">
    <p className="text-right text-base font-medium text-indigo-600">{label}</p>

    <X onClick={onRemove} color={PRIMARY.dashboard[600]} cursor={'pointer'} />
  </div>
)
