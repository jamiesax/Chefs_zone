'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import styles from './Navbar.module.css';
import Navlogo from '@/public/images/navlogo.png';

interface NavbarProps {
  user?: User | null;
  onSelectRegion?: (region: string) => void;
  onSignOut?: () => void;
}

export default function Navbar({ user, onSelectRegion, onSignOut }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleRegionClick = (region: string) => {
    if (onSelectRegion) {
      onSelectRegion(region);
    }
    setDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleSignOut = async () => {
    closeMobileMenu();

    if (onSignOut) {
      onSignOut();
      return;
    }

    // Sign out client-side
    await supabase.auth.signOut();
    
    // Redirect and force Server Components to re-fetch auth state
    router.push('/login');
    router.refresh();
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image 
            src={Navlogo} 
            alt="Chef's Zone Logo" 
            priority 
            className={styles.logoImg}
          />
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {/* Explore Dropdown */}
          <div 
            className={styles.dropdownWrapper}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className={styles.navBtn}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Explore ▾
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => handleRegionClick('All')} className={styles.dropdownItem}>
                  🌍 All Cuisines
                </button>
                <button onClick={() => handleRegionClick('African')} className={styles.dropdownItem}>
                  🇳🇬 African / Nigerian
                </button>
                <button onClick={() => handleRegionClick('Intercontinental')} className={styles.dropdownItem}>
                  🍽️ Intercontinental
                </button>
                <button onClick={() => handleRegionClick('Desserts')} className={styles.dropdownItem}>
                  🍰 Desserts & Sweets
                </button>
              </div>
            )}
          </div>

          <Link href="/saved" className={styles.link} onClick={closeMobileMenu}>
            ❤️ Saved
          </Link>
          <Link href="/profile" className={styles.link} onClick={closeMobileMenu}>
            👨‍🍳 My Kitchen
          </Link>
          <Link href="/recipe/create" className={styles.addBtn} onClick={closeMobileMenu}>
            + Add Recipe
          </Link>

          {/* Render Sign Out or Login conditionally based on user state */}
          {user ? (
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              Sign Out
            </button>
          ) : (
            <Link href="/login" className={styles.link} onClick={closeMobileMenu}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}