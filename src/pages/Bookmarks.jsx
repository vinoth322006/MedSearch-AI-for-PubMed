import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Trash2, FileText, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginRequiredModal from '../components/common/LoginRequiredModal'
import { useLoginModal } from '../hooks/useLoginModal'
import { formatDate } from '../utils/formatters'

export default function BookmarksPage() {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pubmed_bookmarks')
      setBookmarks(stored ? JSON.parse(stored) : [])
    } catch {
      setBookmarks([])
    }
  }, [])

  const removeBookmark = (pmid) => {
    const next = bookmarks.filter((b) => b._id !== pmid && b.pmid !== pmid)
    setBookmarks(next)
    localStorage.setItem('pubmed_bookmarks', JSON.stringify(next))
  }

  if (!user) {
    return (
      <>
        <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Bookmarks</h2>
            <p className="text-gray-600 mb-6">Login to save and manage your bookmarked articles.</p>
            <button
              onClick={openLogin}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Login to View Bookmarks
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No bookmarked articles yet.</p>
          <Link to="/search" className="text-primary-600 hover:underline mt-2 inline-block">
            Search for articles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((article) => (
            <div key={article._id || article.pmid} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{article.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>{Array.isArray(article.authors) ? article.authors.slice(0, 3).join(', ') : article.authors}</span>
                    <span className="text-gray-400">|</span>
                    <span>{article.journal}</span>
                    <span className="text-gray-400">|</span>
                    <span>{formatDate(article.pub_date)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeBookmark(article._id || article.pmid)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Link
                  to={`/article/${article._id || article.pmid}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <FileText size={16} />
                  View Details
                </Link>
                {article.pubmed_url && (
                  <a
                    href={article.pubmed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <ExternalLink size={16} />
                    PubMed
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
