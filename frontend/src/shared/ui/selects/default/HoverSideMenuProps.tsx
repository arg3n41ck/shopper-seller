import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { ChevronRight } from 'react-feather'
import { Category } from '@/shared/api/gen'

interface HoverSideMenuProps {
  options: Category[] | Category | undefined
  prevItem?: Category
  child?: boolean
  onClick?: (item: Category) => void
}

export const HoverSideMenuDesktop: React.FC<HoverSideMenuProps> = ({ options: propsItem, child = false, onClick }) => {
  const [currentItem, setCurrentItem] = useState<Category | null>(null)
  const [isMouseInside, setIsMouseInside] = useState(false)

  useEffect(() => {
    const modalWindow = document.querySelector('.modal-window-inner')
    if (modalWindow) {
      modalWindow.scrollLeft = modalWindow.scrollWidth
    }
  }, [currentItem])

  const handleClick = (item: Category) => {
    onClick && onClick(item)
    if (item?.title && item?.children?.length) return
    setCurrentItem(item)
  }

  const handleMouseEnter = (item: Category) => {
    setCurrentItem(item)
    setIsMouseInside(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInside(false)
  }

  const getItemStyle = () => {
    return child ? 'childItem' : 'parentItem'
  }

  const items = Array.isArray(propsItem) ? propsItem : propsItem?.children

  return (
    <div
      className={cn('absolute z-[999] flex items-start', 'w-[250px] bg-white shadow-md')}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn('', 'scrollbar-hide h-[450px] overflow-y-auto overflow-x-hidden')}>
        {items?.map((item, i) => (
          <ul
            key={item?.title || i + i}
            className={cn('flex h-[40px] w-[250px] cursor-pointer items-center px-3', {
              'hover:bg-neutral-100 ': isMouseInside,
            })}
          >
            <li
              role="presentation"
              onClick={() => handleClick(item)}
              onMouseEnter={() => handleMouseEnter(item)}
              className={cn(
                getItemStyle(),
                'relative flex max-h-[50px] w-full items-center justify-between transition duration-200',
              )}
            >
              {item.title}
              {item.children && item.children.length > 0 && <ChevronRight size={16} />}
            </li>
          </ul>
        ))}
      </div>

      {currentItem?.children?.length && isMouseInside ? (
        <div className="ml-2 text-[18px] transition-[0.1s]">
          <HoverSideMenuDesktop child={true} options={currentItem} onClick={onClick} />
        </div>
      ) : null}
    </div>
  )
}
