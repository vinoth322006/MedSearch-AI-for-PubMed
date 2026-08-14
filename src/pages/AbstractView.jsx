import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '../utils/formatters'
import { downloadAbstract } from '../utils/downloadAbstract'
import { useState, useEffect } from 'react'

const MOCK_ARTICLES = {
  PMC12345678: {
    _id: 'PMC12345678',
    title: 'Deep learning for breast cancer detection in mammography: a systematic review and meta-analysis',
    abstract: 'Background: Breast cancer is the most common cancer among women worldwide. Early detection through mammography screening significantly reduces mortality. Deep learning algorithms have shown promise in improving the accuracy and efficiency of mammography interpretation. This systematic review and meta-analysis evaluates the performance of deep learning models for breast cancer detection in mammography images. Methods: We searched PubMed, Embase, and Cochrane databases for studies published between January 2015 and December 2023. Two independent reviewers screened titles, abstracts, and full texts. Data extraction included study characteristics, model architectures, and diagnostic performance metrics. Results: Twenty-three studies met inclusion criteria, encompassing 1.2 million mammography exams. The pooled sensitivity of deep learning models was 0.91 (95% CI: 0.88-0.93) and specificity was 0.86 (95% CI: 0.83-0.89). Convolutional neural networks, particularly ResNet and DenseNet architectures, demonstrated superior performance. Conclusion: Deep learning models achieve high sensitivity and specificity for breast cancer detection in mammography, comparable to or exceeding radiologist performance.',
    mesh_terms: ['Breast Neoplasms', 'Deep Learning', 'Mammography', 'Neural Networks, Computer'],
    authors: ['Smith JD', 'Johnson AL', 'Williams RK', 'Brown LM', 'Davis MP'],
    journal: 'Radiology: Artificial Intelligence',
    pub_date: '2024-03-15',
    score: 0.94
  }
}

export default function AbstractViewPage() {
  const { pmid } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const found = MOCK_ARTICLES[pmid] || {
      _id: pmid,
      title: 'Article Abstract',
      abstract: 'No abstract available for this article.',
      mesh_terms: [],
      authors: ['Unknown'],
      journal: 'Unknown Journal',
      pub_date: '2024-01-01',
      score: 0
    }
    setArticle(found)
  }, [pmid])

  if (!article) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    )
  }

  const authors = Array.isArray(article.authors) ? article.authors.join(', ') : (article.authors || 'Unknown Authors')
  const meshTerms = Array.isArray(article.mesh_terms) ? article.mesh_terms : []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
          <span className="font-medium text-gray-700">{authors}</span>
          <span className="text-gray-400">|</span>
          <span>{article.journal}</span>
          <span className="text-gray-400">|</span>
          <span>{formatDate(article.pub_date)}</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
            PMID: {article._id || article.pmid}
          </span>
          {typeof article.score === 'number' && (
            <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full font-medium">
              Relevance: {(article.score * 100).toFixed(1)}%
            </span>
          )}
        </div>

        {meshTerms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {meshTerms.map((term, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                {term}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-sm max-w-none mb-6">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Abstract</h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.abstract || 'No abstract available for this article.'}
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={() => downloadAbstract(article)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Download Abstract
          </button>
        </div>
      </div>
    </div>
  )
}
