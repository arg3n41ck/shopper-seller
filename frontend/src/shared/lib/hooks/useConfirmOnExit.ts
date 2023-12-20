import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useConfirmOnExit = (unsavedChanges: boolean, allowNavigation: boolean = false) => {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (unsavedChanges && !allowNavigation) {
        e.preventDefault()
        return (e.returnValue = 'У вас есть несохраненные изменения. Вы уверены, что хотите уйти?')
      }
    }

    const handleBrowseAway = () => {
      if (unsavedChanges && !allowNavigation && !isNavigating) {
        if (!window.confirm('У вас есть несохраненные изменения. Вы уверены, что хотите уйти?')) {
          router.events.emit('routeChangeError')
          throw 'Router aborted'
        }
      }
    }

    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
  }, [unsavedChanges, allowNavigation, isNavigating, router])

  return setIsNavigating
}
