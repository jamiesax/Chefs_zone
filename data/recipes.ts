import { Recipe } from '@/types/index';

export const MOCK_RECIPES: Recipe[] = [
  // --- AFRICAN / NIGERIAN CUISINE ---
  {
    id: 'af-1',
    title: 'Akara & Ogi (Bean Cakes & Pap)',
    description: 'Crispy deep-fried peeled black-eyed pea fritters served with warm, smooth fermented corn pudding.',
    region: 'African',
    category: 'Breakfast',
    prepTime: '25 mins',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 cups peeled black-eyed peas',
      '1 red bell pepper (Tatashe)',
      '1 scotch bonnet (Rodo)',
      '1 small onion',
      'Vegetable oil for deep frying',
      'Salt & seasoning cube to taste',
      '1 cup fermented corn paste (Ogi/Akamu) for serving'
    ],
    instructions: [
      'Blend peeled beans with bell pepper, scotch bonnet, and onion using minimal water until smooth.',
      'Whisk the batter briskly in one direction for 5 minutes to incorporate air.',
      'Heat oil in a deep pan. Season batter with salt and seasoning right before scooping into hot oil.',
      'Fry until golden brown on all sides and drain on paper towels.',
      'Serve hot alongside prepared smooth Ogi.'
    ]
  },
  {
    id: 'af-2',
    title: 'Yam & Egg Sauce',
    description: 'Boiled soft white yam slices served with a vibrant tomato, pepper, and onion fried egg sauce.',
    region: 'African',
    category: 'Breakfast',
    prepTime: '20 mins',
    servings: 3,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '1/2 tuber white yam, peeled and sliced',
      '4 large eggs',
      '3 fresh tomatoes, chopped',
      '2 scotch bonnet peppers, minced',
      '1 medium onion, sliced',
      '3 tbsp vegetable oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Boil yam slices in salted water for 15 minutes until fork-tender.',
      'Heat oil in a skillet and sauté onions, tomatoes, and scotch bonnets until soft.',
      'Whisk eggs with a pinch of salt and pour into the simmered pepper mixture.',
      'Scramble gently on low heat until eggs are set but moist.',
      'Serve hot yam paired with the egg sauce.'
    ]
  },
  {
    id: 'af-3',
    title: 'Smokey Party Jollof Rice',
    description: 'Classic West African long-grain rice cooked in a rich tomato, roasted pepper reduction with signature firewood aroma.',
    region: 'African',
    category: 'Lunch',
    prepTime: '45 mins',
    servings: 6,
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '3 cups parboiled long-grain rice',
      '4 red bell peppers, 3 tomatoes, 2 habaneros (blended & boiled down)',
      '1/2 cup tomato paste',
      '1 large onion, finely chopped',
      '1/2 cup vegetable oil',
      '3 cups rich beef stock',
      'Thyme, curry powder, bay leaves, garlic, ginger',
      '2 tbsp butter'
    ],
    instructions: [
      'Sauté onions and garlic in oil, add tomato paste and fry for 7 minutes until sweet.',
      'Pour in the boiled-down pepper blend, spices, and simmer until oil separates.',
      'Add beef stock, season, and bring to a boil.',
      'Stir in washed rice, cover tightly with foil and lid, and cook on low heat for 30 minutes.',
      'Increase heat slightly at the end to allow bottom char for the classic smokey flavor.'
    ]
  },
  {
    id: 'af-4',
    title: 'Egusi Soup with Pounded Yam',
    description: 'Rich ground melon seed soup thickened with spinach, stockfish, and smoked fish, paired with smooth pounded yam.',
    region: 'African',
    category: 'Dinner',
    prepTime: '50 mins',
    servings: 5,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 cups ground melon seeds (Egusi)',
      'Assorted meats (beef, goat meat, shaki), cooked',
      '1 cup smoked fish & stockfish flakes',
      '2 cups chopped spinach or ugu leaves',
      '1/2 cup red palm oil',
      'Ground crayfish, scotch bonnets, seasoning cubes',
      'Pounded yam or yam flour for serving'
    ],
    instructions: [
      'Mix ground egusi with a little water to form a thick paste.',
      'Heat palm oil in a pot and add egusi paste lumps. Fry on medium heat for 10 minutes until firm.',
      'Add meat stock, cooked meats, stockfish, and crayfish. Simmer for 15 minutes.',
      'Stir in chopped green vegetables and simmer for 3 minutes.',
      'Serve hot with freshly pounded yam.'
    ]
  },
  {
    id: 'af-5',
    title: 'Efo Riro (Nigerian Spinach Stew)',
    description: 'A rich, savory Yoruba vegetable soup loaded with bell peppers, locust beans (Iru), and assorted meats.',
    region: 'African',
    category: 'Dinner',
    prepTime: '40 mins',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '500g fresh spinach (chopped and blanched)',
      '3 coarse-blended red bell peppers & habaneros',
      '1/3 cup palm oil',
      '2 tbsp fermented locust beans (Iru)',
      'Pre-cooked beef, cow tripe (Shaki), and dried ponmo',
      'Ground crayfish and seasoning cubes'
    ],
    instructions: [
      'Bleach palm oil briefly, add chopped onions and iru, and fry until fragrant.',
      'Add coarse pepper mix and simmer until excess moisture evaporates.',
      'Stir in cooked meats, ponmo, crayfish, and seasoning.',
      'Fold in blanched spinach, mix thoroughly, and turn off heat after 2 minutes.'
    ]
  },
  {
    id: 'af-6',
    title: 'Spicy Peppered Goat Meat (Asun)',
    description: 'Tender roasted goat meat tossed in a fiery habanero pepper reduction with bell peppers and onions.',
    region: 'African',
    category: 'Snacks',
    prepTime: '35 mins',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '1kg goat meat (skin on, bite-sized pieces)',
      '4 habanero peppers, coarsely crushed',
      '1 green and 1 red bell pepper, diced',
      '1 large onion, chopped',
      'Garlic, ginger, thyme, and seasoning cubes',
      '2 tbsp vegetable oil'
    ],
    instructions: [
      'Season goat meat with garlic, ginger, thyme, onions, and salt. Boil until tender.',
      'Grill or oven-roast goat meat at 200°C for 15 minutes until lightly browned.',
      'Sauté crushed habaneros and bell peppers in oil for 3 minutes.',
      'Toss grilled goat meat into the pepper mix until fully coated.'
    ]
  },

  // --- INTERCONTINENTAL DISHES ---
  {
    id: 'ic-1',
    title: 'Fluffy Pancakes with Maple Syrup',
    description: 'Golden, cloud-like buttermilk pancakes stacked high and served with butter and pure maple syrup.',
    region: 'Intercontinental',
    category: 'Breakfast',
    prepTime: '15 mins',
    servings: 3,
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1 1/2 cups buttermilk',
      '2 large eggs',
      '1/4 cup melted butter',
      'Maple syrup and fresh berries'
    ],
    instructions: [
      'Whisk dry ingredients together in a large bowl.',
      'Combine buttermilk, eggs, and melted butter in a separate jug.',
      'Fold wet ingredients into dry until just combined (do not overmix).',
      'Ladle batter onto a hot buttered griddle and flip when bubbles form.',
      'Serve stacked with butter, berries, and maple syrup.'
    ]
  },
  {
    id: 'ic-2',
    title: 'Avocado & Poached Egg Toast',
    description: 'Crispy sourdough toast topped with seasoned mashed avocado, soft poached eggs, and chili flakes.',
    region: 'Intercontinental',
    category: 'Breakfast',
    prepTime: '10 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 fresh eggs',
      '1 tbsp lemon juice',
      'Red pepper flakes, sea salt, black pepper'
    ],
    instructions: [
      'Toast sourdough slices until golden and crisp.',
      'Mash avocado with lemon juice, salt, and pepper.',
      'Poach eggs in gently simmering water with vinegar for 3 minutes.',
      'Spread avocado over toast, top with poached eggs, and sprinkle chili flakes.'
    ]
  },
  {
    id: 'ic-3',
    title: 'Smoked Salmon Bagel Sandwich',
    description: 'Toasted sesame bagel layered with herb cream cheese, premium smoked salmon, capers, and red onion.',
    region: 'Intercontinental',
    category: 'Lunch',
    prepTime: '10 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '1 sesame bagel, halved',
      '3 tbsp cream cheese',
      '100g smoked salmon slices',
      '1 tbsp capers',
      'Thinly sliced red onion & fresh dill'
    ],
    instructions: [
      'Toast bagel halves until light brown.',
      'Spread cream cheese evenly across both halves.',
      'Layer smoked salmon, capers, sliced onions, and dill.',
      'Finish with cracked black pepper.'
    ]
  },
  {
    id: 'ic-4',
    title: 'Creamy Fettuccine Alfredo',
    description: 'Tender fettuccine pasta tossed in a rich butter, heavy cream, and freshly grated Parmesan cheese sauce.',
    region: 'Intercontinental',
    category: 'Lunch',
    prepTime: '20 mins',
    servings: 3,
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '350g fettuccine pasta',
      '1/2 cup butter',
      '1 cup heavy cream',
      '1 1/2 cups freshly grated Parmesan cheese',
      '2 cloves garlic, minced',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Boil fettuccine in salted water until al dente.',
      'Melt butter in a skillet over medium heat and sauté garlic for 1 minute.',
      'Pour in heavy cream and simmer for 3 minutes.',
      'Stir in Parmesan until smooth, then toss pasta into sauce.'
    ]
  },
  {
    id: 'ic-5',
    title: 'Grilled Ribeye Steak with Herb Butter',
    description: 'Pan-seared ribeye steak basted with garlic butter, rosemary, and thyme, cooked to medium-rare.',
    region: 'Intercontinental',
    category: 'Dinner',
    prepTime: '25 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 ribeye steaks (300g each)',
      '3 tbsp unsalted butter',
      '3 cloves garlic, crushed',
      'Fresh rosemary & thyme sprigs',
      'Coarse sea salt & black pepper'
    ],
    instructions: [
      'Generously season steak with salt and pepper.',
      'Sear in a smoking hot cast-iron skillet for 3 minutes per side.',
      'Add butter, garlic, and herbs. Baste steak continuously for 2 minutes.',
      'Rest steak for 5 minutes before slicing.'
    ]
  },

  // --- DESSERTS & SWEETS ---
  {
    id: 'ds-1',
    title: 'Cinnamon Sugar Puff Puff',
    description: 'West African sweet fried dough balls rolled in warm cinnamon sugar for an elevated dessert twist.',
    region: 'Desserts',
    category: 'Snacks',
    prepTime: '30 mins',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 cup sugar',
      '1 1/2 tsp instant yeast',
      '1 cup warm water',
      'Oil for deep frying',
      '1/2 cup sugar mixed with 1 tbsp cinnamon'
    ],
    instructions: [
      'Mix flour, sugar, yeast, and warm water into a smooth batter. Proof for 45 minutes.',
      'Heat oil to 170°C. Scoop small batter balls into oil.',
      'Fry until golden brown and drain briefly.',
      'Toss immediately in cinnamon sugar coating.'
    ]
  },
  {
    id: 'ds-2',
    title: 'Molten Chocolate Lava Cake',
    description: 'Individual warm chocolate cakes with a gooey liquid chocolate center, served with vanilla ice cream.',
    region: 'Desserts',
    category: 'Snacks',
    prepTime: '20 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '100g dark chocolate',
      '1/2 cup butter',
      '2 eggs + 2 egg yolks',
      '1/4 cup sugar',
      '2 tbsp flour',
      'Vanilla bean ice cream'
    ],
    instructions: [
      'Melt chocolate and butter together until smooth.',
      'Whisk eggs, yolks, and sugar until pale, then fold into chocolate.',
      'Stir in flour, divide into ramekins, and bake at 200°C for 12 minutes.',
      'Invert onto plates and serve immediately with ice cream.'
    ]
  },
  {
    id: 'ds-3',
    title: 'Tres Leches Milk Cake',
    description: 'Ultra-moist sponge cake soaked in a sweet three-milk mixture, topped with whipped cream and berries.',
    region: 'Desserts',
    category: 'Snacks',
    prepTime: '40 mins',
    servings: 8,
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    ingredients: [
      '1 sponge cake sheet',
      '1 can evaporated milk',
      '1 can sweetened condensed milk',
      '1/2 cup heavy cream',
      'Whipped cream and sliced strawberries'
    ],
    instructions: [
      'Poke holes all over baked sponge cake using a fork.',
      'Whisk three milks together and pour slowly over cake.',
      'Refrigerate for 4 hours to absorb milks.',
      'Top with whipped cream and strawberries before slicing.'
    ]
  }
];