import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginRequiredModal from '../components/common/LoginRequiredModal'
import { useLoginModal } from '../hooks/useLoginModal'
import { formatRelativeDate } from '../utils/formatters'

export default function HistoryPage() {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pubmed_history')
      setHistory(stored ? JSON.parse(stored) : [])
    } catch {
      setHistory([])
    }
  }, [])

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('pubmed_history')
  }

  const searchAgain = (query) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  if (!user) {
    return (
      <>
        <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <Clock size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Search History</h2>
            <p className="text-gray-600 mb-6">Login to view your search history.</p>
            <button
              onClick={openLogin}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Login to View History
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Search History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No search history yet.</p>
          <Link to="/search" className="text-primary-600 hover:underline mt-2 inline-block">
            Start searching
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Query</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Results</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Method</th>
                  <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.query}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatRelativeDate(item.timestamp)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.resultCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.method}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => searchAgain(item.query)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Search Again
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
