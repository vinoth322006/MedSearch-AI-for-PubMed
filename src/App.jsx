import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Home from './pages/Home'
import SearchResultsPage from './pages/SearchResults'
import AbstractViewPage from './pages/AbstractView'
import ArticleDetailPage from './pages/ArticleDetail'
import BookmarksPage from './pages/Bookmarks'
import HistoryPage from './pages/History'
import RecentlyViewedPage from './pages/RecentlyViewed'
import MostViewedPage from './pages/MostViewed'
import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/abstract/:pmid" element={<AbstractViewPage />} />
            <Route path="/article/:pmid" element={
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/bookmarks" element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } />
            <Route path="/recently-viewed" element={
              <ProtectedRoute>
                <RecentlyViewedPage />
              </ProtectedRoute>
            } />
            <Route path="/most-viewed" element={<MostViewedPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
