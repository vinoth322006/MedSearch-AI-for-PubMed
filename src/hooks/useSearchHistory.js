import { useState, useCallback } from 'react'

const HISTORY_KEY = 'pubmed_history'

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function useSearchHistory() {
  const [history, setHistory] = useState(getStoredHistory)

  const addHistory = useCallback((entry) => {
    setHistory((prev) => {
      const next = [
        {
          ...entry,
          id: 'hist_' + Date.now(),
          timestamp: new Date().toISOString()
        },
        ...prev
      ].slice(0, 100)
      saveHistory(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return { history, addHistory, clearHistory }
}
