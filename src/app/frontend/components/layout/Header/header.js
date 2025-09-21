
'use client'
import './header.css';
import '../../components/About/about_global.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const secondBanner = document.getElementById('second-banner');
      if (!secondBanner) return;

      const top = secondBanner.getBoundingClientRect().top;

      if (top <= 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`header-main side-space-plr ${isFixed ? 'fixed-header' : ''}`}>
    <div className='row m-0 p-0 header-row'>
      <div className='col-md-4 header-col-1'>
        <Image src="/images/Header/logo.svg" alt="logo" width={362} height={85} />
      </div>
      <div className='col-md-6 header-col-2'>
           <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✖' : '☰'}
            </button>
             <nav className={`menus ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><Link href="/about/">About Us</Link></li>
                <li><Link href="#">Our Campuses</Link></li>
                <li><Link href="#">Academics</Link></li>
                <li><Link href="#">Student Life</Link></li>
                <li><Link href="#">News & Events</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul>
            </nav>
      </div>
      <div className='col-md-2 header-col-3'>
          <Image src="/images/Header/english.svg" alt="logo" width={25} height={25} />
          <Link href={'#'}>Log In</Link>
      </div>
    </div>
  
    </header>
  );
};

export default Header;
