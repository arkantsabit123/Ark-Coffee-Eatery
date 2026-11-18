export const menuCategories = [
  { id: 'coffee', name: 'Coffee', specifiedItemCount: 4 },
  { id: 'non-coffee', name: 'Non-Coffee', specifiedItemCount: 3 },
  { id: 'main-course', name: 'Main Course', specifiedItemCount: 4 },
  { id: 'pastry', name: 'Pastry', specifiedItemCount: 3 },
] as const;

export const menuConceptItems = [
  { categoryId: 'coffee', image: 'images/menu/coffee/espresso.jpg', name: 'Espresso', description: 'Single origin Gayo, bold and clean', price: 'Rp 22.000' },
  { categoryId: 'coffee', image: 'images/menu/coffee/americano.jpg', name: 'Americano', description: 'Espresso with hot water, light and refreshing', price: 'Rp 25.000' },
  { categoryId: 'coffee', image: 'images/menu/coffee/latte.jpg', name: 'Latte', description: 'Espresso with steamed milk, smooth', price: 'Rp 32.000' },
  { categoryId: 'coffee', image: 'images/menu/coffee/kopi-susu-gula-aren.jpg', name: 'Kopi Susu Gula Aren', description: 'Signature. Sweet, aromatic palm sugar', price: 'Rp 28.000' },
  { categoryId: 'non-coffee', image: 'images/menu/non-coffee/matcha-latte.jpg', name: 'Matcha Latte', description: 'Japanese matcha with fresh milk', price: 'Rp 35.000' },
  { categoryId: 'non-coffee', image: 'images/menu/non-coffee/chocolate.jpg', name: 'Chocolate', description: 'Belgian chocolate, creamy and warm', price: 'Rp 30.000' },
  { categoryId: 'non-coffee', image: 'images/menu/non-coffee/lemon-tea.jpg', name: 'Lemon Tea', description: 'Black tea with fresh lemon, served iced', price: 'Rp 24.000' },
  { categoryId: 'main-course', image: 'images/menu/main-course/ark-fried-rice.jpg', name: 'Nasi Goreng Ark', description: 'Special fried rice with egg, chicken, and crackers', price: 'Rp 42.000' },
  { categoryId: 'main-course', image: 'images/menu/main-course/chicken-sandwich.jpg', name: 'Chicken Sandwich', description: 'Grilled chicken, lettuce, tomato, special sauce', price: 'Rp 38.000' },
  { categoryId: 'main-course', image: 'images/menu/main-course/beef-burger.jpg', name: 'Beef Burger', description: '150g beef patty, cheese, lettuce, fries', price: 'Rp 55.000' },
  { categoryId: 'main-course', image: 'images/menu/main-course/pasta-aglio-olio.jpg', name: 'Pasta Aglio Olio', description: 'Spaghetti with garlic, chili, and olive oil', price: 'Rp 45.000' },
  { categoryId: 'pastry', image: 'images/menu/pastry/croissant.jpg', name: 'Croissant', description: 'Butter croissant, baked fresh every morning', price: 'Rp 25.000' },
  { categoryId: 'pastry', image: 'images/menu/pastry/cinnamon-roll.jpg', name: 'Cinnamon Roll', description: 'Cinnamon roll with cream cheese glaze', price: 'Rp 28.000' },
  { categoryId: 'pastry', image: 'images/menu/pastry/banana-bread.jpg', name: 'Banana Bread', description: 'Soft banana bread with walnuts', price: 'Rp 22.000' },
] as const;
