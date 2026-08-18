import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function semanticSearch(query, topK = 10) {
  const res = await axios.post(`${API_BASE}/api/search`, {
    query,
    top_k: topK
  })
  return res.data.results || []
}


export async function getArticle(pmid) {
  const res = await axios.get(`${API_BASE}/api/articles/${pmid}`)
  return res.data
}
