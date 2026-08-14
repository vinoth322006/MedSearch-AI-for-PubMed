import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Search, Bookmark, Eye, Clock, FlaskConical } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginRequiredModal from '../components/common/LoginRequiredModal'
import { useLoginModal } from '../hooks/useLoginModal'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MOCK_MOST_VIEWED } from '../api/mockData'
import { formatDate } from '../utils/formatters'

export default function DashboardPage() {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const [history, setHistory] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [recent, setRecent] = useState([])

  useEffect(() => {
    try {
      const h = localStorage.getItem('pubmed_history')
      setHistory(h ? JSON.parse(h) : [])
      const b = localStorage.getItem('pubmed_bookmarks')
      setBookmarks(b ? JSON.parse(b) : [])
      const r = localStorage.getItem('pubmed_recently_viewed')
      setRecent(r ? JSON.parse(r) : [])
    } catch {
      setHistory([])
      setBookmarks([])
      setRecent([])
    }
  }, [])

  if (!user) {
    return (
      <>
        <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <LayoutDashboard size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600 mb-6">Login to access your personal dashboard.</p>
            <button
              onClick={openLogin}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Login to View Dashboard
            </button>
          </div>
        </div>
      </>
    )
  }

  const chartData = history.slice(0, 7).reverse().map((item) => ({
    name: item.query.length > 15 ? item.query.slice(0, 15) + '...' : item.query,
    results: item.resultCount || 0
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard icon={<Search size={20} />} label="Total Searches" value={history.length} />
        <KPICard icon={<Bookmark size={20} />} label="Bookmarked Articles" value={bookmarks.length} />
        <KPICard icon={<Eye size={20} />} label="Articles Viewed" value={recent.length} />
        <KPICard icon={<Clock size={20} />} label="Recent Searches" value={Math.min(history.length, 10)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Activity</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="results" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No search data available yet.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h3>
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.query}</p>
                    <p className="text-xs text-gray-500">{item.resultCount} results</p>
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(item.query)}`}
                    className="text-xs text-primary-600 hover:text-primary-700 ml-4"
                  >
                    Search Again
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent searches.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Bookmarks</h3>
            <Link to="/bookmarks" className="text-sm text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          {bookmarks.length > 0 ? (
            <div className="space-y-3">
              {bookmarks.slice(0, 5).map((article) => (
                <div key={article._id || article.pmid} className="py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                  <p className="text-xs text-gray-500">{article.journal}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No bookmarks yet.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Most Viewed</h3>
            <Link to="/most-viewed" className="text-sm text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {MOCK_MOST_VIEWED.slice(0, 5).map((article) => (
              <div key={article._id} className="py-2 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                <p className="text-xs text-gray-500">{article.view_count.toLocaleString()} views</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  )
}
