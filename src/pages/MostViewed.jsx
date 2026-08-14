import { FlaskConical } from 'lucide-react'
import { MOCK_MOST_VIEWED } from '../api/mockData'
import { formatDate } from '../utils/formatters'

export default function MostViewedPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FlaskConical className="text-primary-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Most Viewed Articles</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">#</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">PMID</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Journal</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_MOST_VIEWED.map((article, idx) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-md truncate">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{article._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.journal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(article.pub_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                    {article.view_count.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
