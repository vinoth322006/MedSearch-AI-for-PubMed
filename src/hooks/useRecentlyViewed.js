import { useState, useCallback } from 'react'

const RECENT_KEY = 'pubmed_recently_viewed'

function getStoredRecent() {
  try {
    const stored = localStorage.getItem(RECENT_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecent(recent) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState(getStoredRecent)

  const addRecent = useCallback((article) => {
    setRecent((prev) => {
      const filtered = prev.filter((a) => a._id !== article._id && a.pmid !== article._id)
      const next = [{ ...article, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 50)
      saveRecent(next)
      return next
    })
  }, [])

  return { recent, addRecent }
}
