export function downloadAbstract(article) {
  const content = [
    `Title: ${article.title || 'N/A'}`,
    `Authors: ${Array.isArray(article.authors) ? article.authors.join(', ') : (article.authors || 'N/A')}`,
    `PMID: ${article._id || article.pmid || 'N/A'}`,
    `Journal: ${article.journal || 'N/A'}`,
    `Publication Date: ${article.pub_date || 'N/A'}`,
    '',
    'Abstract:',
    article.abstract || 'N/A'
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `abstract_${article._id || article.pmid || 'unknown'}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadFullPaper(article) {
  if (!article.full_text_url) {
    alert('Full text is not available for this article.')
    return
  }
  window.open(article.full_text_url, '_blank', 'noopener,noreferrer')
}
