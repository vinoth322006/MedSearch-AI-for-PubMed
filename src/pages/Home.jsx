import SearchBar from '../components/search/SearchBar'
import { FlaskConical } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXAMPLE_QUERIES = [
  'AI in breast cancer detection',
  'Machine learning for diabetes',
  'Deep learning in medical imaging'
]

export default function Home() {
  const handleSearch = (query) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <FlaskConical className="text-primary-600" size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            PubMed Semantic Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover relevant biomedical literature using semantic search.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_QUERIES.map((query) => (
              <button
                key={query}
                onClick={() => handleSearch(query)}
                className="text-sm bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:border-primary-300 hover:text-primary-700 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-1">10K+</div>
            <div className="text-sm text-gray-600">Articles Indexed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-1">Voyage-4</div>
            <div className="text-sm text-gray-600">Semantic Embeddings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-1">Vector</div>
            <div className="text-sm text-gray-600">MongoDB Atlas Search</div>
          </div>
        </div>
      </div>
    </div>
  )
}
