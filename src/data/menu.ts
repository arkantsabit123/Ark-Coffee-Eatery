export const menuCategories = [
  { id: 'coffee', name: 'Coffee', specifiedItemCount: 4 },
  { id: 'non-coffee', name: 'Non-Coffee', specifiedItemCount: 3 },
  { id: 'main-course', name: 'Main Course', specifiedItemCount: 4 },
  { id: 'pastry', name: 'Pastry', specifiedItemCount: 3 },
] as const;

export const menuConceptItems = [
  { id: 'espresso', categoryId: 'coffee', image: 'images/menu/coffee/espresso.jpg', name: 'Espresso', description: 'Single origin Gayo, bold and clean', price: 22_000 },
  { id: 'americano', categoryId: 'coffee', image: 'images/menu/coffee/americano.jpg', name: 'Americano', description: 'Espresso with hot water, light and refreshing', price: 25_000 },
  { id: 'latte', categoryId: 'coffee', image: 'images/menu/coffee/latte.jpg', name: 'Latte', description: 'Espresso with steamed milk, smooth', price: 32_000 },
  { id: 'kopi-susu-gula-aren', categoryId: 'coffee', image: 'images/menu/coffee/kopi-susu-gula-aren.jpg', name: 'Kopi Susu Gula Aren', description: 'Signature. Sweet, aromatic palm sugar', price: 28_000 },
  { id: 'matcha-latte', categoryId: 'non-coffee', image: 'images/menu/non-coffee/matcha-latte.jpg', name: 'Matcha Latte', description: 'Japanese matcha with fresh milk', price: 35_000 },
  { id: 'chocolate', categoryId: 'non-coffee', image: 'images/menu/non-coffee/chocolate.jpg', name: 'Chocolate', description: 'Belgian chocolate, creamy and warm', price: 30_000 },
  { id: 'lemon-tea', categoryId: 'non-coffee', image: 'images/menu/non-coffee/lemon-tea.jpg', name: 'Lemon Tea', description: 'Black tea with fresh lemon, served iced', price: 24_000 },
  { id: 'nasi-goreng-ark', categoryId: 'main-course', image: 'images/menu/main-course/ark-fried-rice.jpg', name: 'Nasi Goreng Ark', description: 'Special fried rice with egg, chicken, and crackers', price: 42_000 },
  { id: 'chicken-sandwich', categoryId: 'main-course', image: 'images/menu/main-course/chicken-sandwich.jpg', name: 'Chicken Sandwich', description: 'Grilled chicken, lettuce, tomato, special sauce', price: 38_000 },
  { id: 'beef-burger', categoryId: 'main-course', image: 'images/menu/main-course/beef-burger.jpg', name: 'Beef Burger', description: '150g beef patty, cheese, lettuce, fries', price: 55_000 },
  { id: 'pasta-aglio-olio', categoryId: 'main-course', image: 'images/menu/main-course/pasta-aglio-olio.jpg', name: 'Pasta Aglio Olio', description: 'Spaghetti with garlic, chili, and olive oil', price: 45_000 },
  { id: 'croissant', categoryId: 'pastry', image: 'images/menu/pastry/croissant.jpg', name: 'Croissant', description: 'Butter croissant, baked fresh every morning', price: 25_000 },
  { id: 'cinnamon-roll', categoryId: 'pastry', image: 'images/menu/pastry/cinnamon-roll.jpg', name: 'Cinnamon Roll', description: 'Cinnamon roll with cream cheese glaze', price: 28_000 },
  { id: 'banana-bread', categoryId: 'pastry', image: 'images/menu/pastry/banana-bread.jpg', name: 'Banana Bread', description: 'Soft banana bread with walnuts', price: 22_000 },
] as const;

export function formatMenuPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}
