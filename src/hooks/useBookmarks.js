import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'pubmed_bookmarks'

function getStoredBookmarks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(getStoredBookmarks)
  const { user } = useAuth()

  const isBookmarked = useCallback((pmid) => {
    return bookmarks.some((b) => b._id === pmid || b.pmid === pmid)
  }, [bookmarks])

  const toggleBookmark = useCallback((article) => {
    if (!user) return false

    setBookmarks((prev) => {
      const exists = prev.some((b) => b._id === article._id || b.pmid === article._id)
      let next
      if (exists) {
        next = prev.filter((b) => b._id !== article._id && b.pmid !== article._id)
      } else {
        next = [...prev, { ...article, bookmarkedAt: new Date().toISOString() }]
      }
      saveBookmarks(next)
      return next
    })
    return true
  }, [user])

  const removeBookmark = useCallback((pmid) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b._id !== pmid && b.pmid !== pmid)
      saveBookmarks(next)
      return next
    })
  }, [])

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark }
}
