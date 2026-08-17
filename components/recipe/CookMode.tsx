'use client';

import { useState } from 'react';
import styles from './CookMode.module.css';

interface CookModeProps {
  ingredients: { name: string; amount: string }[];
  instructions: string[];
}

export default function CookMode({ ingredients, instructions }: CookModeProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isCookMode, setIsCookMode] = useState(false);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const totalSteps = instructions.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => setIsCookMode(!isCookMode)}
          className={`${styles.modeToggle} ${isCookMode ? styles.activeToggle : ''}`}
        >
          {isCookMode ? '📖 Switch to Standard View' : '👨‍🍳 Start Interactive Cook Mode'}
        </button>

        {isCookMode && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className={styles.progressText}>
              {completedCount} of {totalSteps} steps completed ({progressPercentage}%)
            </span>
          </div>
        )}
      </div>

      <div className={styles.sectionsGrid}>
        {/* Ingredients Checklist */}
        <section className={styles.section}>
          <h2>Ingredients</h2>
          <ul className={styles.checklist}>
            {ingredients.map((ing, idx) => (
              <li
                key={idx}
                onClick={() => toggleIngredient(idx)}
                className={`${styles.checkItem} ${
                  checkedIngredients[idx] ? styles.itemDone : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checkedIngredients[idx]}
                  onChange={() => {}} // handled by parent li click
                  className={styles.checkbox}
                />
                <span className={styles.ingredientText}>
                  {ing.name} <strong className={styles.amount}>({ing.amount})</strong>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions Steps */}
        <section className={styles.section}>
          <h2>Instructions</h2>
          <ol className={styles.stepsList}>
            {instructions.map((step, idx) => (
              <li
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`${styles.stepCard} ${
                  completedSteps[idx] ? styles.stepDone : ''
                }`}
              >
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step {idx + 1}</span>
                  <input
                    type="checkbox"
                    checked={!!completedSteps[idx]}
                    onChange={() => {}}
                    className={styles.checkbox}
                  />
                </div>
                <p className={styles.stepInstruction}>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}