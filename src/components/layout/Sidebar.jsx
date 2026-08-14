import { NavLink, Outlet } from 'react-router-dom'
import { FlaskConical, Search, Bookmark, History, Eye, LayoutDashboard, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  const guestLinks = [
    { to: '/', label: 'Home', icon: FlaskConical },
    { to: '/search', label: 'Search', icon: Search },
  ]

  const loggedInLinks = [
    { to: '/', label: 'Home', icon: FlaskConical },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { to: '/history', label: 'History', icon: History },
    { to: '/recently-viewed', label: 'Recently Viewed', icon: Eye },
    { to: '/most-viewed', label: 'Most Viewed', icon: FlaskConical },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
  ]

  const links = user ? loggedInLinks : guestLinks

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16 hidden lg:block">
      <div className="p-4">
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </nav>
      </div>
    </aside>
  )
}
