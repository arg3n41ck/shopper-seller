import React, { ReactNode } from 'react'
import { X } from 'react-feather'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: ReactNode
  open: boolean
  onClose: () => void
  style?: object
}

const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

export const Modal = ({ children, open, onClose, style }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed left-0 top-0 z-[1] h-full w-full overflow-auto bg-[rgba(0,0,0,0.5)]"
          onClick={onClose}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            className="absolute left-[50%] top-[50%] w-full max-w-[528px] translate-x-[-50%] translate-y-[-50%] bg-neutral-50"
            onClick={(e) => e.stopPropagation()}
            style={style}
          >
            <div>
              <div className="absolute right-[24px] top-[24px] cursor-pointer" onClick={onClose}>
                <X size={24} />
              </div>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
