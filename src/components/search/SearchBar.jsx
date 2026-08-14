import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, onSearch, placeholder = 'Search by article title, keywords, or research question...', size = 'lg' }) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = localValue.trim()
    if (!trimmed) return
    onChange?.(trimmed)
    onSearch?.(trimmed)
  }

  const inputSize = size === 'lg' ? 'text-lg py-4 px-6' : 'text-base py-3 px-4'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={size === 'lg' ? 24 : 20} />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${inputSize} pl-12 pr-32 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}
