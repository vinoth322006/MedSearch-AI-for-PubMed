import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Download, ExternalLink, Bookmark, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import LoginRequiredModal from '../common/LoginRequiredModal'
import { useLoginModal } from '../../hooks/useLoginModal'
import { formatDate } from '../../utils/formatters'
import { downloadAbstract } from '../../utils/downloadAbstract'

const MOCK_ARTICLE = {
  _id: 'PMC12345678',
  title: 'Deep learning for breast cancer detection in mammography: a systematic review and meta-analysis',
  abstract: 'Background: Breast cancer is the most common cancer among women worldwide. Early detection through mammography screening significantly reduces mortality. Deep learning algorithms have shown promise in improving the accuracy and efficiency of mammography interpretation. This systematic review and meta-analysis evaluates the performance of deep learning models for breast cancer detection in mammography images. Methods: We searched PubMed, Embase, and Cochrane databases for studies published between January 2015 and December 2023. Two independent reviewers screened titles, abstracts, and full texts. Data extraction included study characteristics, model architectures, and diagnostic performance metrics. Results: Twenty-three studies met inclusion criteria, encompassing 1.2 million mammography exams. The pooled sensitivity of deep learning models was 0.91 (95% CI: 0.88-0.93) and specificity was 0.86 (95% CI: 0.83-0.89). Convolutional neural networks, particularly ResNet and DenseNet architectures, demonstrated superior performance. Conclusion: Deep learning models achieve high sensitivity and specificity for breast cancer detection in mammography, comparable to or exceeding radiologist performance. Integration of these models into clinical workflows may improve screening outcomes and reduce radiologist workload.',
  mesh_terms: ['Breast Neoplasms', 'Deep Learning', 'Mammography', 'Neural Networks, Computer', 'Sensitivity and Specificity'],
  authors: ['Smith JD', 'Johnson AL', 'Williams RK', 'Brown LM', 'Davis MP'],
  journal: 'Radiology: Artificial Intelligence',
  pub_date: '2024-03-15',
  score: 0.94,
  institution: 'Department of Radiology, Stanford University School of Medicine',
  study_type: 'Systematic Review and Meta-Analysis',
  population: 'General female population undergoing mammography screening',
  full_text_available: false,
  pubmed_url: 'https://pubmed.ncbi.nlm.nih.gov/12345678/',
  full_text_url: null
}

export default function ArticleDetails() {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()
  const { pmid } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setArticle(MOCK_ARTICLE)
      setLoading(false)
    }, 500)
  }, [pmid])

  useEffect(() => {
    if (article) {
      try {
        const stored = localStorage.getItem('pubmed_recently_viewed')
        const recent = stored ? JSON.parse(stored) : []
        const filtered = recent.filter((a) => a._id !== article._id)
        const next = [{ ...article, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 50)
        localStorage.setItem('pubmed_recently_viewed', JSON.stringify(next))
      } catch {
        // ignore
      }
    }
  }, [article])

  const handleBookmark = () => {
    if (!user) {
      openLogin()
      return
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleDownloadAbstract = () => {
    if (article) downloadAbstract(article)
  }

  const handleDownloadFullPaper = () => {
    if (!article?.full_text_url) {
      alert('Full text is not available for this article.')
      return
    }
    window.open(article.full_text_url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Article not found.</p>
        <button onClick={() => navigate(-1)} className="text-primary-600 hover:underline mt-2">Go back</button>
      </div>
    )
  }

  const authors = Array.isArray(article.authors) ? article.authors.join(', ') : (article.authors || 'Unknown Authors')
  const meshTerms = Array.isArray(article.mesh_terms) ? article.mesh_terms : []

  return (
    <>
      <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            {typeof article.score === 'number' && (
              <div className="flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                {((article.score) * 100).toFixed(1)}%
              </div>
            )}
          </div>

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
            {article.study_type && (
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                {article.study_type}
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

          {article.institution && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Institution</h4>
              <p className="text-gray-700 text-sm">{article.institution}</p>
            </div>
          )}

          {article.population && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Study Population</h4>
              <p className="text-gray-700 text-sm">{article.population}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Full Text Availability</h4>
            {article.full_text_available && article.full_text_url ? (
              <p className="text-sm text-green-700">Full text is available.</p>
            ) : (
              <p className="text-sm text-gray-600">Full text is not available for this article.</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleDownloadAbstract}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download size={16} />
              Download Abstract
            </button>

            <button
              onClick={handleDownloadFullPaper}
              disabled={!article.full_text_available}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              Download Full Paper
            </button>

            {article.pubmed_url && (
              <a
                href={article.pubmed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <ExternalLink size={16} />
                Open PubMed
              </a>
            )}

            <button
              onClick={handleBookmark}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isBookmarked
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
