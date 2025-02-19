import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Menu, X} from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className='bg-white shadow-md'>
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link to='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <Logo width='70px' />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className='lg:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)} className='text-gray-900 focus:outline-none'>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className='hidden lg:flex lg:gap-x-12'>
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className='text-sm font-semibold text-gray-900 hover:text-orange-500'
              >
                {item.name}
              </button>
            ) : null
          )}
        </div>
        
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {authStatus && <LogoutBtn />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='lg:hidden bg-white shadow-md absolute w-full left-0 top-16 p-4 flex flex-col items-center z-50'>
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug);
                  setMenuOpen(false);
                }}
                className='text-md font-semibold text-gray-900 hover:text-orange-500 mb-2'
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && <LogoutBtn />}
        </div>
      )}
    </header>
  );
}

export default Header;
