import { useParams } from 'react-router-dom'
import ArticleDetails from '../components/article/ArticleDetails'

export default function ArticleDetailPage() {
  const { pmid } = useParams()
  return <ArticleDetails pmid={pmid} />
}
