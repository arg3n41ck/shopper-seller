import React, {
  useLayoutEffect,
  useCallback,
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  ComponentType,
} from 'react'
import useForceUpdate from '@/shared/lib/hooks/useForceUpdate'

type SlotsContextType = {
  registerSlot: (name: string, contents: ReactNode) => void
  unregisterSlot: (name: string) => void
  context: object
}

type SlotsProviderProps = {
  context?: object
  children: (slots: Record<string, ReactNode | null>) => ReactNode
}

type SlotProps = {
  name: string
  children: ReactNode | ((context: object) => ReactNode)
}

type CreateSlotsReturnType = {
  SlotsProvider: ComponentType<SlotsProviderProps>
  Slot: ComponentType<SlotProps>
}

export const createSlots = (slotNames: string[]): CreateSlotsReturnType => {
  const SlotsContext = createContext<SlotsContextType>({
    registerSlot: () => null,
    unregisterSlot: () => null,
    context: {},
  })

  const defaultContext = Object.freeze({})

  const SlotsProvider = ({ context = defaultContext, children }: SlotsProviderProps) => {
    const slotsDefinition: Record<string, ReactNode | null> = {}
    slotNames.forEach((name) => (slotsDefinition[name] = null))
    const slotsRef = useRef(slotsDefinition)

    const rerenderWithSlots = useForceUpdate()
    const [isMounted, setIsMounted] = useState(false)

    useLayoutEffect(() => {
      rerenderWithSlots()
      setIsMounted(true)
    }, [rerenderWithSlots])

    const registerSlot = useCallback(
      (name: string, contents: ReactNode) => {
        slotsRef.current[name] = contents

        if (isMounted) rerenderWithSlots()
      },
      [isMounted, rerenderWithSlots],
    )

    const unregisterSlot = useCallback(
      (name: string) => {
        slotsRef.current[name] = null
        rerenderWithSlots()
      },
      [rerenderWithSlots],
    )

    const slots = slotsRef.current

    return (
      <SlotsContext.Provider value={{ registerSlot, unregisterSlot, context }}>{children(slots)}</SlotsContext.Provider>
    )
  }

  function Slot({ name, children }: SlotProps) {
    const ctx = useContext(SlotsContext)

    useLayoutEffect(() => {
      ctx.registerSlot(name, typeof children === 'function' ? children(ctx.context) : children)
      return () => ctx.unregisterSlot(name)
    }, [name, children, ctx.registerSlot, ctx.unregisterSlot, ctx.context])

    return null
  }

  return { SlotsProvider, Slot }
}
