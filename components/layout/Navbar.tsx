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
    // 1. Notify parent / HomeClient to change state
    if (onSelectRegion) {
      onSelectRegion(region);
    }
    setDropdownOpen(false);
    setIsMobileMenuOpen(false);

    // 2. Perform smooth scroll directly to the chosen section
    setTimeout(() => {
      let targetId = 'recipes-section';
      if (region === 'African') targetId = 'section-african';
      if (region === 'Intercontinental') targetId = 'section-intercontinental';
      if (region === 'Desserts') targetId = 'section-desserts';

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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

    await supabase.auth.signOut();
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

        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
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
                  All Cuisines
                </button>
                <button onClick={() => handleRegionClick('African')} className={styles.dropdownItem}>
                  🇳🇬 African / Nigerian
                </button>
                <button onClick={() => handleRegionClick('Intercontinental')} className={styles.dropdownItem}>
                  Intercontinental
                </button>
                <button onClick={() => handleRegionClick('Desserts')} className={styles.dropdownItem}>
                  Desserts & Sweets
                </button>
              </div>
            )}
          </div>

          <Link href="/saved" className={styles.link} onClick={closeMobileMenu}>
            ❤️ Saved
          </Link>
          <Link href="/profile" className={styles.link} onClick={closeMobileMenu}>
            My Kitchen
          </Link>

          {user ? (
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              Sign Out
            </button>
          ) : (
            <Link href="/login" className={styles.link} onClick={closeMobileMenu}>
              Sign In
            </Link>
          )}

          <Link href="/create" className={styles.addBtn} onClick={closeMobileMenu}>
            Add Recipe
          </Link>
        </nav>
      </div>
    </header>
  );
}