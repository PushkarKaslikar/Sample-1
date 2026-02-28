import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar({ onOpenAuth }) {
  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Logo size={56} />
            <span
              data-testid="logo-text"
              className="text-2xl font-black text-white tracking-widest uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              MECHTRON
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/about-us"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              About Us
            </Link>
            <button
              data-testid="nav-student-btn"
              onClick={() => onOpenAuth('student', 'login')}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Student
            </button>
            <button
              data-testid="nav-teacher-btn"
              onClick={() => onOpenAuth('teacher', 'login')}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Teacher
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;