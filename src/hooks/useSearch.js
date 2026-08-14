import { useState, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const { user } = useAuth()

  const search = useCallback(async (searchQuery, topK = 10) => {
    setLoading(true)
    setError('')
    setQuery(searchQuery)

    try {
      const res = await axios.post(`${API_BASE}/api/search`, {
        query: searchQuery,
        top_k: topK
      })
      setResults(res.data.results || [])
      return res.data.results
    } catch (err) {
      setError(err.response?.data?.detail || 'Search failed. Please try again.')
      setResults([])
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setQuery('')
    setError('')
  }, [])

  return { results, loading, error, query, search, clearResults }
}
