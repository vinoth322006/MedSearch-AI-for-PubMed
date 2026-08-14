import ArticleCard from './ArticleCard'

export default function SearchResults({ results, loading, error, query, onViewDetails, onReadAbstract }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
        <p className="text-gray-600">Searching biomedical literature...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-lg mb-2">Search Error</div>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (!query && !results.length) {
    return null
  }

  if (!results.length && query) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No results found for "{query}"</p>
        <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {query && (
        <div className="text-sm text-gray-600 mb-4">
          Found <span className="font-semibold text-gray-900">{results.length}</span> results for{' '}
          <span className="font-medium text-primary-700">"{query}"</span>
        </div>
      )}
      {results.map((article) => (
        <ArticleCard
          key={article._id || article.pmid}
          article={article}
          onViewDetails={onViewDetails}
          onReadAbstract={onReadAbstract}
        />
      ))}
    </div>
  )
}
