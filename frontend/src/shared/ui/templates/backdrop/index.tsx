import React, { FC, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: ReactNode
  open: boolean
  onClose: () => void
}

const backdropVariants = {
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

const Backdrop: FC<Props> = ({ children, open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed left-0 top-0 z-[3] h-full w-full overflow-auto bg-[rgba(0,0,0,0.5)]"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Backdrop
