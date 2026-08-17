import { Recipe } from "@/types";

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "avocado-toast",
    title: "Avocado Toast with Poached Egg",
    description: "Crispy sourdough topped with smashed avocado, chili flakes, and a warm poached egg.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop",
    prepTime: "15 mins",
    servings: 2,
    category: "Healthy",
    tags: ["Breakfast", "Quick"],
    ingredients: [
      { name: "Sourdough bread slices", amount: "2" },
      { name: "Ripe avocado", amount: "1" },
      { name: "Eggs", amount: "2" },
      { name: "Chili flakes", amount: "1/2 tsp" },
    ],
    instructions: [
      "Toast sourdough slices until golden.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Poach eggs in simmering water for 3 minutes.",
      "Assemble toast and serve immediately.",
    ],
  },
  {
    id: "spicy-shrimp-pasta",
    title: "Spicy Lemon Shrimp Pasta",
    description: "Succulent shrimp tossed in garlic, lemon juice, chili flakes, and al dente linguine.",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop",
    prepTime: "20 mins",
    servings: 3,
    category: "Quick",
    tags: ["Dinner", "Quick"],
    ingredients: [
      { name: "Linguine pasta", amount: "250g" },
      { name: "Raw shrimp, peeled", amount: "300g" },
      { name: "Garlic cloves, minced", amount: "4" },
      { name: "Lemon juice & zest", amount: "1 lemon" },
    ],
    instructions: [
      "Boil linguine according to package directions.",
      "Sauté garlic and shrimp in olive oil until pink (3-4 mins).",
      "Toss pasta with shrimp, lemon juice, zest, and fresh parsley.",
    ],
  },
  {
    id: "berry-smoothie-bowl",
    title: "Berry & Avocado Smoothie Bowl",
    description: "Thick, creamy smoothie bowl topped with fresh chia seeds, sliced bananas, and granola.",
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop",
    prepTime: "10 mins",
    servings: 1,
    category: "Healthy",
    tags: ["Breakfast", "Healthy"],
    ingredients: [
      { name: "Frozen mixed berries", amount: "1 cup" },
      { name: "Half avocado", amount: "1/2" },
      { name: "Almond milk", amount: "1/2 cup" },
      { name: "Granola & chia seeds", amount: "For topping" },
    ],
    instructions: [
      "Blend berries, avocado, and almond milk until smooth.",
      "Pour into a bowl and arrange granola and chia seeds on top.",
    ],
  },
];