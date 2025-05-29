export interface Store {
  id: string;
  name: string;
  category: string;
  logo?: string;
  website?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface StoreCategory {
  id: string;
  name: string;
  emoji: string;
  stores: string[];
}

export const storeCategories: StoreCategory[] = [
  {
    id: 'grocery',
    name: 'Grocery Stores',
    emoji: '🛒',
    stores: ['Biedronka', 'Lidl', 'Netto', 'Carrefour', 'Kaufland']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    emoji: '🏡',
    stores: ['KiK', 'Pepco', 'home&you', 'Action']
  },
  {
    id: 'drugstores',
    name: 'Drugstores',
    emoji: '💊',
    stores: ['Rossmann', 'Hebe', 'DM']
  },
  {
    id: 'children',
    name: 'Children',
    emoji: '🧸',
    stores: ['Smyk']
  },
  {
    id: 'furniture',
    name: 'Furniture',
    emoji: '🛏️',
    stores: ['Jysk', 'Abra', 'Agata Meble', 'Black Red White', 'IKEA']
  },
  {
    id: 'construction',
    name: 'Construction',
    emoji: '🔨',
    stores: ['Castorama', 'Leroy Merlin', 'OBI', 'Bricomarche']
  },
  {
    id: 'electronics',
    name: 'Electronics & Appliances',
    emoji: '📺',
    stores: ['RTV EURO AGD', 'Media Expert', 'Media Markt']
  },
  {
    id: 'fashion',
    name: 'Fashion & Jewellery',
    emoji: '👗',
    stores: ['Takko Fashion', 'C&A']
  },
  {
    id: 'sport',
    name: 'Sport',
    emoji: '🏅',
    stores: ['4F', 'Adidas', 'Decathlon']
  },
  {
    id: 'shoes',
    name: 'Shoes',
    emoji: '👟',
    stores: ['CCC', 'Deichmann', 'eobuwie.pl', 'New Balance']
  },
  {
    id: 'pets',
    name: 'Pet Supplies',
    emoji: '🐾',
    stores: ['Kakadu', 'MAXI ZOO']
  },
  {
    id: 'culture',
    name: 'Culture & Entertainment',
    emoji: '📚',
    stores: ['Empik', 'taniaksiazka.pl']
  }
];

export const sampleStores: Store[] = [
  // Grocery Stores
  {
    id: 'biedronka-1',
    name: 'Biedronka',
    category: 'grocery',
    location: {
      lat: 52.2297,
      lng: 21.0122,
      address: 'ul. Marszałkowska 1, 00-001 Warszawa'
    }
  },
  {
    id: 'lidl-1',
    name: 'Lidl',
    category: 'grocery',
    location: {
      lat: 52.2370,
      lng: 21.0175,
      address: 'ul. Świętokrzyska 15, 00-050 Warszawa'
    }
  },
  {
    id: 'carrefour-1',
    name: 'Carrefour',
    category: 'grocery',
    location: {
      lat: 52.2319,
      lng: 21.0067,
      address: 'ul. Nowy Świat 20, 00-001 Warszawa'
    }
  },
  // Electronics
  {
    id: 'media-expert-1',
    name: 'Media Expert',
    category: 'electronics',
    location: {
      lat: 52.2500,
      lng: 21.0300,
      address: 'ul. Targowa 50, 03-734 Warszawa'
    }
  },
  {
    id: 'media-markt-1',
    name: 'Media Markt',
    category: 'electronics',
    location: {
      lat: 52.2200,
      lng: 21.0400,
      address: 'ul. Puławska 100, 02-595 Warszawa'
    }
  },
  // Home & Garden
  {
    id: 'ikea-1',
    name: 'IKEA',
    category: 'furniture',
    location: {
      lat: 52.1900,
      lng: 20.9500,
      address: 'ul. Popularna 1, 02-962 Warszawa'
    }
  },
  {
    id: 'pepco-1',
    name: 'Pepco',
    category: 'home-garden',
    location: {
      lat: 52.2400,
      lng: 21.0200,
      address: 'ul. Krakowskie Przedmieście 5, 00-001 Warszawa'
    }
  }
]; 