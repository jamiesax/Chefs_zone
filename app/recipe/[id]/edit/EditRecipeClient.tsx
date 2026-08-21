'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Recipe, MealCategory } from '@/types/index';
import styles from './Edit.module.css';

interface EditRecipeClientProps {
  recipe: Recipe;
}

export default function EditRecipeClient({ recipe }: EditRecipeClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(recipe.title);
  const [category, setCategory] = useState<MealCategory>(recipe.category);
  const [region, setRegion] = useState<string>(recipe.region || 'African');
  const [prepTime, setPrepTime] = useState(recipe.prepTime);
  const [servings, setServings] = useState(recipe.servings);
  const [description, setDescription] = useState(recipe.description);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const [ingredients, setIngredients] = useState<string[]>(
    Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  );
  const [instructions, setInstructions] = useState<string[]>(
    Array.isArray(recipe.instructions) ? recipe.instructions : []
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic Array Handlers
  const handleItemChange = (
    index: number,
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addItem = (list: string[], setList: (val: string[]) => void) => {
    setList([...list, '']);
  };

  const removeItem = (index: number, list: string[], setList: (val: string[]) => void) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${recipe.userId}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('recipe-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('recipe-images').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      // Update recipe row in Supabase
      const { error: updateError } = await supabase
        .from('recipes')
        .update({
          title,
          category,
          region,
          prep_time: prepTime,
          servings: Number(servings),
          description,
          image_url: finalImageUrl,
          ingredients,
          instructions,
        })
        .eq('id', recipe.id);

      if (updateError) throw updateError;

      router.push(`/recipe/${recipe.id}`);
      router.refresh();
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Edit Recipe</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Recipe Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MealCategory)}
              className={styles.select}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.select}
            >
              <option value="African">African</option>
              <option value="Intercontinental">Intercontinental</option>
            </select>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Prep Time</label>
            <input
              type="text"
              required
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Servings</label>
            <input
              type="number"
              required
              min="1"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Recipe Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className={styles.fileInput}
          />
          <p className={styles.hint}>Leave empty to keep current photo.</p>
        </div>

        {/* Dynamic Ingredients */}
        <div className={styles.group}>
          <label className={styles.label}>Ingredients</label>
          {ingredients.map((ing, idx) => (
            <div key={idx} className={styles.dynamicRow}>
              <input
                type="text"
                required
                value={ing}
                onChange={(e) =>
                  handleItemChange(idx, e.target.value, ingredients, setIngredients)
                }
                className={styles.input}
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx, ingredients, setIngredients)}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(ingredients, setIngredients)}
            className={styles.addBtn}
          >
            Add Ingredient
          </button>
        </div>

        {/* Dynamic Instructions */}
        <div className={styles.group}>
          <label className={styles.label}>Instructions</label>
          {instructions.map((inst, idx) => (
            <div key={idx} className={styles.dynamicRow}>
              <textarea
                required
                rows={2}
                value={inst}
                onChange={(e) =>
                  handleItemChange(idx, e.target.value, instructions, setInstructions)
                }
                className={styles.textarea}
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx, instructions, setInstructions)}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(instructions, setInstructions)}
            className={styles.addBtn}
          >
            + Add Step
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className={styles.saveBtn}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </main>
  );
}