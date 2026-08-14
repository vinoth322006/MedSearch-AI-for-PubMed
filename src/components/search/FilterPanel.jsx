import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import LoginRequiredModal from '../common/LoginRequiredModal'
import { useLoginModal } from '../../hooks/useLoginModal'

export default function FilterPanel({ filters, onFilterChange, isOpen, onClose }) {
  const { user } = useAuth()
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useLoginModal()

  const handleProtectedFilter = () => {
    if (!user) {
      openLogin()
      return false
    }
    return true
  }

  const handleDateChange = (e) => {
    if (!handleProtectedFilter()) return
    onFilterChange({ ...filters, dateRange: e.target.value })
  }

  const handleTypeChange = (e) => {
    if (!handleProtectedFilter()) return
    onFilterChange({ ...filters, articleType: e.target.value })
  }

  const handleJournalChange = (e) => {
    if (!handleProtectedFilter()) return
    onFilterChange({ ...filters, journal: e.target.value })
  }

  const handleMeshChange = (e) => {
    if (!handleProtectedFilter()) return
    onFilterChange({ ...filters, meshTerms: e.target.value })
  }

  const handleFullTextChange = (e) => {
    if (!handleProtectedFilter()) return
    onFilterChange({ ...filters, fullTextOnly: e.target.checked })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  return (
    <>
      <LoginRequiredModal isOpen={isLoginOpen} onClose={closeLogin} />

      {isOpen && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publication Date
              </label>
              <select
                value={filters.dateRange || ''}
                onChange={handleDateChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All dates</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Article Type
              </label>
              <select
                value={filters.articleType || ''}
                onChange={handleTypeChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All types</option>
                <option value="Review">Review</option>
                <option value="Clinical Trial">Clinical Trial</option>
                <option value="Meta-Analysis">Meta-Analysis</option>
                <option value="Systematic Review">Systematic Review</option>
                <option value="Research">Research Article</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Journal
              </label>
              <input
                type="text"
                value={filters.journal || ''}
                onChange={(e) => handleJournalChange(e)}
                placeholder="Filter by journal..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MeSH Terms
              </label>
              <input
                type="text"
                value={filters.meshTerms || ''}
                onChange={(e) => handleMeshChange(e)}
                placeholder="Filter by MeSH terms..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fullTextOnly"
                checked={filters.fullTextOnly || false}
                onChange={handleFullTextChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="fullTextOnly" className="text-sm text-gray-700">
                Full text available only
              </label>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
