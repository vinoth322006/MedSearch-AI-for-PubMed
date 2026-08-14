import { X, Download } from 'lucide-react'
import { formatDate } from '../../utils/formatters'
import { downloadAbstract } from '../../utils/downloadAbstract'

export default function AbstractViewer({ article, isOpen, onClose }) {
  if (!isOpen || !article) return null

  const authors = Array.isArray(article.authors) ? article.authors.join(', ') : (article.authors || 'Unknown Authors')
  const meshTerms = Array.isArray(article.mesh_terms) ? article.mesh_terms : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Abstract</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadAbstract(article)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <Download size={16} />
              Download Abstract
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
            {article.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            <span className="font-medium text-gray-700">{authors}</span>
            <span className="text-gray-400">|</span>
            <span>{article.journal}</span>
            <span className="text-gray-400">|</span>
            <span>{formatDate(article.pub_date)}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
              PMID: {article._id || article.pmid}
            </span>
            {typeof article.score === 'number' && (
              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full font-medium">
                Relevance: {((article.score) * 100).toFixed(1)}%
              </span>
            )}
          </div>

          {meshTerms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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

          <div className="prose prose-sm max-w-none">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Abstract</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.abstract || 'No abstract available for this article.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
