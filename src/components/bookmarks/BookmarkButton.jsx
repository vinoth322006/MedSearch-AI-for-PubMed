import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Bookmark } from 'lucide-react'

export default function BookmarkButton({ article, size = 'md' }) {
  const { user } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pubmed_bookmarks')
      const bookmarks = stored ? JSON.parse(stored) : []
      setIsBookmarked(bookmarks.some((b) => b._id === article._id || b.pmid === article._id))
    } catch {
      setIsBookmarked(false)
    }
  }, [article])

  const handleClick = () => {
    if (!user) {
      return { requireLogin: true }
    }

    try {
      const stored = localStorage.getItem('pubmed_bookmarks')
      const bookmarks = stored ? JSON.parse(stored) : []
      const exists = bookmarks.some((b) => b._id === article._id || b.pmid === article._id)
      let next
      if (exists) {
        next = bookmarks.filter((b) => b._id !== article._id && b.pmid !== article._id)
      } else {
        next = [...bookmarks, { ...article, bookmarkedAt: new Date().toISOString() }]
      }
      localStorage.setItem('pubmed_bookmarks', JSON.stringify(next))
      setIsBookmarked(!exists)
    } catch {
      // ignore storage errors
    }
  }

  if (!user) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 transition-colors"
        title="Bookmark (requires login)"
      >
        <Bookmark size={size === 'lg' ? 20 : 16} />
        <span className={size === 'lg' ? 'text-sm' : 'text-xs'}>Bookmark</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 transition-colors ${
        isBookmarked ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
      }`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
    >
      {isBookmarked ? (
        <Bookmark size={size === 'lg' ? 20 : 16} fill="currentColor" />
      ) : (
        <Bookmark size={size === 'lg' ? 20 : 16} />
      )}
      <span className={size === 'lg' ? 'text-sm' : 'text-xs'}>
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </span>
    </button>
  )
}
