import { useState, useCallback } from 'react'

export function useLoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [onLoginSuccess, setOnLoginSuccess] = useState(null)

  const open = useCallback((callback) => {
    setOnLoginSuccess(() => callback)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setOnLoginSuccess(null)
  }, [])

  const triggerSuccess = useCallback((user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user)
    }
    close()
  }, [onLoginSuccess, close])

  return { isOpen, open, close, triggerSuccess, onLoginSuccess }
}
