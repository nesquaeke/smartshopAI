export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  prices: {
    store: string;
    price: number;
    currency: string;
    inStock: boolean;
  }[];
  image?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    emoji: '🥦',
    subcategories: ['Vegetables', 'Fruits', 'Organic Products', 'Nuts & Snacks']
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    emoji: '🍾',
    subcategories: ['Beer', 'Wine', 'Liquor', 'Whisky', 'Cider', 'Gin', 'Rum']
  },
  {
    id: 'beverages',
    name: 'Beverages',
    emoji: '🥤',
    subcategories: ['Soft Drinks', 'Juices']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    emoji: '📱',
    subcategories: ['Appliances', 'TVs', 'Computers', 'Smartphones', 'Tablets', 'Smartwatches']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    emoji: '🛀',
    subcategories: ['Bathroom Essentials', 'Kitchenware']
  },
  {
    id: 'cleaning',
    name: 'Cleaning Products',
    emoji: '🧴',
    subcategories: ['Laundry', 'Dishwashing', 'General Cleaning']
  },
  {
    id: 'children',
    name: 'Children',
    emoji: '🍼',
    subcategories: ['Toys', 'Diapers', 'School Supplies']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    emoji: '👗',
    subcategories: ['Men\'s', 'Women\'s', 'Children\'s Shoes']
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Health',
    emoji: '🛁',
    subcategories: ['Soap', 'Bath & Body Care', 'Skincare']
  },
  {
    id: 'pets',
    name: 'Pets',
    emoji: '🐶',
    subcategories: ['Dog & Cat Food']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    emoji: '🚗',
    subcategories: ['Tires', 'Car Accessories']
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    emoji: '🚴',
    subcategories: ['Scooters', 'Bikes', 'Pools', 'Grills', 'Luggage & Backpacks']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    emoji: '🎲',
    subcategories: ['Books', 'Movies', 'Video Games']
  }
];

export const sampleProducts: Product[] = [
  // Groceries
  {
    id: 'milk-1',
    name: 'Mleko 3,2% 1L',
    category: 'groceries',
    subcategory: 'Vegetables',
    prices: [
      { store: 'Biedronka', price: 3.49, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 3.29, currency: 'PLN', inStock: true },
      { store: 'Netto', price: 3.59, currency: 'PLN', inStock: false },
      { store: 'Carrefour', price: 3.45, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 3.39, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'bread-1',
    name: 'Chleb Graham 500g',
    category: 'groceries',
    subcategory: 'Vegetables',
    prices: [
      { store: 'Biedronka', price: 2.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 2.79, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 3.19, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 2.89, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'apple-1',
    name: 'Jabłka Gala 1kg',
    category: 'groceries',
    subcategory: 'Fruits',
    prices: [
      { store: 'Biedronka', price: 4.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 4.49, currency: 'PLN', inStock: true },
      { store: 'Netto', price: 5.29, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 4.79, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'banana-1',
    name: 'Banany 1kg',
    category: 'groceries',
    subcategory: 'Fruits',
    prices: [
      { store: 'Biedronka', price: 5.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 5.49, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 6.19, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 5.79, currency: 'PLN', inStock: false },
    ]
  },
  {
    id: 'cheese-1',
    name: 'Ser Gouda 200g',
    category: 'groceries',
    subcategory: 'Organic Products',
    prices: [
      { store: 'Biedronka', price: 8.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 8.49, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 9.29, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 8.79, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'nuts-1',
    name: 'Orzechy Włoskie 100g',
    category: 'groceries',
    subcategory: 'Nuts & Snacks',
    prices: [
      { store: 'Biedronka', price: 12.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 11.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 13.49, currency: 'PLN', inStock: false },
      { store: 'Rossmann', price: 12.49, currency: 'PLN', inStock: true },
    ]
  },

  // Electronics
  {
    id: 'iphone-15',
    name: 'iPhone 15 128GB',
    category: 'electronics',
    subcategory: 'Smartphones',
    prices: [
      { store: 'Media Expert', price: 3599, currency: 'PLN', inStock: true },
      { store: 'RTV EURO AGD', price: 3649, currency: 'PLN', inStock: true },
      { store: 'Media Markt', price: 3579, currency: 'PLN', inStock: false },
      { store: 'Allegro', price: 3519, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'samsung-tv',
    name: 'Samsung 55" 4K Smart TV',
    category: 'electronics',
    subcategory: 'TVs',
    prices: [
      { store: 'Media Expert', price: 2299, currency: 'PLN', inStock: true },
      { store: 'RTV EURO AGD', price: 2399, currency: 'PLN', inStock: true },
      { store: 'Media Markt', price: 2249, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 2199, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'laptop-1',
    name: 'Laptop Lenovo IdeaPad 15"',
    category: 'electronics',
    subcategory: 'Computers',
    prices: [
      { store: 'Media Expert', price: 2899, currency: 'PLN', inStock: true },
      { store: 'RTV EURO AGD', price: 2949, currency: 'PLN', inStock: false },
      { store: 'Media Markt', price: 2849, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 2799, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'smartwatch-1',
    name: 'Apple Watch Series 9',
    category: 'electronics',
    subcategory: 'Smartwatches',
    prices: [
      { store: 'Media Expert', price: 1799, currency: 'PLN', inStock: true },
      { store: 'RTV EURO AGD', price: 1849, currency: 'PLN', inStock: true },
      { store: 'Media Markt', price: 1779, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 1729, currency: 'PLN', inStock: false },
    ]
  },

  // Home & Garden
  {
    id: 'ikea-chair',
    name: 'IKEA STEFAN Sandalye',
    category: 'home-garden',
    subcategory: 'Kitchenware',
    prices: [
      { store: 'IKEA', price: 149, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 139, currency: 'PLN', inStock: true },
      { store: 'Abra', price: 159, currency: 'PLN', inStock: false },
    ]
  },
  {
    id: 'pepco-towel',
    name: 'Pepco Havlu Seti',
    category: 'home-garden',
    subcategory: 'Bathroom Essentials',
    prices: [
      { store: 'Pepco', price: 29.99, currency: 'PLN', inStock: true },
      { store: 'KiK', price: 34.99, currency: 'PLN', inStock: true },
      { store: 'Action', price: 27.99, currency: 'PLN', inStock: true },
      { store: 'home&you', price: 32.99, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'kitchen-knife',
    name: 'Nóż Kuchenny 20cm',
    category: 'home-garden',
    subcategory: 'Kitchenware',
    prices: [
      { store: 'IKEA', price: 49.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 59.99, currency: 'PLN', inStock: true },
      { store: 'Castorama', price: 45.99, currency: 'PLN', inStock: true },
      { store: 'Leroy Merlin', price: 47.99, currency: 'PLN', inStock: false },
    ]
  },

  // Beverages
  {
    id: 'coca-cola',
    name: 'Coca Cola 2L',
    category: 'beverages',
    subcategory: 'Soft Drinks',
    prices: [
      { store: 'Biedronka', price: 5.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 5.49, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 6.29, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 5.79, currency: 'PLN', inStock: true },
      { store: 'Netto', price: 6.09, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'orange-juice',
    name: 'Sok Pomarańczowy 1L',
    category: 'beverages',
    subcategory: 'Juices',
    prices: [
      { store: 'Biedronka', price: 4.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 4.79, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 5.19, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 4.89, currency: 'PLN', inStock: false },
    ]
  },

  // Alcohol
  {
    id: 'beer-1',
    name: 'Piwo Żywiec 500ml',
    category: 'alcohol',
    subcategory: 'Beer',
    prices: [
      { store: 'Biedronka', price: 2.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 2.79, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 3.19, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 2.89, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'wine-1',
    name: 'Wino Czerwone 750ml',
    category: 'alcohol',
    subcategory: 'Wine',
    prices: [
      { store: 'Biedronka', price: 19.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 18.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 21.99, currency: 'PLN', inStock: true },
      { store: 'Kaufland', price: 19.49, currency: 'PLN', inStock: false },
    ]
  },

  // Fashion
  {
    id: 'nike-shoes',
    name: 'Nike Air Max 90',
    category: 'fashion',
    subcategory: 'Men\'s',
    prices: [
      { store: 'CCC', price: 399, currency: 'PLN', inStock: true },
      { store: 'Deichmann', price: 429, currency: 'PLN', inStock: false },
      { store: 'eobuwie.pl', price: 379, currency: 'PLN', inStock: true },
      { store: '4F', price: 419, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'adidas-shoes',
    name: 'Adidas Ultraboost 22',
    category: 'fashion',
    subcategory: 'Women\'s',
    prices: [
      { store: 'CCC', price: 549, currency: 'PLN', inStock: true },
      { store: 'Deichmann', price: 579, currency: 'PLN', inStock: true },
      { store: 'eobuwie.pl', price: 529, currency: 'PLN', inStock: true },
      { store: 'Adidas', price: 599, currency: 'PLN', inStock: true },
    ]
  },

  // Cleaning Products
  {
    id: 'detergent-1',
    name: 'Ariel Proszek 40 prań',
    category: 'cleaning',
    subcategory: 'Laundry',
    prices: [
      { store: 'Biedronka', price: 29.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 28.99, currency: 'PLN', inStock: true },
      { store: 'Rossmann', price: 31.99, currency: 'PLN', inStock: true },
      { store: 'DM', price: 30.49, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'dish-soap',
    name: 'Fairy Płyn do Naczyń 500ml',
    category: 'cleaning',
    subcategory: 'Dishwashing',
    prices: [
      { store: 'Biedronka', price: 8.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 8.49, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 9.49, currency: 'PLN', inStock: true },
      { store: 'Rossmann', price: 8.79, currency: 'PLN', inStock: false },
    ]
  },

  // Children
  {
    id: 'lego-set',
    name: 'LEGO City Zestaw 200 klocków',
    category: 'children',
    subcategory: 'Toys',
    prices: [
      { store: 'Smyk', price: 149.99, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 139.99, currency: 'PLN', inStock: true },
      { store: 'Empik', price: 159.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 144.99, currency: 'PLN', inStock: false },
    ]
  },
  {
    id: 'diapers-1',
    name: 'Pampers Pieluszki Rozmiar 4',
    category: 'children',
    subcategory: 'Diapers',
    prices: [
      { store: 'Biedronka', price: 39.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 37.99, currency: 'PLN', inStock: true },
      { store: 'Rossmann', price: 42.99, currency: 'PLN', inStock: true },
      { store: 'Hebe', price: 41.49, currency: 'PLN', inStock: true },
    ]
  },

  // Cosmetics & Health
  {
    id: 'shampoo-1',
    name: 'Loreal Szampon 400ml',
    category: 'cosmetics',
    subcategory: 'Bath & Body Care',
    prices: [
      { store: 'Rossmann', price: 19.99, currency: 'PLN', inStock: true },
      { store: 'Hebe', price: 21.99, currency: 'PLN', inStock: true },
      { store: 'DM', price: 18.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 22.49, currency: 'PLN', inStock: true },
    ]
  },
  {
    id: 'soap-1',
    name: 'Dove Mydło w Kostce 100g',
    category: 'cosmetics',
    subcategory: 'Soap',
    prices: [
      { store: 'Biedronka', price: 4.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 4.49, currency: 'PLN', inStock: true },
      { store: 'Rossmann', price: 5.49, currency: 'PLN', inStock: true },
      { store: 'DM', price: 5.19, currency: 'PLN', inStock: false },
    ]
  },

  // Pets
  {
    id: 'dog-food',
    name: 'Pedigree Karma dla Psów 3kg',
    category: 'pets',
    subcategory: 'Dog & Cat Food',
    prices: [
      { store: 'Kakadu', price: 29.99, currency: 'PLN', inStock: true },
      { store: 'MAXI ZOO', price: 31.99, currency: 'PLN', inStock: true },
      { store: 'Carrefour', price: 28.99, currency: 'PLN', inStock: true },
      { store: 'Lidl', price: 27.99, currency: 'PLN', inStock: false },
    ]
  },

  // Sports
  {
    id: 'bike-1',
    name: 'Rower Górski 26"',
    category: 'sports',
    subcategory: 'Bikes',
    prices: [
      { store: 'Decathlon', price: 899, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 849, currency: 'PLN', inStock: true },
      { store: 'Castorama', price: 929, currency: 'PLN', inStock: false },
    ]
  },

  // Entertainment
  {
    id: 'book-1',
    name: 'Książka "Sapiens" - Yuval Harari',
    category: 'entertainment',
    subcategory: 'Books',
    prices: [
      { store: 'Empik', price: 39.99, currency: 'PLN', inStock: true },
      { store: 'taniaksiazka.pl', price: 35.99, currency: 'PLN', inStock: true },
      { store: 'Allegro', price: 37.99, currency: 'PLN', inStock: true },
    ]
  }
]; 