'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import styles from './Navbar.module.css';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoIcon}>🍳</span>
          <span className={styles.brandTitle}>Chef&apos;s Zone</span>
        </Link>

        <nav className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
          >
            Explore
          </Link>

          <Link
            href="/saved"
            className={`${styles.link} ${isActive('/saved') ? styles.active : ''}`}
          >
            ❤️ Saved
          </Link>

          {user && (
            <Link
              href="/profile"
              className={`${styles.link} ${isActive('/profile') ? styles.active : ''}`}
            >
              👨‍🍳 My Kitchen
            </Link>
          )}
        </nav>

        <div className={styles.authActions}>
          {user ? (
            <>
              <Link href="/create" className={styles.createBtn}>
                ➕ Add Recipe
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className={styles.signOutBtn}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={styles.signInBtn}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}