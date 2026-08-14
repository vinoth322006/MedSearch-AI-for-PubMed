import { useState } from 'react'
import { ChevronDown, ChevronUp, Bookmark, Download, Eye, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoginRequiredModal from '../common/LoginRequiredModal'
import { useLoginModal } from '../../hooks/useLoginModal'
import { formatDate, formatScore, truncateText, cn } from '../../utils/formatters'
import { downloadAbstract } from '../../utils/downloadAbstract'

export default function ArticleCard({ article, onViewDetails }) {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const [showAbstract, setShowAbstract] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleReadAbstract = () => {
    onReadAbstract?.(article)
  }

  const handleBookmark = () => {
    if (!user) {
      openLogin()
      return
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleViewDetails = () => {
    if (!user) {
      openLogin()
      return
    }
    onViewDetails?.(article)
  }

  const handleDownloadAbstract = () => {
    downloadAbstract(article)
  }

  const authors = Array.isArray(article.authors) ? article.authors.slice(0, 5) : []
  const meshTerms = Array.isArray(article.mesh_terms) ? article.mesh_terms.slice(0, 6) : []

  return (
    <>
      <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight flex-1">
            {article.title}
          </h3>
          <div className="flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
            {formatScore(article.score)}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-700">
            {authors.length > 0 ? authors.join(', ') + (article.authors?.length > 5 ? ' et al.' : '') : 'Unknown Authors'}
          </span>
          <span className="text-gray-400">|</span>
          <span>{article.journal}</span>
          <span className="text-gray-400">|</span>
          <span>{formatDate(article.pub_date)}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
            PMID: {article._id || article.pmid}
          </span>
        </div>

        {meshTerms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {meshTerms.map((term, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full"
              >
                {term}
              </span>
            ))}
          </div>
        )}

        {article.abstract && (
          <div className="mb-4">
            {showAbstract ? (
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {article.abstract}
              </p>
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {truncateText(article.abstract, 220)}
              </p>
            )}
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="text-primary-600 text-sm font-medium mt-1 hover:text-primary-700"
            >
              {showAbstract ? 'Show less' : 'Read more'}
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={handleReadAbstract}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            <Eye size={16} />
            Read Abstract
          </button>

          <button
            onClick={handleViewDetails}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            <FileText size={16} />
            View Full Details
          </button>

          <button
            onClick={handleDownloadAbstract}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            <Download size={16} />
            Download Abstract
          </button>

          <button
            onClick={handleBookmark}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
              isBookmarked ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            )}
          >
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </>
  )
}
