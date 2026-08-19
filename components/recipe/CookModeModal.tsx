'use client';

import { useState } from 'react';
import styles from './CookModeModal.module.css';

interface CookModeModalProps {
  recipeTitle: string;
  instructions: string[];
  onClose: () => void;
}

export default function CookModeModal({
  recipeTitle,
  instructions,
  onClose,
}: CookModeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = instructions.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <span className={styles.badge}>👨‍🍳 Cook Mode</span>
            <h2 className={styles.title}>{recipeTitle}</h2>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕ Exit
          </button>
        </header>

        {/* Progress Bar */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Current Step Body */}
        <div className={styles.body}>
          <div className={styles.stepIndicator}>
            Step {currentStep + 1} of {totalSteps}
          </div>
          <p className={styles.instructionText}>{instructions[currentStep]}</p>
        </div>

        {/* Navigation Controls */}
        <footer className={styles.footer}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={styles.navBtn}
          >
            ← Previous
          </button>

          {currentStep === totalSteps - 1 ? (
            <button onClick={onClose} className={styles.finishBtn}>
              🎉 Finish Cooking
            </button>
          ) : (
            <button onClick={handleNext} className={styles.nextBtn}>
              Next Step →
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}