import { useState } from 'react';
import { Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: true },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="backdrop-blur-md bg-black/40 text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:scale-105 transition-transform">
            <Logo width="70px" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center w-full max-w-4xl mx-auto">
          {/* Left Side: Main Nav Links */}
          <div className="flex gap-4 items-center">
            {navItems
              .filter((item) => item.active && item.name !== 'Login' && item.name !== 'Signup')
              .map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className={`text-sm font-semibold text-white/80 hover:text-orange-400 transition duration-200 px-3 py-1 rounded ${
                    (item.name === 'Home' || item.name === 'All Posts') ? 'bg-white/10 hover:bg-white/20' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex gap-4 items-center">
            {navItems
              .filter((item) => item.active && (item.name === 'Login' || item.name === 'Signup'))
              .map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="text-sm font-semibold text-white/80 hover:text-orange-400 transition duration-200"
                >
                  {item.name}
                </button>
              ))}
            {authStatus && <LogoutBtn />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-lg border-t border-white/10 absolute w-full left-0 top-16 p-4 flex flex-col items-center z-50 space-y-3">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setMenuOpen(false);
                  }}
                  className={`text-md font-medium text-white/80 hover:text-orange-400 ${
                    (item.name === 'Home' || item.name === 'All Posts') ? 'bg-white/10 px-4 py-2 rounded' : ''
                  }`}
                >
                  {item.name}
                </button>
              )
          )}
          {authStatus && <LogoutBtn />}
        </div>
      )}
    </header>
  );
}

export default Header;
