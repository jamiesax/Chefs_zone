'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function CreateRecipePage() {
  const router = useRouter();
  const supabase = createClient();

  const [mealRecipe, setMealRecipe] = useState({
    title: '',
    category: 'Breakfast',
    region: 'African',
    prepTime: '20 mins',
    servings: 2,
    description: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [''],
    imageFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      setError('You must be signed in to post a recipe.');
      setLoading(false);
      return;
    }

    let uploadedImageUrl = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

    // Upload image to Supabase Storage if a file was selected
    if (mealRecipe.imageFile) {
      const fileExt = mealRecipe.imageFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(fileName, mealRecipe.imageFile);

      if (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(fileName);

      uploadedImageUrl = publicUrlData.publicUrl;
    }

    // Insert recipe row with image URL from storage
    const { error: insertError } = await supabase.from('recipes').insert([
      {
        user_id: user.id,
        title: mealRecipe.title,
        category: mealRecipe.category,
        region: mealRecipe.region,
        prep_time: mealRecipe.prepTime,
        servings: Number(mealRecipe.servings),
        description: mealRecipe.description,
        image_url: uploadedImageUrl,
        ingredients: mealRecipe.ingredients,
        instructions: mealRecipe.instructions.filter((step) => step.trim() !== ''),
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Recipes
      </Link>

      <h1 className={styles.title}>Add Custom Recipe</h1>
      <p className={styles.subtitle}>Share your culinary creation with Chef&apos;s Zone</p>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="title">Recipe Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g., Goat Meat Pepper Soup"
              value={mealRecipe.title}
              onChange={(e) => setMealRecipe({ ...mealRecipe, title: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={mealRecipe.category}
              onChange={(e) => setMealRecipe({ ...mealRecipe, category: e.target.value })}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="region">Region</label>
            <select
              id="region"
              value={mealRecipe.region}
              onChange={(e) => setMealRecipe({ ...mealRecipe, region: e.target.value })}
            >
              <option value="African">African</option>
              <option value="Intercontinental">Intercontinental</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="prepTime">Prep Time</label>
            <input
              id="prepTime"
              type="text"
              required
              placeholder="e.g., 25 mins"
              value={mealRecipe.prepTime}
              onChange={(e) => setMealRecipe({ ...mealRecipe, prepTime: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="servings">Servings</label>
            <input
              id="servings"
              type="number"
              min="1"
              required
              value={mealRecipe.servings}
              onChange={(e) => setMealRecipe({ ...mealRecipe, servings: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* File Input */}
        <div className={styles.field}>
          <label htmlFor="imageFile">Recipe Photo</label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setMealRecipe({ ...mealRecipe, imageFile: e.target.files[0] });
              }
            }}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Short Description</label>
          <textarea
            id="description"
            rows={3}
            required
            placeholder="A quick summary of this dish..."
            value={mealRecipe.description}
            onChange={(e) => setMealRecipe({ ...mealRecipe, description: e.target.value })}
          />
        </div>

        {/* Dynamic Ingredients */}
        <fieldset className={styles.fieldset}>
          <legend>Ingredients</legend>
          {mealRecipe.ingredients.map((ing, idx) => (
            <div key={idx} className={styles.dynamicRow}>
              <input
                type="text"
                placeholder="Ingredient (e.g., Olive Oil)"
                required
                value={ing.name}
                onChange={(e) => setMealRecipe({ ...mealRecipe, ingredients: mealRecipe.ingredients.map((i, iIdx) => iIdx === idx ? { ...i, name: e.target.value } : i ) })}
              />
              <input
                type="text"
                placeholder="Amount (e.g., 2 tbsp)"
                required
                value={ing.amount}
                onChange={(e) => setMealRecipe({ ...mealRecipe, ingredients: mealRecipe.ingredients.map((i, iIdx) => iIdx === idx ? { ...i, amount: e.target.value } : i ) })}
              />
              {mealRecipe.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMealRecipe({ ...mealRecipe, ingredients: mealRecipe.ingredients.filter((_, iIdx) => iIdx !== idx) })}

                  className={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setMealRecipe({ ...mealRecipe, ingredients: [...mealRecipe.ingredients, { name: '', amount: '' }] })} className={styles.addBtn}>
            + Add Ingredient
          </button>
        </fieldset>

        {/* Dynamic Instructions */}
        <fieldset className={styles.fieldset}>
          <legend>Instructions</legend>
          {mealRecipe.instructions.map((step, idx) => (
            <div key={idx} className={styles.dynamicRow}>
              <span className={styles.stepNum}>{idx + 1}.</span>
              <input
                type="text"
                placeholder={`Step ${idx + 1} instruction...`}
                required
                value={step}
                onChange={(e) => setMealRecipe({ ...mealRecipe, instructions: mealRecipe.instructions.map((s, sIdx) => sIdx === idx ? e.target.value : s ) })}
              />
              {mealRecipe.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMealRecipe({ ...mealRecipe, instructions: mealRecipe.instructions.filter((_, sIdx) => sIdx !== idx) })}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setMealRecipe({ ...mealRecipe, instructions: [...mealRecipe.instructions, ''] })} className={styles.addBtn}>
            + Add Step
          </button>
        </fieldset>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Uploading & Publishing...' : 'Publish Recipe'}
        </button>
      </form>
    </main>
  );
}