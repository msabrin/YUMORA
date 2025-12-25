// Special Options (Exactly 3 items - NOT shown in shop)
export const specialOptions = [
  {
    id: 'special-1',
    type: 'mystery',
    title: 'Mystery Box',
    description: 'Unlock the unknown with our curated mystery collection. Each scoop reveals treasures beyond imagination.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pricing: {
      scoop1: 15,
      scoop2: 28,
      scoop3: 40,
      custom: 50
    }
  },
  {
    id: 'special-2',
    type: 'mystery',
    title: 'Charm Mystery Box',
    description: 'Enchanting surprises await in this magical collection. Discover charms that speak to your soul.',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pricing: {
      scoop1: 18,
      scoop2: 32,
      scoop3: 45,
      custom: 55
    }
  },
  {
    id: 'special-3',
    type: 'cup',
    title: 'Color Cup',
    description: 'Choose your perfect shade from our vibrant collection. Each color tells a different story.',
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    price: 12,
    colors: ['Red', 'Blue', 'Green', 'Pink', 'Yellow']
  }
];

// Browse Products (12+ items - shown ONLY in /shop)
export const browseProducts = [
  {
    id: 'prod-1',
    name: 'Mystic Necklace',
    category: 'Jewelry',
    price: 45,
    color: 'Gold',
    description: 'An elegant gold necklace adorned with mysterious charms that shimmer in the moonlight. Crafted with ethereal beauty.',
    image: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  },
  {
    id: 'prod-2',
    name: 'Velvet Scarf',
    category: 'Fashion',
    price: 28,
    color: 'Purple',
    description: 'Luxuriously soft velvet scarf with ethereal patterns woven through the fabric. Perfect for those who embrace mystery.',
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'prod-3',
    name: 'Crystal Ring',
    category: 'Jewelry',
    price: 38,
    color: 'Silver',
    description: 'A sparkling crystal ring infused with mystical energy. Each facet captures light in mesmerizing ways.',
    image: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
  },
  {
    id: 'prod-4',
    name: 'Moonlight Earrings',
    category: 'Jewelry',
    price: 32,
    color: 'Silver',
    description: 'Delicate earrings that seem to capture the essence of moonlight. Radiate elegance with every movement.',
    image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'prod-5',
    name: 'Enchanted Candle',
    category: 'Home Decor',
    price: 22,
    color: 'White',
    description: 'Hand-poured candle infused with calming scents and mysterious essences. Creates an atmosphere of wonder.',
    image: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  },
  {
    id: 'prod-6',
    name: 'Silk Handbag',
    category: 'Accessories',
    price: 68,
    color: 'Pink',
    description: 'Luxurious silk handbag with golden accents and hidden compartments. Elegance meets functionality.',
    image: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
  },
  {
    id: 'prod-7',
    name: 'Dream Catcher',
    category: 'Home Decor',
    price: 35,
    color: 'Brown',
    description: 'Handcrafted dream catcher woven with intention and care. Brings peaceful nights and mystical dreams.',
    image: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
  },
  {
    id: 'prod-8',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 42,
    color: 'Brown',
    description: 'Premium leather wallet with elegant stitching and timeless design. Carries your treasures with sophistication.',
    image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'prod-9',
    name: 'Pearl Bracelet',
    category: 'Jewelry',
    price: 55,
    color: 'White',
    description: 'Classic pearl bracelet radiating timeless elegance. Each pearl selected for its luminous beauty.',
    image: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)'
  },
  {
    id: 'prod-10',
    name: 'Vintage Mirror',
    category: 'Home Decor',
    price: 78,
    color: 'Gold',
    description: 'Ornate vintage mirror with golden frame and intricate details. Reflects beauty both within and without.',
    image: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)'
  },
  {
    id: 'prod-11',
    name: 'Satin Gloves',
    category: 'Fashion',
    price: 25,
    color: 'Black',
    description: 'Elegant satin gloves perfect for special occasions. Add a touch of mystery and sophistication to any outfit.',
    image: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)'
  },
  {
    id: 'prod-12',
    name: 'Gemstone Pendant',
    category: 'Jewelry',
    price: 62,
    color: 'Purple',
    description: 'Rare gemstone pendant with mystical properties. Radiates energy and captivates with its deep purple hues.',
    image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  }
];

// Hero Carousel Data (6 slides)
export const heroSlides = [
  {
    id: 1,
    title: 'Discover the Mystery',
    subtitle: 'Unveil hidden treasures',
    description: 'Step into a world of wonder where every box holds a secret waiting to be discovered.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cta: 'Explore Now',
    linkTo: '/product/special-1'
  },
  {
    id: 2,
    title: 'Charm Your Way',
    subtitle: 'Enchanting collections',
    description: 'Curated selections that speak to your soul and elevate your style to new dimensions.',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cta: 'Shop Charms',
    linkTo: '/product/special-2'
  },
  {
    id: 3,
    title: 'Color Your World',
    subtitle: 'Vibrant possibilities',
    description: 'Choose from our rainbow of options and express your unique personality with every sip.',
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cta: 'Browse Colors',
    linkTo: '/product/special-3'
  },
  {
    id: 4,
    title: 'Elegant Mysteries',
    subtitle: 'Timeless beauty',
    description: 'Where sophistication meets surprise in perfect harmony. Discover treasures crafted with care.',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cta: 'Discover More',
    linkTo: '/shop'
  },
  {
    id: 5,
    title: 'Handcrafted Wonder',
    subtitle: 'Artisan quality',
    description: 'Each piece tells a story, crafted with meticulous attention to detail and boundless creativity.',
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    cta: 'View Collection',
    linkTo: '/shop'
  },
  {
    id: 6,
    title: 'Gift the Unknown',
    subtitle: 'Perfect surprises',
    description: 'The joy of giving meets the thrill of discovery. Create unforgettable moments.',
    image: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%)',
    cta: 'Shop Gifts',
    linkTo: '/shop'
  }
];

// Categories for filtering
export const categories = ['All', 'Jewelry', 'Fashion', 'Accessories', 'Home Decor'];

// Colors for filtering
export const colors = ['All', 'Gold', 'Silver', 'Purple', 'Pink', 'White', 'Brown', 'Black'];
