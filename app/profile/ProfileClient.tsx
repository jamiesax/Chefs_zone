'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/recipe/RecipeCard';
import { useFavorites } from '@/lib/useFavorites';
import { MOCK_RECIPES } from '@/data/recipes';
import styles from './page.module.css';

interface ProfileClientProps {
  user: User;
  initialRecipes: Recipe[];
}

export default function ProfileClient({ user, initialRecipes }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<'kitchen' | 'saved'>('kitchen');
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.user_metadata?.avatar_url || null
  );
  const [uploading, setUploading] = useState(false);

  const { favorites, isMounted } = useFavorites();
  const supabase = createClient();

  // Avatar Upload Handler
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // Save avatar URL to User Metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      setAvatarUrl(publicUrl);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Avatar upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Recipe Delete Handler
  const handleDeleteRecipe = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    const { error } = await supabase.from('recipes').delete().eq('id', id);

    if (error) {
      alert(`Failed to delete recipe: ${error.message}`);
    } else {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Combine Mock and DB recipes for Saved tab filtering
  const allSavedPool = [...recipes, ...MOCK_RECIPES];
  const savedRecipes = isMounted
    ? allSavedPool.filter((r) => favorites.includes(r.id))
    : [];

  return (
    <main className={styles.container}>
      {/* Profile Header */}
      <section className={styles.headerCard}>
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile Avatar"
              fill
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user.email?.charAt(0).toUpperCase() || '🍳'}
            </div>
          )}
          <label className={styles.uploadLabel}>
            {uploading ? '...' : '📷 Edit'}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className={styles.hiddenInput}
            />
          </label>
        </div>

        <div className={styles.userInfo}>
          <h1 className={styles.userName}>
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </h1>
          <p className={styles.userEmail}>{user.email}</p>
          <span className={styles.badge}>
            {recipes.length} {recipes.length === 1 ? 'Recipe Created' : 'Recipes Created'}
          </span>
        </div>
      </section>

      {/* Profile Tabs */}
      <nav className={styles.tabNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'kitchen' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('kitchen')}
        >
          👨‍🍳 My Kitchen ({recipes.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'saved' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          ❤️ Saved Recipes ({savedRecipes.length})
        </button>
      </nav>

      {/* Tab Content */}
      <section className={styles.tabContent}>
        {activeTab === 'kitchen' && (
          <div>
            {recipes.length > 0 ? (
              <div className={styles.grid}>
                {recipes.map((recipe) => (
                  <div key={recipe.id} className={styles.cardWrapper}>
                    <RecipeCard recipe={recipe} />
                    <div className={styles.ownerControls}>
                      <button
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        className={styles.deleteBtn}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>Your kitchen is currently empty!</p>
                <Link href="/create" className={styles.actionBtn}>
                  Create Your First Recipe
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {savedRecipes.length > 0 ? (
              <div className={styles.grid}>
                {savedRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>You haven&apos;t saved any recipes yet.</p>
                <Link href="/" className={styles.actionBtn}>
                  Explore Recipes
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}