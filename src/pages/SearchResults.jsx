import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { useSearchHistory } from '../hooks/useSearchHistory'
import { useLoginModal } from '../hooks/useLoginModal'
import FilterPanel from '../components/search/FilterPanel'
import SearchResults from '../components/search/SearchResults'
import AbstractViewer from '../components/search/AbstractViewer'
import { useAuth } from '../context/AuthContext'
import LoginRequiredModal from '../components/common/LoginRequiredModal'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const { results, loading, error, search } = useSearch()
  const { addHistory } = useSearchHistory()
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const [abstractArticle, setAbstractArticle] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [filters, setFilters] = useState({})
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [])

  const handleSearch = (query) => {
    const topK = filters.topK || 10
    search(query, topK).then((res) => {
      if (user && query) {
        addHistory({
          query,
          resultCount: res.length,
          method: 'semantic'
        })
      }
    })
  }

  const handleViewDetails = (article) => {
    setSelectedArticle(article)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />
      <AbstractViewer
        article={abstractArticle}
        isOpen={!!abstractArticle}
        onClose={() => setAbstractArticle(null)}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              defaultValue={initialQuery}
              placeholder="Search articles..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(e.target.value)
              }}
            />
          </div>
          <button
            onClick={() => {
              const input = document.querySelector('input[type="text"]')
              handleSearch(input.value)
            }}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              showFilters
                ? 'bg-primary-50 text-primary-700 border border-primary-200'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Filters
          </button>
        </div>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <SearchResults
        results={results}
        loading={loading}
        error={error}
        query={initialQuery}
        onViewDetails={(article) => {
          if (!user) {
            openLogin()
          } else {
            window.location.href = `/article/${article._id || article.pmid}`
          }
        }}
        onReadAbstract={(article) => setAbstractArticle(article)}
      />
    </div>
  )
}
