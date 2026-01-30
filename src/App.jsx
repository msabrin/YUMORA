import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, IceCream, Copy, Check } from 'lucide-react';

// ============================================
// DISCOUNT CODES - UPDATE HERE TO CHANGE CODES
// ============================================
const VALID_CODES = {
  'SAVE10': 0.10,    // 10% discount
  'GIFT20': 0.20,    // 20% discount
  'WELCOME15': 0.15, // 15% discount
  'VIP25': 0.25      // 25% discount
};
// ============================================

// ============================================
// CUSTOM GIFT BOX CONSTANTS - EASY TO EDIT
// ============================================
const MIN_TYPES = 8;               // Minimum unique product types to checkout
const TIER_1_TYPES = 10;           // Unique types needed for tier 1 discount
const TIER_2_TYPES = 16;           // Unique types needed for tier 2 discount
const TIER_1_DISCOUNT = 0.05;      // 5% discount for 10+ types
const TIER_2_DISCOUNT = 0.10;      // 10% discount for 16+ types
const DELIVERY_INSIDE_DHAKA = 80;  // Delivery fee inside Dhaka
const DELIVERY_OUTSIDE_DHAKA = 200; // Delivery fee outside Dhaka
// ============================================

// Product data with availability
const mysteryBoxOptions = [
  { scoops: 1, price: 15 },
  { scoops: 2, price: 28 },
  { scoops: 3, price: 40 }
];

const giftBoxProducts = [
  {
    id: 'gift-1',
    name: 'Finger Ring',
    description: 'Elegant and stylish finger ring perfect for any occasion. Features a delicate design that adds charm to your everyday look.',
    image: '/assets/ring01.png',
    images: ['/assets/ring01.png', '/assets/1ring01.png', '/assets/2ring01.png'],
    price: 100,
    colors: ['Red', 'Pink', 'Blue', 'Yellow'],
    availableColors: ['Red', 'Blue', 'Yellow'], // Pink unavailable
    inStock: true
  },
  {
    id: 'gift-2',
    name: 'Premium Earring',
    description: 'Premium quality earrings with intricate details. Lightweight and comfortable for all-day wear, perfect for special events.',
    image: '/assets/earring.png',
    images: ['/assets/earring.png', '/assets/earring1.png', '/assets/Earring2.png'],
    price: 250,
    colors: ['Red', 'Pink', 'Green', 'Blue'],
    availableColors: ['Red', 'Pink', 'Green', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-3',
    name: 'Earring & Locket Set',
    description: 'Beautiful matching earring and locket set. Coordinated design that creates a sophisticated and cohesive look.',
    image: '/assets/earringlocket.png',
    images: ['/assets/earringlocket.png', '/assets/earringlocket1.png', '/assets/earringlocket2.png', '/assets/earringlocket3.png', '/assets/earringlocket4.png', '/assets/earringlocket5.png', '/assets/earringlocket6.png', '/assets/earringlocket7.png', '/assets/earringlocket8.png'],
    price: 300,
    colors: ['Silver', 'Golden'],
    availableColors: ['Silver', 'Golden'],
    inStock: true
  },
  {
    id: 'gift-4',
    name: 'Stone Earring & Locket Set',
    description: 'Stunning stone-studded earring and locket set. Features premium quality stones that sparkle and shine beautifully.',
    image: '/assets/stoneearringlocket.png',
    images: ['/assets/stoneearringlocket.png', '/assets/stoneearringlocket1.png', '/assets/stoneearringlocket2.png'],
    price: 400,
    colors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink', 'Purple', 'Black'],
    availableColors: ['Red', 'Blue', 'Green', 'Pink', 'Purple'], // Yellow unavailable
    inStock: true
  },
  {
    id: 'gift-5',
    name: 'Unique Erasser',
    description: 'Creative and fun erasers in various unique designs. Perfect for students or as collectible items.',
    image: '/assets/eraser.jpg',
    images: ['/assets/eraser.jpg', '/assets/eraser1.png', '/assets/eraser2.png', '/assets/eraser3.png', '/assets/eraser4.png', '/assets/eraser5.png', '/assets/eraser6.png'],
    price: 100,
    colors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink', 'Purple', 'Black', 'White'],
    availableColors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink', 'Purple', 'Black', 'White'],
    inStock: true
  },
  {
    id: 'gift-6',
    name: 'Elegant Bag',
    description: 'Stylish and practical bag with multiple compartments. Perfect for daily use with a touch of elegance.',
    image: '/assets/bag.png',
    images: ['/assets/bag.png', '/assets/bag1.jpg'],
    price: 700,
    colors: ['Black', 'Pink', 'White', 'Purple'],
    availableColors: ['Black', 'Pink', 'White', 'Purple'],
    inStock: true
  },
  {
    id: 'gift-7',
    name: 'Beauty Blender',
    description: 'Professional-grade beauty blender for flawless makeup application. Soft, durable, and perfect for blending foundation and concealer.',
    image: '/assets/Beautyblander.png',
    images: ['/assets/Beautyblander.png', '/assets/Beautyblender1.png'],
    price: 100,
    colors: ['Marron', 'Pink', 'Green', 'Cream', 'Light Pink', 'Orange'],
    availableColors: ['Marron', 'Pink', 'Green', 'Cream', 'Light Pink', 'Orange'],
    inStock: true
  },
  {
    id: 'gift-8',
    name: 'Crunchy Hair Band',
    description: 'Trendy and comfortable scrunchies that hold your hair gently without damage. Available in a variety of colors to match any outfit.',
    image: '/assets/Crunchy.png',
    images: ['/assets/Crunchy.png', '/assets/Chunchy1.png'],
    price: 60,
    colors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink', 'Purple', 'Black', 'White', 'Orange', 'Maroon', 'Silver', 'Cream'],
    availableColors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink', 'Purple', 'Black', 'White', 'Orange', 'Maroon', 'Silver', 'Cream'],
    inStock: true
  },
  {
    id: 'gift-9',
    name: 'Braclet',
    description: 'Chic bracelet that adds a modern touch to any outfit. Adjustable and comfortable for everyday wear.',
    image: '/assets/braslet.png',
    images: ['/assets/braslet.png', '/assets/braclet1.png', '/assets/braclet2.png', '/assets/braclet3.png'],
    price: 100,
    colors: ['Black', 'Rainbow'],
    availableColors: ['Black', 'Rainbow'],
    inStock: true
  },
  {
    id: 'gift-10',
    name: 'Minicher Mug',
    description: 'Adorable miniature mug charm perfect for keychains or decorative purposes. A cute and unique accessory.',
    image: '/assets/Charm.png',
    images: ['/assets/Charm.png'],
    price: 60,
    colors: ['Green', 'Pink', 'Blue'],
    availableColors: ['Green', 'Pink', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-11',
    name: 'Hair CLips',
    description: 'Decorative hair clips that securely hold your hair in place. Stylish and functional for various hairstyles.',
    image: '/assets/hairpin.png',
    images: ['/assets/hairpin.png', '/assets/hairpin1.png'],
    price: 100,
    colors: ['Green', 'Blue', 'Yellow', 'Pink', 'Purple', 'White'],
    availableColors: ['Green', 'Blue', 'Yellow', 'Pink', 'Purple', 'White'],
    inStock: true
  },
  {
    id: 'gift-12',
    name: 'Premium Lip Stick',
    description: 'Long-lasting premium lipstick with rich color and smooth application. Moisturizing formula for beautiful, comfortable lips.',
    image: '/assets/Lipstick.png',
    images: ['/assets/Lipstick.png', '/assets/Lipstick1.png', '/assets/lipstick2.png', '/assets/2ring01.png'],
    price: 500,
    colors: ['Red', 'Pink', 'Maroon', 'Nude', 'Light Pink'],
    availableColors: ['Red', 'Pink', 'Maroon', 'Nude', 'Light Pink'],
    inStock: true
  },
  {
    id: 'gift-13',
    name: 'Floral Lip Gel',
    description: 'Moisturizing lip gel infused with floral extracts. Provides a glossy finish while keeping your lips hydrated and soft.',
    image: '/assets/Lipgel.jpg',
    images: ['/assets/Lipgel.jpg'],
    price: 300,
    colors: ['Red', 'Pink', 'Orange'],
    availableColors: ['Red', 'Pink', 'Orange'],
    inStock: true
  },
  {
    id: 'gift-14',
    name: 'Beauty Lip Gloss',
    description: 'High-shine lip gloss that adds volume and dimension to your lips. Non-sticky formula for comfortable all-day wear.',
    image: '/assets/Lipgloss.png',
    images: ['/assets/Lipgloss.png'],
    price: 200,
    colors: ['Pink'],
    availableColors: ['Pink'],
    inStock: true
  },
  {
    id: 'gift-15',
    name: 'Modern Nails',
    description: 'Premium press-on nails with modern designs. Easy to apply and remove, perfect for a quick nail makeover.',
    image: '/assets/Fakenails.png',
    images: ['/assets/Fakenails.png'],
    price: 300,
    colors: ['Cream', 'Pink', 'Maroon', 'Blue', 'Light Brown'],
    availableColors: ['Cream', 'Pink', 'Maroon', 'Blue', 'Light Brown'],
    inStock: true
  },
  {
    id: 'gift-16',
    name: 'Face Mask',
    description: 'Comfortable and breathable face mask in trendy colors. Washable and reusable for everyday protection.',
    image: '/assets/Facemask.png',
    images: ['/assets/Facemask.png'],
    price: 100,
    colors: ['Red', 'Pink', 'Black', 'Blue', 'White', 'Green', 'Purple'],
    availableColors: ['Red', 'Pink', 'Black', 'Blue', 'White', 'Green', 'Purple'],
    inStock: true
  },
  {
    id: 'gift-17',
    name: 'Mud Mask',
    description: 'Purifying mud mask that deeply cleanses pores and removes impurities. Leaves skin feeling refreshed and revitalized.',
    image: '/assets/Mudmask.jpg',
    images: ['/assets/Mudmask.jpg'],
    price: 80,
    colors: ['Pink'],
    availableColors: ['Pink'],
    inStock: true
  },
  {
    id: 'gift-18',
    name: 'Candy Mask',
    description: 'Sweet-scented beauty mask with nourishing ingredients. Treats your skin while providing a delightful aromatherapy experience.',
    image: '/assets/candymask.jpeg',
    images: ['/assets/candymask.jpeg', '/assets/candymask1.jpeg', '/assets/candymask2.jpeg'],
    price: 20,
    colors: ['Pink'],
    availableColors: ['Pink'],
    inStock: true
  },
  {
    id: 'gift-19',
    name: 'Mirror',
    description: 'Compact handheld mirror perfect for on-the-go touch-ups. Clear reflection with an elegant design.',
    image: '/assets/Mirror.png',
    images: ['/assets/Mirror.png'],
    price: 250,
    colors: ['Cream', 'Pink', 'Black', 'Silver'],
    availableColors: ['Cream', 'Pink', 'Black', 'Silver'],
    inStock: true
  },
  {
    id: 'gift-20',
    name: 'Companion Mug',
    description: 'Charming ceramic mug perfect for your favorite hot beverages. Comfortable handle and generous capacity.',
    image: '/assets/Mug.png',
    images: ['/assets/Mug.png', '/assets/mug1.png'],
    price: 300,
    colors: ['Pink', 'Green', 'Blue'],
    availableColors: ['Green', 'Pink', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-21',
    name: 'Diary To Keep Your Secrets Secure',
    description: 'Beautiful diary with lock and key to keep your thoughts private. Quality paper perfect for daily journaling.',
    image: '/assets/dairy.png',
    images: ['/assets/dairy.png', '/assets/dairy1.png'],
    price: 200,
    colors: ['Blue', 'Pink', 'Purple'],
    availableColors: ['Blue', 'Pink', 'Purple'],
    inStock: true
  },
  {
    id: 'gift-22',
    name: 'Washi Type',
    description: 'Decorative washi tape perfect for crafts, journals, and gift wrapping. Easy to tear and reposition.',
    image: '/assets/Washitape.png',
    images: ['/assets/Washitape.png'],
    price: 40,
    colors: ['White', 'Pink', 'Red', 'Blue', 'Green'],
    availableColors: ['White', 'Pink', 'Red', 'Blue', 'Green'],
    inStock: true
  },
  {
    id: 'gift-23',
    name: 'Nail Sticker',
    description: 'Easy-to-apply nail stickers in trendy designs. Long-lasting and perfect for quick nail art.',
    image: '/assets/Nailsticker.png',
    images: ['/assets/Nailsticker.png'],
    price: 100,
    colors: ['Pink', 'Yellow'],
    availableColors: ['Pink'],
    inStock: true
  },
  {
    id: 'gift-24',
    name: 'High Lighter',
    description: 'Vibrant highlighter markers perfect for studying and organizing notes. Chisel tip for both thick and thin lines.',
    image: '/assets/Highlighter.png',
    images: ['/assets/Highlighter.png', '/assets/Highlighter1.png'],
    price: 40,
    colors: ['Orange', 'Pink', 'Green', 'Blue', 'Purple', 'Yellow'],
    availableColors: ['Orange', 'Pink', 'Green', 'Blue', 'Purple', 'Yellow'],
    inStock: true
  },
  {
    id: 'gift-25',
    name: 'Tip',
    description: 'Colorful decorative tip perfect for personalizing your stationery and accessories. Fun and creative design.',
    image: '/assets/Tip.png',
    images: ['/assets/Tip.png'],
    price: 20,
    colors: ['Rainbow'],
    availableColors: ['Rainbow'],
    inStock: true
  }
];

// ============================================
// PRODUCT COLORS CONFIGURATION
// Easy to add/modify colors - just add to this array
// ============================================
const PRODUCT_COLORS = [
  { name: 'Red', hex: '#e50404ff' },
  { name: 'Pink', hex: '#ef007bff' },
  { name: 'Green', hex: '#16ad4eff' },
  { name: 'Blue', hex: '#2669d5ff' },
  { name: 'Purple', hex: '#a659eeff' },
  { name: 'Rainbow', hex: '#cb6579ff' },
  { name: 'Yellow', hex: '#ffcf11ff' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Golden', hex: '#cca72dff' },
  { name: 'Orange', hex: '#f06400ff' },
  { name: 'Light Pink', hex: '#f799baff' },
  { name: 'Cream', hex: '#fcf799ff' },
  { name: 'Black', hex: '#000000ff' },
  { name: 'Light Brown', hex: '#8d6c4eff' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Nude', hex: '#dcb28cff' },
  { name: 'Maroon', hex: '#800020' },
  
];

// Colors available for Color Cup product (by name)
const AVAILABLE_CUP_COLORS = ['Red', 'Green', 'Blue', 'Purple', 'Pink', 'Yellow', 'Rainbow'];

// Helper function to calculate brightness from HEX and determine if color is light
const isLightColor = (hex) => {
  // Remove # if present
  const color = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate perceived brightness using standard formula
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

  // Return true if light (threshold ~150-186 works well)
  return brightness > 160;
};

// Get contrasting text color based on background
const getContrastColor = (hex) => {
  return isLightColor(hex) ? '#1F2937' : '#FFFFFF';
};

// Find color object by name
const getColorByName = (name) => {
  return PRODUCT_COLORS.find(c => c.name === name) || PRODUCT_COLORS[0];
};

// Available cup colors reference
const availableCupColors = AVAILABLE_CUP_COLORS;

// Bangladeshi phone validation
const validateBDPhone = (phone) => {
  // Remove any spaces or dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  // Check if it's exactly 11 digits and starts with valid BD prefixes
  const bdPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
  return bdPhoneRegex.test(cleanPhone);
};


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showGiftBoxCollection, setShowGiftBoxCollection] = useState(false);

  // Discount state
  const [discount, setDiscount] = useState(0); // Decimal value (e.g., 0.10 for 10%)
  const [discountCode, setDiscountCode] = useState(''); // Applied discount code
  const [discountInput, setDiscountInput] = useState(''); // Input field value in cart
  const [showBuyNowModal, setShowBuyNowModal] = useState(false); // Buy Now discount popup
  const [buyNowProduct, setBuyNowProduct] = useState(null); // Product for Buy Now popup

  // Confirm Order Modal state
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [confirmOrderProduct, setConfirmOrderProduct] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState('inside'); // 'inside' or 'outside'
  const [copiedNumber, setCopiedNumber] = useState(null);

  // Payment numbers
  const paymentNumbers = {
    bkash: '01335156146',
    nagad: '01335156146',
    rocket: '01335156146'
  };

  // Back to Top button state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hero Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mystery Box state
  const [mysteryBoxScoops, setMysteryBoxScoops] = useState(1);
  const [customScoops, setCustomScoops] = useState('');
  const [isCustomScoops, setIsCustomScoops] = useState(false);

  // Color Cup state - default to first available cup color
  const [cupColor, setCupColor] = useState(AVAILABLE_CUP_COLORS[0]);
  const [cupQuantity, setCupQuantity] = useState(1);

  // Gift Box Modal state - default to first product color
  const [giftBoxColor, setGiftBoxColor] = useState(PRODUCT_COLORS[0].name);
  const [giftBoxQuantity, setGiftBoxQuantity] = useState(1);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track which image is selected for cart/WhatsApp

  // Hero slides data
  // TO CHANGE IMAGES: Replace the image paths below with your own images from /assets/ folder
  const heroSlides = [
    {
      title: "Timeless Elegance",
      headline: "Discover Hidden Treasures",
      description: "Experience the thrill of mystery with our curated collection of surprise boxes, custom gift sets, and enchanted color cups.",
      image: "/assets/ring01.png",
    },
    {
      title: "Luxury Redefined",
      headline: "Exquisite Craftsmanship",
      description: "Each piece is meticulously handcrafted by master artisans, ensuring unparalleled quality and timeless beauty.",
      image: "/assets/earring&locket01.png",
    },
    {
      title: "Premium Collection",
      headline: "Curated Perfection",
      description: "From mystery boxes to elegant jewelry, every item is carefully selected to exceed your expectations.",
      image: "/assets/2ring01.png",
    },
    {
      title: "Exclusive Gifts",
      headline: "Moments of Wonder",
      description: "Create unforgettable memories with our unique gift collections designed for those who appreciate luxury.",
      image: "/assets/earring&locket11.png",
    },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Back to Top button visibility
  useEffect(() => {
    const handleScrollForBackToTop = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollForBackToTop);
    return () => window.removeEventListener('scroll', handleScrollForBackToTop);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to specific shop section
  const scrollToShopSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Apply discount code function
  const applyDiscountCode = (code) => {
    const upperCode = code.toUpperCase().trim();

    if (VALID_CODES[upperCode]) {
      setDiscount(VALID_CODES[upperCode]);
      setDiscountCode(upperCode);
      alert(`Discount code "${upperCode}" applied! You save ${(VALID_CODES[upperCode] * 100).toFixed(0)}%`);
      return true;
    } else {
      alert('Invalid discount code');
      return false;
    }
  };

  // Remove discount
  const removeDiscount = () => {
    setDiscount(0);
    setDiscountCode('');
    setDiscountInput('');
  };

  // Add to cart function
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem =>
        cartItem.id === item.id &&
        cartItem.color === item.color &&
        cartItem.scoops === item.scoops
      );

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.color === item.color && cartItem.scoops === item.scoops
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  // Add Mystery Box to cart
  const addMysteryBoxToCart = () => {
    const scoops = isCustomScoops ? parseInt(customScoops) : mysteryBoxScoops;
    if (!scoops || scoops < 1) {
      alert('Please select a valid number of scoops');
      return;
    }

    let price;
    if (scoops === 1) price = 15;
    else if (scoops === 2) price = 28;
    else if (scoops === 3) price = 40;
    else price = scoops * 15;

    const item = {
      id: `mystery-box-${scoops}`,
      name: 'Charm Mystery Box',
      type: 'mystery-box',
      scoops: scoops,
      price: price,
      quantity: 1,
      image: '/assets/earring&locket11.png'
    };

    addToCart(item);
  };

  // Add Color Cup to cart
  const addColorCupToCart = () => {
    if (!availableCupColors.includes(cupColor)) {
      alert('This color is currently unavailable');
      return;
    }

    const item = {
      id: `color-cup-${cupColor}`,
      name: 'Mystery Color Cup',
      type: 'color-cup',
      color: cupColor,
      price: 12,
      quantity: cupQuantity,
      image: '/assets/1earring&locket11.png'
    };

    addToCart(item);
  };

  // Add Gift Box from modal to cart
  const addGiftBoxToCart = () => {
    if (!selectedGiftBox) return;

    if (!selectedGiftBox.inStock) {
      alert('This product is currently sold out');
      return;
    }

    if (!selectedGiftBox.availableColors.includes(giftBoxColor)) {
      alert('This color is currently unavailable');
      return;
    }

    // Get the selected image URL from the product's images array
    const selectedImage = selectedGiftBox.images && selectedGiftBox.images.length > 0
      ? selectedGiftBox.images[selectedImageIndex]
      : selectedGiftBox.image;

    const item = {
      id: `${selectedGiftBox.id}-${giftBoxColor}`,
      name: selectedGiftBox.name,
      type: 'gift-box',
      color: giftBoxColor,
      price: selectedGiftBox.price,
      quantity: giftBoxQuantity,
      image: selectedImage, // Use the selected image instead of default
      selectedImageUrl: selectedImage // Store selected image URL for WhatsApp
    };

    addToCart(item);
    setSelectedGiftBox(null);
  };

  // Buy Now functions - Show confirm order modal
  const buyNowMysteryBox = () => {
    const scoops = isCustomScoops ? parseInt(customScoops) : mysteryBoxScoops;
    if (!scoops || scoops < 1) {
      alert('Please select a valid number of scoops');
      return;
    }

    let price;
    if (scoops === 1) price = 15;
    else if (scoops === 2) price = 28;
    else if (scoops === 3) price = 40;
    else price = scoops * 15;

    setConfirmOrderProduct({
      name: 'Charm Mystery Box',
      description: 'Unlock the unknown with our curated mystery collection. Each scoop reveals treasures beyond imagination.',
      price: price,
      type: 'mystery-box',
      scoops: scoops,
      quantity: 1,
      image: '/assets/earring&locket11.png'
    });
    setShowConfirmOrder(true);
  };

  const buyNowColorCup = () => {
    if (!availableCupColors.includes(cupColor)) {
      alert('This color is currently unavailable');
      return;
    }

    setConfirmOrderProduct({
      name: 'Mystery Color Cup',
      description: 'Choose your perfect shade from our vibrant collection. Each color tells a different story.',
      price: 12,
      type: 'color-cup',
      color: cupColor,
      quantity: cupQuantity,
      image: '/assets/1earring&locket11.png'
    });
    setShowConfirmOrder(true);
  };

  // Copy payment number to clipboard
  const copyToClipboard = (number, type) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(type);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Calculate delivery fee
  const getDeliveryFee = () => {
    return deliveryType === 'inside' ? DELIVERY_INSIDE_DHAKA : DELIVERY_OUTSIDE_DHAKA;
  };

  // Gift box cart calculations - track unique product TYPES (not quantity)
  const giftBoxCartItems = cartItems.filter(item => item.type === 'gift-box');
  const giftBoxUniqueTypes = new Set(giftBoxCartItems.map(item => item.id.replace(/-[^-]+$/, ''))).size;
  const hasGiftBoxItems = giftBoxUniqueTypes > 0;
  const giftBoxMeetsMinimum = giftBoxUniqueTypes >= MIN_TYPES;

  // Bulk discount based on unique gift box types
  const getBulkDiscountRate = () => {
    if (giftBoxUniqueTypes >= TIER_2_TYPES) return TIER_2_DISCOUNT;
    if (giftBoxUniqueTypes >= TIER_1_TYPES) return TIER_1_DISCOUNT;
    return 0;
  };
  const bulkDiscountRate = getBulkDiscountRate();

  // Handle confirm order WhatsApp
  const handleConfirmOrderWhatsApp = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!validateBDPhone(customerPhone)) {
      alert('Please enter a valid 11-digit Bangladeshi phone number (starting with 013-019)');
      return;
    }

    if (!confirmOrderProduct) return;

    const deliveryFee = getDeliveryFee();
    let productPrice, bulkDiscountAmount, promoDiscountAmount, finalTotal, productDetails;

    // Handle cart orders vs single product orders
    if (confirmOrderProduct.type === 'cart' && confirmOrderProduct.cartItems) {
      // Cart order - use pre-calculated values from cart
      productPrice = confirmOrderProduct.originalSubtotal;
      const cartBulkDiscount = confirmOrderProduct.appliedBulkDiscount || 0;
      const cartPromoDiscount = confirmOrderProduct.appliedDiscount || 0;
      bulkDiscountAmount = productPrice * cartBulkDiscount;
      promoDiscountAmount = productPrice * cartPromoDiscount;
      finalTotal = productPrice - bulkDiscountAmount - promoDiscountAmount + deliveryFee;

      // Build detailed product list
      productDetails = confirmOrderProduct.cartItems.map((item, idx) => {
        let details = `\n*${idx + 1}. ${item.name}*`;
        if (item.scoops) details += `\n   🧊 Scoops: ${item.scoops}`;
        if (item.color) details += `\n   🎨 Color: ${item.color}`;
        details += `\n   📦 Qty: ${item.quantity}`;
        details += `\n   💵 Price: ৳${item.price * item.quantity}`;
        if (item.selectedImageUrl) {
          details += `\n   🖼️ Image: ${item.selectedImageUrl}`;
        }
        return details;
      }).join('\n');
    } else {
      // Single product order
      productPrice = confirmOrderProduct.price * confirmOrderProduct.quantity;
      bulkDiscountAmount = 0;
      promoDiscountAmount = productPrice * discount;
      finalTotal = productPrice - promoDiscountAmount + deliveryFee;

      productDetails = `*📌 Product Name:* ${confirmOrderProduct.name}`;
      if (confirmOrderProduct.description) {
        productDetails += `\n*📝 Description:* ${confirmOrderProduct.description}`;
      }
      if (confirmOrderProduct.scoops) productDetails += `\n*🧊 Scoops:* ${confirmOrderProduct.scoops}`;
      if (confirmOrderProduct.color) productDetails += `\n*🎨 Color:* ${confirmOrderProduct.color}`;
      productDetails += `\n*📦 Quantity:* ${confirmOrderProduct.quantity}`;
      productDetails += `\n*💵 Unit Price:* ৳${confirmOrderProduct.price}`;
      if (confirmOrderProduct.selectedImageUrl) {
        productDetails += `\n*🖼️ Selected Image:* ${confirmOrderProduct.selectedImageUrl}`;
      }
    }

    let message = `🛍️ *I Would Like To Order*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 *ORDER DETAILS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `${productDetails}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *CUSTOMER DETAILS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Name:* ${customerName}\n`;
    message += `*Phone:* ${customerPhone}\n`;
    message += `*Address:* ${customerAddress}\n`;
    message += `*Delivery:* ${deliveryType === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *PRICE BREAKDOWN*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Subtotal:* ৳${productPrice}\n`;

    // Bulk discount info
    const cartBulkRate = confirmOrderProduct.type === 'cart' ? (confirmOrderProduct.appliedBulkDiscount || 0) : 0;
    if (cartBulkRate > 0) {
      message += `*Bulk Discount (${(cartBulkRate * 100).toFixed(0)}%):* -৳${bulkDiscountAmount.toFixed(0)}\n`;
    }

    // Promo discount info
    const appliedDiscountCode = confirmOrderProduct.type === 'cart' ? confirmOrderProduct.appliedDiscountCode : discountCode;
    const appliedPromoRate = confirmOrderProduct.type === 'cart' ? (confirmOrderProduct.appliedDiscount || 0) : discount;

    if (appliedPromoRate > 0 && appliedDiscountCode) {
      message += `*Promo Discount (${appliedDiscountCode}):* -৳${promoDiscountAmount.toFixed(0)}\n`;
    }

    if (bulkDiscountAmount > 0 || promoDiscountAmount > 0) {
      message += `*After Discounts:* ৳${(productPrice - bulkDiscountAmount - promoDiscountAmount).toFixed(0)}\n`;
    }

    message += `*Delivery Fee:* ৳${deliveryFee}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*FINAL TOTAL:* ৳${finalTotal.toFixed(0)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `💳 *Advance Payment:* ৳${(finalTotal / 2).toFixed(0)} (Half of total)`;

    const whatsappNumber = '8801335156146';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    // Reset form and clear cart if it was a cart order
    if (confirmOrderProduct.type === 'cart') {
      setCartItems([]);
    }
    setShowConfirmOrder(false);
    setConfirmOrderProduct(null);
    setCustomerName('');
    setCustomerPhone('');
    setPhoneError('');
    setCustomerAddress('');
    setDeliveryType('inside');
    setDiscount(0);
    setDiscountCode('');
    setDiscountInput('');
  };

  // Remove from cart
  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Update quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(index);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total: Total = Subtotal - Bulk Discount - Promo Discount
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const bulkDiscountAmount = subtotal * bulkDiscountRate;
    const promoDiscountAmount = subtotal * discount;
    return subtotal - bulkDiscountAmount - promoDiscountAmount;
  };

  // Calculate subtotal (before discount)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Open gift box modal
  const openGiftBoxModal = (product) => {
    setSelectedGiftBox(product);
    setGiftBoxColor(product.availableColors[0] || product.colors[0]);
    setGiftBoxQuantity(1);
    setSelectedGalleryImage(0);
    setSelectedImageIndex(0); // Initialize with first image selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#22223b] via-[#4a4e69] to-[#2b2d42]">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#ad8d60ff] via-[#c5a883] to-[#ad8d60ff] py-3 px-4 text-center">
        <p className="text-sm font-sans font-semibold tracking-wide" style={{ color: '#e9e3eaff' }}>
          Free Gift with 3000 Tk+ Shopping | Happy Shopping
        </p>
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 border-b border-white/20 bg-gradient-to-r from-[#eedfe3] via-[#d4c5cc] to-[#9a8c98]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => {
              setShowGiftBoxCollection(false);
              scrollToSection('home');
            }}>
              <img
                src="/assets/YUMORA.png"
                alt="Yumora Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Shop', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setShowGiftBoxCollection(false);
                    scrollToSection(item === 'Shop' ? 'shopcategory' : item.toLowerCase());
                  }}
                  className="font-sans font-medium transition-colors hover:text-[#c5a880]"
                  style={{ color: '#22223b' }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="font-sans font-medium transition-colors hover:text-[#c5a880]"
                style={{ color: '#22223b' }}
              >
                Privacy
              </button>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 transition-colors hover:text-[#c5a880]"
                style={{ color: '#22223b' }}
              >
                <ShoppingBag className="w-7 h-7" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xm font-bold rounded-full h-6 w-6 flex items-center justify-center font-san" style={{ backgroundColor: '#e63535ff', color: '#fff' }}>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 transition-colors hover:text-[#c5a880]"
                style={{ color: '#22223b' }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-white/20">
              {['Home', 'Shop', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setShowGiftBoxCollection(false);
                    scrollToSection(item === 'Shop' ? 'shopcategory' : item.toLowerCase());
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded-sm transition-colors font-sans font-medium"
                  style={{ color: '#22223b' }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsPrivacyOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded-sm transition-colors font-sans font-medium"
                style={{ color: '#22223b' }}
              >
                Privacy Policy
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Home View */}
      {!showGiftBoxCollection && (
        <>
          {/* Hero Section with Auto-Slider */}
          <section id="home" className="relative py-10 md:py-14 overflow-hidden">
            {/* Watermark Logo Background - Left Side, Smaller, 15% Opacity */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
              <img
                src="/assets/YUMORA.png"
                alt="Yumora Watermark"
                className="w-[500px] h-[500px] object-contain opacity-15"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Hero Slider with Split Layout */}
              <div className="relative min-h-[400px] md:min-h-[500px]">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      {/* Left Side - Content */}
                      <div className="space-y-8">
                        <p className="text-sm uppercase tracking-[0.3em] font-sans font-semibold" style={{ color: '#c5a880' }}>
                          {slide.title}
                        </p>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]" style={{ color: '#c5a880' }}>
                          {slide.headline}
                        </h2>

                        <p className="text-lg md:text-xl font-sans leading-relaxed" style={{ color: '#eedfe3', opacity: 0.9 }}>
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <a
                            href="#shop"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowGiftBoxCollection(false);
                              scrollToSection('shop');
                            }}
                            className="px-10 py-4 font-sans font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                            style={{ backgroundColor: '#c5a880', color: '#fff' }}
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>

                      {/* Right Side - Image with Gold Glow */}
                      <div className="relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(197, 168, 128, 0.3)' }}>
                          <img
                            src={slide.image}
                            alt={slide.headline}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-[#c5a880]/20 to-[#9a8c98]/20 flex items-center justify-center';
                              fallback.innerHTML = '<p style="color: #c5a880" class="text-4xl font-display font-bold">Yumora</p>';
                              e.target.parentElement.appendChild(fallback);
                            }}
                          />
                          {/* Gold Glow Border */}
                          <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: 'inset 0 0 40px rgba(197, 168, 128, 0.2)' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Slider Indicators */}
                <div className="flex justify-center lg:justify-start gap-2 mt-12">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'w-12' : 'w-8'
                      }`}
                      style={{ backgroundColor: index === currentSlide ? '#c5a880' : 'rgba(238, 223, 227, 0.3)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quick Category Navigation */}
          <section className="py-10 md:py-12" id='shopcategory'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tight" style={{ color: '#c5a880' }}>
                  Shop by Category
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                {/* Charm Mystery Box */}
                <button
                  onClick={() => scrollToShopSection('charm-mystery-box')}
                  className="group flex flex-col items-center space-y-2 md:space-y-3 transition-all duration-300 hover:scale-[1.02] focus:outline-none"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 md:border-4 border-[#c5a880]/40 shadow-lg group-hover:shadow-2xl group-hover:border-[#c5a880] transition-all duration-300">
                    <img
                      src="/assets/earring&locket11.png"
                      alt="Charm Mystery Box"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 bg-gradient-to-br from-[#c5a880]/20 to-[#9a8c98]/20 flex items-center justify-center';
                        fallback.innerHTML = '<span style="color: #c5a880" class="text-4xl md:text-6xl font-display font-bold">?</span>';
                        e.target.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                  <span className="font-sans font-medium text-sm md:text-base lg:text-lg text-center px-1 leading-tight" style={{ color: '#eedfe3' }}>
                    Charm Mystery Box
                  </span>
                </button>

                {/* Custom Gift Box */}
                <button
                  onClick={() => scrollToShopSection('custom-gift-box')}
                  className="group flex flex-col items-center space-y-2 md:space-y-3 transition-all duration-300 hover:scale-[1.02] focus:outline-none"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 md:border-4 border-[#c5a880]/40 shadow-lg group-hover:shadow-2xl group-hover:border-[#c5a880] transition-all duration-300">
                    <img
                      src="/assets/earring&locket01.png"
                      alt="Custom Gift Box"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 bg-gradient-to-br from-[#c5a880]/20 to-[#9a8c98]/20 flex items-center justify-center';
                        fallback.innerHTML = '<span style="color: #c5a880" class="text-4xl md:text-6xl font-display font-bold">🎁</span>';
                        e.target.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                  <span className="font-sans font-medium text-sm md:text-base lg:text-lg text-center px-1 leading-tight" style={{ color: '#eedfe3' }}>
                    Custom Gift Box
                  </span>
                </button>

                {/* Color Cup */}
                <button
                  onClick={() => scrollToShopSection('color-cup')}
                  className="group flex flex-col items-center space-y-2 md:space-y-3 transition-all duration-300 hover:scale-[1.02] focus:outline-none"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 md:border-4 border-[#c5a880]/40 shadow-lg group-hover:shadow-2xl group-hover:border-[#c5a880] transition-all duration-300">
                    <img
                      src="/assets/1earring&locket11.png"
                      alt="Color Cup"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 bg-gradient-to-br from-[#c5a880]/20 to-[#9a8c98]/20 flex items-center justify-center';
                        fallback.innerHTML = '<span style="color: #c5a880" class="text-4xl md:text-6xl font-display font-bold">🎨</span>';
                        e.target.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                  <span className="font-sans font-medium text-sm md:text-base lg:text-lg text-center px-1 leading-tight" style={{ color: '#eedfe3' }}>
                    Color Cup
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Products Section */}
      <section id="shop" className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] font-sans font-semibold mb-4" style={{ color: '#c5a880' }}>
              Our Collection
            </p>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#eedfe3' }}>
              Choose Your Mystery
            </h3>
            <p className="font-sans text-lg max-w-2xl mx-auto" style={{ color: '#eedfe3', opacity: 0.8 }}>
              Select from our three enchanting product types and customize your perfect gift
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            {/* 1. Charm Mystery Box */}
            <div id="charm-mystery-box" className="bg-white/10 backdrop-blur-xl rounded-sm p-6 md:p-10 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h4 className="text-3xl md:text-4xl font-san font-bold flex items-center gap-3" style={{ color: '#eedfe3' }}>
                    <IceCream className="w-10 h-10" style={{ color: '#c5a880' }} />
                    Charm Mystery Box
                  </h4>

                  <p className="font-sans leading-relaxed text-base" style={{ color: '#eedfe3', opacity: 0.8 }}>
                    Unlock the unknown with our curated mystery collection. Each scoop reveals treasures beyond imagination.
                  </p>

                  {/* Scoop Selector */}
                  <div className="font-san space-y-4">
                    <label className="font-sans font-semibold" style={{ color: '#eedfe3' }}>Select Scoops:</label>

                    <div className="grid grid-cols-3 gap-3">
                      {mysteryBoxOptions.map(option => (
                        <button
                          key={option.scoops}
                          onClick={() => {
                            setIsCustomScoops(false);
                            setMysteryBoxScoops(option.scoops);
                          }}
                          className={`p-4 rounded-l font-sans font-semibold text[60px] transition-all border-2 ${
                            !isCustomScoops && mysteryBoxScoops === option.scoops
                              ? 'text-white border-[#c5a880]'
                              : 'border-white/20 hover:border-[#c5a880]'
                          }`}
                          style={!isCustomScoops && mysteryBoxScoops === option.scoops
                            ? { backgroundColor: '#c5a880' }
                            : { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                        >
                          <div className="flex items-center justify-center gap-1 text-3xl font-san">
                            <IceCream className="w-6 h-6" />
                            {option.scoops}
                          </div>
                          <div className="flex items-baseline justify-center text-xl mt-1 opacity-80"><span>৳</span><span className="font-san">{option.price}</span></div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Number */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsCustomScoops(!isCustomScoops)}
                        className={`px-4 py-2 rounded-sm font-sans font-semibold transition-all border-2 flex items-center gap-2 ${
                          isCustomScoops
                            ? 'text-white border-[#c5a880]'
                            : 'border-white/20 hover:border-[#c5a880]'
                        }`}
                        style={isCustomScoops
                          ? { backgroundColor: '#c5a880' }
                          : { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                      >
                        <IceCream className="w-4 h-4" />
                        Custom
                      </button>
                      {isCustomScoops && (
                        <input
                          type="number"
                          min="1"
                          value={customScoops}
                          onChange={(e) => setCustomScoops(e.target.value)}
                          placeholder="Enter number"
                          className="flex-1 px-4 py-2 rounded-sm border-2 border-white/20 font-sans focus:outline-none"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={addMysteryBoxToCart}
                      className="flex-1 px-6 py-3.5 font-sans font-semibold rounded-sm transition-all duration-300 border-2 border-white/20 hover:border-[#c5a880] shadow-sm hover:shadow-md"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={buyNowMysteryBox}
                      className="flex-1 px-6 py-3.5 text-white font-sans font-semibold rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90"
                      style={{ backgroundColor: '#c5a880' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="relative aspect-square rounded-sm overflow-hidden border border-white/20 shadow-xl">
                  <img
                    src="/assets/earring&locket11.png"
                    alt="Mystery Box"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10';
                      fallback.innerHTML = '<span class="text-surface font-display text-6xl">?</span>';
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Custom Gift Box Gallery */}
            <div id="custom-gift-box" className="bg-white/10 backdrop-blur-xl rounded-sm p-6 md:p-10 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h4 className="text-3xl md:text-4xl font-display font-bold" style={{ color: '#eedfe3' }}>
                    Custom Gift Box
                  </h4>

                  <p className="font-sans leading-relaxed text-base" style={{ color: '#eedfe3', opacity: 0.8 }}>
                    Explore our exquisite collection of Gift Products. Each product is carefully curated to create the perfect gift.
                  </p>

                  {/* View Collection Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setShowGiftBoxCollection(true);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full lg:w-auto px-10 py-3.5 text-white font-sans font-semibold rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90"
                      style={{ backgroundColor: '#b1946aff' }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>

                <div className="relative aspect-square rounded-sm overflow-hidden border border-white/20 shadow-xl">
                  <img
                    src="/assets/earring&locket01.png"
                    alt="Gift Box Collection"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10';
                      fallback.innerHTML = '<span class="text-surface font-display text-6xl">🎁</span>';
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Mystery Color Cup */}
            <div id="color-cup" className="bg-white/10 backdrop-blur-xl rounded-sm p-6 md:p-10 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-white/20 shadow-xl order-2 lg:order-1">
                  <img
                    src="/assets/1earring&locket11.png"
                    alt="Color Cup"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10';
                      fallback.innerHTML = '<span class="text-surface font-display text-6xl">🎨</span>';
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <h4 className="text-3xl md:text-4xl font-display font-bold" style={{ color: '#eedfe3' }}>
                    Mystery Color Cup
                  </h4>

                  <p className="font-sans leading-relaxed text-base" style={{ color: '#eedfe3', opacity: 0.8 }}>
                    Choose your perfect shade from our vibrant collection. Each color tells a different story.
                  </p>

                  <p className="font-san font-semibold text-5xl flex items-baseline" style={{ color: '#c5a880' }}><span>৳ 12</span></p>

                  {/* Color Selector - Using Inline Styles for Build Safety */}
                  <div className="space-y-4">
                    <label className="font-sans font-semibold" style={{ color: '#eedfe3' }}>Select Color:</label>
                    <div className="grid grid-cols-3 gap-3">
                      {PRODUCT_COLORS.slice(0, 6).map(colorObj => {
                        const isAvailable = AVAILABLE_CUP_COLORS.includes(colorObj.name);
                        const textColor = getContrastColor(colorObj.hex);
                        const isSelected = cupColor === colorObj.name;

                        return (
                          <button
                            key={colorObj.name}
                            onClick={() => isAvailable && setCupColor(colorObj.name)}
                            disabled={!isAvailable}
                            className={`relative p-4 rounded-sm font-sans font-semibold transition-all ${
                              isAvailable ? 'hover:opacity-90' : 'cursor-not-allowed'
                            } ${isSelected ? 'ring-4 ring-[#c5a880]' : ''}`}
                            style={{
                              backgroundColor: isAvailable ? colorObj.hex : '#E5E7EB',
                              color: isAvailable ? textColor : '#9CA3AF',
                              border: colorObj.hex === '#FFFFFF' ? '1px solid #D1D5DB' : 'none'
                            }}
                          >
                            {colorObj.name}
                            {/* Selection checkmark */}
                            {isSelected && isAvailable && (
                              <div className="absolute top-1 right-1">
                                <svg
                                  className="w-5 h-5"
                                  fill={textColor}
                                  viewBox="0 0 20 20"
                                >
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                              </div>
                            )}
                            {/* Unavailable overlay */}
                            {!isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute w-full h-0.5 bg-gray-500 rotate-45" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs font-sans italic" style={{ color: '#eedfe3', opacity: 0.5 }}>
                      * Crossed out colors are currently unavailable
                    </p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="font-sans font-semibold block mb-2" style={{ color: '#eedfe3' }}>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={cupQuantity}
                      onChange={(e) => setCupQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 rounded-sm border-2 border-white/20 font-sans focus:outline-none"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={addColorCupToCart}
                      className="flex-1 px-6 py-3.5 font-sans font-semibold rounded-sm transition-all duration-300 border-2 border-white/20 hover:border-[#c5a880] shadow-sm hover:shadow-md"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={buyNowColorCup}
                      className="flex-1 px-6 py-3.5 text-white font-sans font-semibold rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90"
                      style={{ backgroundColor: '#c5a880' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/20 shadow-2xl">
              <img
                src="/assets/earring&locket11.png"
                alt="About Yumora"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center';
                  fallback.innerHTML = `
                    <div class="text-center p-8">
                      <h4 class="text-4xl font-display font-bold text-surface mb-4">Since 1985</h4>
                      <p class="text-surface/70 font-sans">Crafting Excellence</p>
                    </div>
                  `;
                  e.target.parentElement.appendChild(fallback);
                }}
              />
            </div>

            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] font-sans font-semibold" style={{ color: '#c5a880' }}>
                Our Heritage
              </p>

              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight" style={{ color: '#eedfe3' }}>
                A Legacy of
                <span className="block" style={{ color: '#c5a880' }}>Timeless Beauty</span>
              </h3>

              <div className="space-y-4 font-sans leading-relaxed" style={{ color: '#eedfe3', opacity: 0.8 }}>
                <p>
                  For generations, Yumora has been synonymous with exceptional craftsmanship and
                  unparalleled elegance. Our journey began with a simple vision: to create jewelry
                  that transcends fleeting trends and becomes cherished heirlooms.
                </p>
                <p>
                  Each piece in our collection is meticulously handcrafted by master artisans
                  who pour their passion and expertise into every detail. We source only the
                  finest materials, ensuring that every creation meets our exacting standards
                  of quality and beauty.
                </p>
              </div>

              <div className="font-san grid grid-cols-3 gap-6 pt-10">
                {[
                  { value: '38+', label: 'Years' },
                  { value: '50K+', label: 'Customers' },
                  { value: '100%', label: 'Handcrafted' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 rounded-sm bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <p className="text-4xl font-san mb-2" style={{ color: '#c5a880' }}>{stat.value}</p>
                    <p className="text-sm font-sans uppercase tracking-wide" style={{ color: '#eedfe3', opacity: 0.7 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Gift Box Collection View */}
      {showGiftBoxCollection && (
        <section className="min-h-screen pb-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            {/* Back Button */}
            <div className="mb-10">
              <button
                onClick={() => {
                  setShowGiftBoxCollection(false);
                  setTimeout(() => scrollToSection('shop'), 100);
                }}
                className="flex items-center gap-2 px-6 py-3 font-sans font-semibold rounded-sm border-2 border-white/20 hover:border-[#c5a880] transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>

            {/* Collection Header */}
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] font-sans font-semibold mb-4" style={{ color: '#c5a880' }}>
                Curated Collection
              </p>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight" style={{ color: '#eedfe3' }}>
                Custom Gift Box
              </h3>
              <p className="font-sans text-lg max-w-2xl mx-auto" style={{ color: '#eedfe3', opacity: 0.7 }}>
                Select 8 types of Product to build your own from premium Gift Box with our exquisite products.
                To Unlock Offers fill the product type bar.
              </p>
            </div>

            {/* ===== Split Layout Progress Bar ===== */}
            <div className="mb-10 rounded-lg px-6 sm:px-8 py-5 sm:py-6" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                {/* Left Side - Status Text */}
                <div className="md:w-[280px] flex-shrink-0">
                  <p className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-1" style={{ color: '#eedfe3' }}>
                    {giftBoxUniqueTypes >= TIER_2_TYPES
                      ? <><span className="font-san">{(TIER_2_DISCOUNT * 100).toFixed(0)}</span>% Bulk Discount Applied</>
                      : giftBoxUniqueTypes >= TIER_1_TYPES
                        ? <>Select <span className="font-san">{TIER_2_TYPES - giftBoxUniqueTypes}</span> more to unlock <span className="font-san">{(TIER_2_DISCOUNT * 100).toFixed(0)}</span>% off</>
                        : giftBoxUniqueTypes >= MIN_TYPES
                          ? <>Select <span className="font-san">{TIER_1_TYPES - giftBoxUniqueTypes}</span> more to unlock <span className="font-san">{(TIER_1_DISCOUNT * 100).toFixed(0)}</span>% off</>
                          : 'Build Your Custom Gift Box'
                    }
                  </p>
                  <p className="font-sans text-l" style={{ color: 'rgba(255, 255, 255, 0.93)' }}>
                    {giftBoxUniqueTypes < MIN_TYPES
                      ? <>Select minimum <span className="font-san">{MIN_TYPES}</span> types to purchase</>
                      : <><span className="font-san">{giftBoxUniqueTypes}</span> of <span className="font-san">{giftBoxProducts.length}</span> types selected</>
                    }
                  </p>
                  <div className="font-san font-bold text-3xl sm:text-4xl tracking-tight mt-2" style={{ color: '#8bd0e0' }}>
                    {giftBoxUniqueTypes}<span className="text-lg sm:text-xl font-semibold" style={{ color: 'rgba(238,223,227,0.4)' }}>/{giftBoxProducts.length}</span>
                  </div>
                </div>

                {/* Right Side - Wide Progress Bar */}
                <div className="flex-1 min-w-0">
                  {/* Numbers above bar */}
                  <div className="relative mb-1.5">
                    <div className="flex items-end" style={{ height: '28px' }}>
                      {[
                        { val: 1, label: '1' },
                        { val: MIN_TYPES, label: String(MIN_TYPES) },
                        { val: TIER_1_TYPES, label: String(TIER_1_TYPES) },
                        { val: TIER_2_TYPES, label: String(TIER_2_TYPES) }
                      ].map(marker => (
                        <div
                          key={marker.val}
                          className="absolute text-center"
                          style={{ left: `${(marker.val / giftBoxProducts.length) * 100}%`, transform: 'translateX(-50%)' }}
                        >
                          <span
                            className="font-san font-bold text-base sm:text-xl block leading-none"
                            style={{
                              color: giftBoxUniqueTypes >= marker.val ? '#eedfe3' : 'rgba(238,223,227,0.3)'
                            }}
                          >
                            {marker.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* The thick bar */}
                  <div className="relative w-full rounded-full overflow-hidden" style={{ height: '16px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    {/* Fill */}
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${Math.min((giftBoxUniqueTypes / giftBoxProducts.length) * 100, 100)}%`,
                        backgroundColor: '#8bd0e0',
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: giftBoxUniqueTypes > 0 ? '0 2px 8px rgba(139,208,224,0.4)' : 'none'
                      }}
                    />
                    {/* Tick marks */}
                    {[MIN_TYPES, TIER_1_TYPES, TIER_2_TYPES].map(tick => (
                      <div
                        key={tick}
                        className="absolute top-0 h-full"
                        style={{
                          left: `${(tick / giftBoxProducts.length) * 100}%`,
                          width: '3px',
                          backgroundColor: giftBoxUniqueTypes >= tick ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.48)'
                        }}
                      />
                    ))}
                  </div>

                  {/* Percentages below bar */}
                  <div className="relative mt-1.5" style={{ height: '22px' }}>
                    {[
                      { val: MIN_TYPES, label: '0%' },
                      { val: TIER_1_TYPES, label: `${(TIER_1_DISCOUNT * 100).toFixed(0)}%` },
                      { val: TIER_2_TYPES, label: `${(TIER_2_DISCOUNT * 100).toFixed(0)}%` }
                    ].map(marker => (
                      <div
                        key={marker.val}
                        className="absolute text-center"
                        style={{ left: `${(marker.val / giftBoxProducts.length) * 100}%`, transform: 'translateX(-50%)' }}
                      >
                        <span
                          className="font-sans font-bold text-xs sm:text-sm"
                          style={{ color: giftBoxUniqueTypes >= marker.val ? '#8bd0e0' : 'rgba(238, 223, 227, 0.59)' }}
                        >
                          {marker.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {giftBoxProducts.map(product => {
                const isInCart = cartItems.some(item => item.type === 'gift-box' && item.id.replace(/-[^-]+$/, '') === product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => product.inStock && openGiftBoxModal(product)}
                    className={`group relative bg-white/10 backdrop-blur-xl rounded-sm overflow-hidden border shadow-lg transition-all duration-300 ${
                      product.inStock
                        ? `cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${isInCart ? 'border-[#8bd0e0]/60 ring-2 ring-[#8bd0e0]/30' : 'border-white/20 hover:border-[#c5a880]'}`
                        : 'opacity-50 cursor-not-allowed border-white/10'
                    }`}
                  >
                    {isInCart && (
                      <div className="absolute top-2.5 right-2.5 z-10 rounded-full p-1.5" style={{ backgroundColor: '#8bd0e0' }}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          product.inStock ? 'group-hover:scale-110' : 'grayscale'
                        }`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10';
                          fallback.innerHTML = `<span style="color: #c5a880" class="font-display text-4xl font-bold">${product.name[0]}</span>`;
                          e.target.parentElement.appendChild(fallback);
                        }}
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="font-sans font-bold text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.9)' }}>Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 md:p-4">
                      <h5 className="font-san font-bold text-base md:text-[23px] truncate mb-1 leading-tight tracking-tight" style={{ color: '#eedfe3' }}>{product.name}</h5>
                      <p className="font-san font-bold text-xl md:text-2xl flex items-baseline tracking-tight" style={{ color: '#c5a880' }}>
                        <span className="text-base md:text-lg mr-0.5 font-display" style={{ color: '#c5a880', opacity: 0.8 }}>৳</span>
                        <span>{product.price}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Global Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(197,168,128,0.5)] flex items-center justify-center group"
          style={{ backgroundColor: '#c5a880' }}
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 text-white transition-transform group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-br from-[#eedfe3] via-[#c5a880] to-[#9a8c98] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="/assets/YUMORA.png"
                  alt="Yumora Logo"
                  className="h-32 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#22223b', opacity: 0.8 }}>
                Timeless elegance since 2025. Premium Gifts for those who appreciate the finer things.
              </p>
            </div>

            <div>
              <h6 className="font-sans font-semibold text-lg mb-4" style={{ color: '#22223b' }}>Quick Links</h6>
              <ul className="space-y-2 font-sans text-sm">
                {['Home', 'Shop', 'About'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setShowGiftBoxCollection(false);
                        setTimeout(() => scrollToSection(item.toLowerCase()), 100);
                      }}
                      className="transition-colors hover:text-[#4a4e69]"
                      style={{ color: '#22223b', opacity: 0.8 }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setIsPrivacyOpen(true)}
                    className="transition-colors hover:text-[#4a4e69]"
                    style={{ color: '#22223b', opacity: 0.8 }}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-sans font-semibold text-lg mb-4" style={{ color: '#22223b' }}>Contact</h6>
              <ul className="space-y-3 font-sans text-sm">
                <li className="flex items-start space-x-3" style={{ color: '#22223b', opacity: 0.8 }}>
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#4a4e69' }} />
                  <span>Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-3" style={{ color: '#22223b', opacity: 0.8 }}>
                  <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#4a4e69' }} />
                  <span>+880 1335 156146</span>
                </li>
                <li className="flex items-center space-x-3" style={{ color: '#22223b', opacity: 0.8 }}>
                  <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#4a4e69' }} />
                  <span>yumorabd@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-sans font-semibold text-lg mb-4" style={{ color: '#22223b' }}>Connect With Us</h6>
              <div className="flex space-x-4">
                {/* Instagram - UPDATE YOUR INSTAGRAM LINK HERE */}
                <a
                  href="https://www.instagram.com/yumorabd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-[#22223b]/20 flex items-center justify-center transition-colors"
                  style={{ color: '#22223b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b52c67ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 34, 59, 0.2)'}
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* Facebook - UPDATE YOUR FACEBOOK LINK HERE */}
                <a
                  href="https://www.facebook.com/yumorabd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-[#22223b]/20 flex items-center justify-center transition-colors"
                  style={{ color: '#22223b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3f4eb1ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 34, 59, 0.2)'}
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* WhatsApp - Connected to your WhatsApp number */}
                <a
                  href="https://wa.me/8801335156146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-[#22223b]/20 flex items-center justify-center transition-colors"
                  style={{ color: '#22223b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20b758ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 34, 59, 0.2)'}
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                {/* Email - Connected to your email */}
                <a
                  href="mailto:yumorabd@gmail.com"
                  className="w-10 h-10 rounded-sm bg-[#22223b]/20 flex items-center justify-center transition-colors"
                  style={{ color: '#22223b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c62828ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 34, 59, 0.2)'}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#22223b]/20 pt-8 text-center">
            <p className="font-sans text-sm" style={{ color: '#040405ff', opacity: 0.6 }}>
              © 2025 Yumora by <a href="https://github.com/msabrin" target="_blank" rel="noopener noreferrer"> <strong>Mirza Sabrin</strong></a> .All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Gift Box Detail Modal */}
      {selectedGiftBox && (
        <div className="fixed inset-0 z-[110] overflow-y-auto flex items-start md:items-center justify-center p-4 bg-surface/70 backdrop-blur-lg">
          <div className="relative bg-white rounded-sm shadow-2xl max-w-4xl w-full border-2 border-primary/20 my-4 md:my-0 max-h-[90vh] overflow-y-auto">
            {/* Progress bar inside modal - Split Layout */}
            <div className="sticky top-0 z-20 border-b" style={{ backgroundColor: '#fafbfc', borderColor: '#e5e7eb' }}>
              <div className="px-4 sm:px-6 md:px-10 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  {/* Left Side - Status Text */}
                  <div className="sm:w-[180px] flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
                    <p className="font-san font-semibold text-xl tracking-tight" style={{ color: '#000000ff' }}>
                      {giftBoxUniqueTypes < MIN_TYPES
                        ? <><span className="">{MIN_TYPES - giftBoxUniqueTypes}</span> more type{MIN_TYPES - giftBoxUniqueTypes !== 1 ? 's' : ''} needed</>
                        : giftBoxUniqueTypes < TIER_1_TYPES
                          ? <><span className="font-san">{TIER_1_TYPES - giftBoxUniqueTypes}</span> more for <span className="font-san">{(TIER_1_DISCOUNT * 100).toFixed(0)}</span>% off</>
                          : giftBoxUniqueTypes < TIER_2_TYPES
                            ? <><span className="font-san">{TIER_2_TYPES - giftBoxUniqueTypes}</span> more for <span className="font-san">{(TIER_2_DISCOUNT * 100).toFixed(0)}</span>% off</>
                            : <><span className="font-san">{(TIER_2_DISCOUNT * 100).toFixed(0)}</span>% Discount Applied</>
                      }
                    </p>
                    <span className="font-san font-bold text-lg tracking-tight" style={{ color: '#22223b' }}>
                      {giftBoxUniqueTypes}<span className="text-xs font-semibold" style={{ color: '#7d838dff', fontFamily: 'Outfit, sans-serif' }}>/{giftBoxProducts.length}</span>
                    </span>
                  </div>

                  {/* Right Side - Progress Bar */}
                  <div className="flex-1 min-w-0">
                    <div className="relative w-full rounded-full overflow-hidden" style={{ height: '15px', backgroundColor: '#f1f5f9' }}>
                      <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          width: `${Math.min((giftBoxUniqueTypes / giftBoxProducts.length) * 100, 100)}%`,
                          backgroundColor: '#8bd0e0',
                          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                      {[MIN_TYPES, TIER_1_TYPES, TIER_2_TYPES].map(tick => (
                        <div
                          key={tick}
                          className="absolute top-0 h-full"
                          style={{
                            left: `${(tick / giftBoxProducts.length) * 100}%`,
                            width: '2px',
                            backgroundColor: giftBoxUniqueTypes >= tick ? 'rgba(167, 162, 162, 0.82)' : 'rgba(0,0,0,0.08)'
                          }}
                        />
                      ))}
                    </div>
                    {/* Compact percentages below */}
                    <div className="relative mt-1" style={{ height: '20px' }}>
                      {[
                        { val: MIN_TYPES, label: '0%' },
                        { val: TIER_1_TYPES, label: `${(TIER_1_DISCOUNT * 100).toFixed(0)}%` },
                        { val: TIER_2_TYPES, label: `${(TIER_2_DISCOUNT * 100).toFixed(0)}%` }
                      ].map(marker => (
                        <div
                          key={marker.val}
                          className="absolute text-center"
                          style={{ left: `${(marker.val / giftBoxProducts.length) * 100}%`, transform: 'translateX(-50%)' }}
                        >
                          <span
                            className="font-sans font-bold text-[13px]"
                            style={{ color: giftBoxUniqueTypes >= marker.val ? '#8bd0e0' : '#9ca3af' }}
                          >
                            {marker.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedGiftBox(null)}
              className="absolute top-16 right-4 md:top-[72px] md:right-6 z-20 p-2 hover:bg-primary/10 rounded-sm transition-colors bg-white/80"
            >
              <X className="w-6 h-6 text-surface" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10">
              {/* Left - Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square rounded-sm overflow-hidden border border-primary/20 shadow-lg">
                  <img
                    src={selectedGiftBox.images ? selectedGiftBox.images[selectedGalleryImage] : selectedGiftBox.image}
                    alt={selectedGiftBox.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10';
                      fallback.innerHTML = `<span class="text-surface font-display text-6xl font-bold">${selectedGiftBox.name[0]}</span>`;
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>

                {/* Thumbnails */}
                {selectedGiftBox.images && selectedGiftBox.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedGiftBox.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedGalleryImage(index);
                          setSelectedImageIndex(index); // Also mark as selected
                        }}
                        className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                          selectedGalleryImage === index
                            ? 'border-primary shadow-lg'
                            : 'border-primary/20 hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedGiftBox.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Selected indicator */}
                        {selectedImageIndex === index && (
                          <div className="absolute top-1 right-1 bg-primary rounded-full p-1 shadow-lg">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-surface mb-2 tracking-tight">
                      {selectedGiftBox.name}
                    </h3>
                    <p className="text-3xl sm:text-4xl font-san font-bold text-primary flex items-baseline tracking-tight">
                      <span className="text-xl sm:text-2xl mr-1 font-display" style={{ opacity: 0.8 }}>৳</span><span>{selectedGiftBox.price}</span>
                    </p>
                    {!selectedGiftBox.inStock && (
                      <p className="text-sm font-sans text-red-600 mt-2 font-semibold">
                        Currently Sold Out
                      </p>
                    )}
                    {/* Product Description */}
                    {selectedGiftBox.description && (
                      <p className="text-sm font-sans text-surface/70 mt-4 leading-relaxed">
                        {selectedGiftBox.description}
                      </p>
                    )}
                  </div>

                  {/* Color Selection - Using Inline Styles for Build Safety */}
                  <div>
                    <label className="text-surface font-sans font-semibold block mb-3">
                      Select Color:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedGiftBox.colors.map(colorName => {
                        const isAvailable = selectedGiftBox.availableColors.includes(colorName);
                        const colorObj = getColorByName(colorName);
                        const textColor = getContrastColor(colorObj.hex);
                        const isSelected = giftBoxColor === colorName;
                        const isDisabled = !isAvailable || !selectedGiftBox.inStock;

                        return (
                          <button
                            key={colorName}
                            onClick={() => isAvailable && setGiftBoxColor(colorName)}
                            disabled={isDisabled}
                            className={`relative p-4 rounded-sm font-sans font-semibold transition-all ${
                              !isDisabled ? 'hover:opacity-90' : 'cursor-not-allowed'
                            } ${isSelected && !isDisabled ? 'ring-4 ring-[#c5a880]' : ''}`}
                            style={{
                              backgroundColor: !isDisabled ? colorObj.hex : '#E5E7EB',
                              color: !isDisabled ? textColor : '#9CA3AF',
                              border: colorObj.hex === '#FFFFFF' && !isDisabled ? '1px solid #D1D5DB' : 'none'
                            }}
                          >
                            {colorName}
                            {/* Selection checkmark */}
                            {isSelected && !isDisabled && (
                              <div className="absolute top-1 right-1">
                                <svg
                                  className="w-5 h-5"
                                  fill={textColor}
                                  viewBox="0 0 20 20"
                                >
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                              </div>
                            )}
                            {/* Unavailable overlay */}
                            {!isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute w-full h-0.5 bg-gray-500 rotate-45" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-surface/50 font-sans italic mt-2">
                      * Crossed out colors are currently unavailable
                    </p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-surface font-sans font-semibold block mb-2">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={giftBoxQuantity}
                      onChange={(e) => setGiftBoxQuantity(parseInt(e.target.value) || 1)}
                      disabled={!selectedGiftBox.inStock}
                      className="w-full px-4 py-3 rounded-sm bg-white border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={addGiftBoxToCart}
                    disabled={!selectedGiftBox.inStock}
                    className={`w-full px-6 py-4 font-sans font-bold text-lg rounded-sm transition-all border-2 ${
                      selectedGiftBox.inStock
                        ? 'bg-primary text-white hover:bg-surface border-primary'
                        : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {selectedGiftBox.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>
                  {/* Go To Cart - appears only when 8+ unique types selected */}
                  {selectedGiftBox.inStock && giftBoxMeetsMinimum && (
                    <button
                      onClick={() => {
                        setSelectedGiftBox(null);
                        setIsCartOpen(true);
                      }}
                      className="w-full px-6 py-4 font-sans font-bold text-lg rounded-sm transition-all flex items-center justify-center gap-3 hover:opacity-90"
                      style={{ backgroundColor: '#c5a880', color: '#ffffff' }}
                    >
                      <ShoppingBag className="w-6 h-6" />
                      Go To Cart — <span className="font-san">{giftBoxUniqueTypes}</span> Types Selected
                    </button>
                  )}
                  {selectedGiftBox.inStock && !giftBoxMeetsMinimum && (
                    <p className="text-sm text-center font-sans font-semibold" style={{ color: '#6b7280' }}>
                      Select <span className="font-san">{MIN_TYPES - giftBoxUniqueTypes}</span> more type{MIN_TYPES - giftBoxUniqueTypes !== 1 ? 's' : ''} to proceed — <span className="font-san">{giftBoxUniqueTypes}/{MIN_TYPES}</span> selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-surface/60 backdrop-blur-md"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl border-l-2 border-primary/20">
            <div className="h-full flex flex-col">
              <div className="px-6 py-6 border-b border-primary/20 flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold text-surface">Shopping Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-sm transition-colors"
                >
                  <X className="w-6 h-6 text-surface" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-primary/30" />
                    <p className="text-surface/60 font-sans">Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-primary text-white font-sans font-semibold rounded-sm hover:bg-surface transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-light/30 rounded-sm border border-primary/10"
                      >
                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-sm overflow-hidden border border-primary/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full flex items-center justify-center bg-primary/10';
                              fallback.innerHTML = `<span class="text-primary font-display text-xl font-bold">${item.name[0]}</span>`;
                              e.target.parentElement.appendChild(fallback);
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-surface truncate">
                            {item.name}
                          </h4>
                          {item.scoops && (
                            <p className="text-xs text-surface/60 font-sans">{item.scoops} Scoops</p>
                          )}
                          {item.color && (
                            <p className="text-xs text-surface/60 font-sans">Color: {item.color}</p>
                          )}
                          <p className="text-primary font-sans font-bold mt-1">
                            ৳<span className="font-san">{item.price}</span> × <span className="font-san">{item.quantity}</span>
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-7 h-7 rounded-sm bg-white border border-primary/20 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm font-bold"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-san font-semibold text-surface">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-7 h-7 rounded-sm bg-white border border-primary/20 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-surface/40 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-primary/20 px-6 py-6 space-y-4">
                  {/* Discount Code Section */}
                  <div className="space-y-2">
                    <label className="text-surface font-sans font-semibold text-sm">Discount Code:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        disabled={!!discountCode}
                        className="flex-1 px-4 py-2 rounded-sm border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      {!discountCode ? (
                        <button
                          onClick={() => {
                            if (applyDiscountCode(discountInput)) {
                              setDiscountInput('');
                            }
                          }}
                          className="px-6 py-2 bg-primary text-white font-sans font-semibold rounded-sm hover:bg-surface transition-colors"
                        >
                          Apply
                        </button>
                      ) : (
                        <button
                          onClick={removeDiscount}
                          className="px-6 py-2 bg-red-500 text-white font-sans font-semibold rounded-sm hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {discountCode && (
                      <p className="text-xs text-green-600 font-sans font-semibold">
                        Code "{discountCode}" applied - <span className="font-san">{(discount * 100).toFixed(0)}</span>% off
                      </p>
                    )}
                  </div>

                  {/* Subtotal and Total */}
                  {(discount > 0 || bulkDiscountRate > 0) && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans text-surface/70">Subtotal:</span>
                      <span className="font-sans text-surface/70">
                        ৳<span className="font-san">{calculateSubtotal().toFixed(2)}</span>
                      </span>
                    </div>
                  )}
                  {bulkDiscountRate > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans text-surface/70">Bulk Discount (<span className="font-san">{(bulkDiscountRate * 100).toFixed(0)}</span>%):</span>
                      <span className="font-sans text-green-600 font-semibold">
                        -৳<span className="font-san">{(calculateSubtotal() * bulkDiscountRate).toFixed(2)}</span>
                      </span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans text-surface/70">Promo Discount (<span className="font-san">{(discount * 100).toFixed(0)}</span>%):</span>
                      <span className="font-sans text-green-600 font-semibold">
                        -৳<span className="font-san">{(calculateSubtotal() * discount).toFixed(2)}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg border-t border-primary/20 pt-4">
                    <span className="font-sans font-semibold text-surface">Total:</span>
                    <span className="font-san font-bold text-2xl text-primary">
                      ৳{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-center text-surface/60 font-sans italic">
                    * Delivery charge will be added at checkout
                  </p>

                  {/* Gift Box minimum types warning */}
                  {hasGiftBoxItems && !giftBoxMeetsMinimum && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-3">
                      <p className="text-xs font-sans text-yellow-800 font-medium text-center">
                        Add at least <span className="font-san">{MIN_TYPES}</span> different product types to complete your Custom Gift Box. (<span className="font-san">{giftBoxUniqueTypes}/{MIN_TYPES}</span> types added)
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (cartItems.length === 0) {
                        alert('Your cart is empty');
                        return;
                      }
                      // Create a combined product for cart checkout
                      const cartTotal = calculateTotal();
                      const itemsSummary = cartItems.map(item => {
                        let name = item.name;
                        if (item.scoops) name += ` (${item.scoops} Scoops)`;
                        if (item.color) name += ` - ${item.color}`;
                        return `${name} x${item.quantity}`;
                      }).join(', ');

                      setConfirmOrderProduct({
                        name: itemsSummary,
                        price: cartTotal,
                        type: 'cart',
                        quantity: 1,
                        image: cartItems[0]?.image || '/assets/YUMORA.png',
                        cartItems: [...cartItems],
                        originalSubtotal: calculateSubtotal(),
                        appliedDiscount: discount,
                        appliedDiscountCode: discountCode,
                        appliedBulkDiscount: bulkDiscountRate,
                        uniqueGiftTypes: giftBoxUniqueTypes
                      });
                      setIsCartOpen(false);
                      setShowConfirmOrder(true);
                    }}
                    disabled={hasGiftBoxItems && !giftBoxMeetsMinimum}
                    className={`w-full py-4 font-sans font-bold rounded-sm transition-colors flex items-center justify-center gap-2 ${
                      hasGiftBoxItems && !giftBoxMeetsMinimum
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-surface'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Buy Now
                  </button>
                  <p className="text-xs text-center text-surface/60 font-sans">
                    Proceed to checkout with delivery options
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Buy Now Discount Code Modal */}
      {showBuyNowModal && buyNowProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-surface/70 backdrop-blur-lg">
          <div className="relative bg-white rounded-sm shadow-2xl max-w-md w-full border-2 border-primary/20">
            <button
              onClick={() => {
                setShowBuyNowModal(false);
                setBuyNowProduct(null);
              }}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-primary/10 rounded-sm transition-colors"
            >
              <X className="w-6 h-6 text-surface" />
            </button>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold text-surface mb-2">
                  Quick Purchase
                </h3>
                <p className="text-sm font-sans text-surface/70">
                  Do you have a discount code?
                </p>
              </div>

              {/* Product Summary */}
              <div className="bg-light/30 rounded-sm p-4 border border-primary/10">
                <h4 className="font-sans font-semibold text-surface mb-2">
                  {buyNowProduct.name}
                </h4>
                <p className="text-2xl font-san font-bold text-primary">
                  ৳{buyNowProduct.price}
                </p>
              </div>

              {/* Discount Code Input */}
              <div className="space-y-2">
                <label className="text-surface font-sans font-semibold text-sm">Discount Code (Optional):</label>
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                  placeholder="Enter discount code"
                  className="w-full px-4 py-3 rounded-sm border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (discountInput.trim()) {
                      applyDiscountCode(discountInput);
                    }
                    // Add to cart and open cart
                    if (buyNowProduct.type === 'mystery-box') {
                      addMysteryBoxToCart();
                    } else if (buyNowProduct.type === 'color-cup') {
                      addColorCupToCart();
                    } else if (buyNowProduct.type === 'gift-box') {
                      addGiftBoxToCart();
                    }
                    setShowBuyNowModal(false);
                    setBuyNowProduct(null);
                    setDiscountInput('');
                    setTimeout(() => setIsCartOpen(true), 300);
                  }}
                  className="w-full px-6 py-4 bg-primary text-white font-sans font-bold rounded-sm hover:bg-surface transition-colors"
                >
                  Submit & Continue
                </button>
                <button
                  onClick={() => {
                    // Skip discount and proceed
                    if (buyNowProduct.type === 'mystery-box') {
                      addMysteryBoxToCart();
                    } else if (buyNowProduct.type === 'color-cup') {
                      addColorCupToCart();
                    } else if (buyNowProduct.type === 'gift-box') {
                      addGiftBoxToCart();
                    }
                    setShowBuyNowModal(false);
                    setBuyNowProduct(null);
                    setDiscountInput('');
                    setTimeout(() => setIsCartOpen(true), 300);
                  }}
                  className="w-full px-6 py-4 bg-white text-surface font-sans font-semibold rounded-sm border-2 border-primary/20 hover:border-primary transition-colors"
                >
                  Skip & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Order Modal */}
      {showConfirmOrder && confirmOrderProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start md:items-center justify-center px-3 py-4 sm:p-4 bg-surface/70 backdrop-blur-lg">
          <div className="relative bg-white rounded-sm shadow-2xl max-w-lg w-full border-2 border-primary/20 my-2 md:my-0 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowConfirmOrder(false);
                setConfirmOrderProduct(null);
                setCustomerName('');
                setCustomerPhone('');
                setPhoneError('');
                setCustomerAddress('');
                setDeliveryType('inside');
              }}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 hover:bg-primary/10 rounded-sm transition-colors bg-white/80"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-surface" />
            </button>

            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold text-surface mb-2">
                  Confirm Your Order
                </h3>
                <p className="text-sm font-sans text-surface/70">
                  Please fill in your details to complete the order
                </p>
              </div>

              {/* Product Summary */}
              <div className="bg-light/30 rounded-sm p-4 border border-primary/10">
                {confirmOrderProduct.type === 'cart' && confirmOrderProduct.cartItems ? (
                  // Cart items display
                  <div className="space-y-3">
                    <h4 className="font-sans font-semibold text-surface border-b border-primary/10 pb-2">
                      Cart Items ({confirmOrderProduct.cartItems.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {confirmOrderProduct.cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <div className="w-12 h-12 flex-shrink-0 bg-white rounded-sm overflow-hidden border border-primary/10">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-sans text-surface truncate">{item.name}</p>
                            <p className="text-xs text-surface/60">
                              {item.color && `${item.color} • `}
                              {item.scoops && `${item.scoops} Scoops • `}
                              Qty: <span className="font-san">{item.quantity}</span>
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-primary">৳<span className="font-san">{item.price * item.quantity}</span></p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-primary/10 pt-2 flex justify-between">
                      <span className="font-sans font-semibold text-surface">Subtotal:</span>
                      <span className="font-san font-bold text-primary">৳{confirmOrderProduct.originalSubtotal}</span>
                    </div>
                    {confirmOrderProduct.appliedBulkDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-surface/70">Bulk Discount (<span className="font-san">{(confirmOrderProduct.appliedBulkDiscount * 100).toFixed(0)}</span>%):</span>
                        <span className="text-green-600 font-semibold">-৳<span className="font-san">{(confirmOrderProduct.originalSubtotal * confirmOrderProduct.appliedBulkDiscount).toFixed(0)}</span></span>
                      </div>
                    )}
                    {confirmOrderProduct.appliedDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-surface/70">Promo Discount ({confirmOrderProduct.appliedDiscountCode}):</span>
                        <span className="text-green-600 font-semibold">-৳<span className="font-san">{(confirmOrderProduct.originalSubtotal * confirmOrderProduct.appliedDiscount).toFixed(0)}</span></span>
                      </div>
                    )}
                  </div>
                ) : (
                  // Single product display
                  <div className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-sm overflow-hidden border border-primary/10">
                      <img
                        src={confirmOrderProduct.image}
                        alt={confirmOrderProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-sans font-semibold text-surface">
                        {confirmOrderProduct.name}
                      </h4>
                      {confirmOrderProduct.scoops && (
                        <p className="text-xs text-surface/60 font-sans">{confirmOrderProduct.scoops} Scoops</p>
                      )}
                      {confirmOrderProduct.color && (
                        <p className="text-xs text-surface/60 font-sans">Color: {confirmOrderProduct.color}</p>
                      )}
                      <p className="text-xs text-surface/60 font-sans">Qty: <span className="font-san">{confirmOrderProduct.quantity}</span></p>
                      <p className="text-lg font-san font-bold text-primary mt-1">
                        ৳{confirmOrderProduct.price * confirmOrderProduct.quantity}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Code Input - Only show for non-cart orders */}
              {confirmOrderProduct.type !== 'cart' && (
              <div className="space-y-2">
                <label className="text-surface font-sans font-semibold text-sm">Discount Code (Optional):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    disabled={!!discountCode}
                    className="flex-1 px-4 py-2 rounded-sm border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {!discountCode ? (
                    <button
                      onClick={() => {
                        if (applyDiscountCode(discountInput)) {
                          setDiscountInput('');
                        }
                      }}
                      className="px-4 py-2 bg-primary text-white font-sans font-semibold rounded-sm hover:bg-surface transition-colors"
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={removeDiscount}
                      className="px-4 py-2 bg-red-500 text-white font-sans font-semibold rounded-sm hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {discountCode && (
                  <p className="text-xs text-green-600 font-sans font-semibold">
                    Code "{discountCode}" applied - <span className="font-san">{(discount * 100).toFixed(0)}</span>% off
                  </p>
                )}
              </div>
              )}

              {/* Customer Details */}
              <div className="space-y-4">
                <h4 className="font-sans font-semibold text-surface border-b border-primary/20 pb-2">Customer Details</h4>

                <div className="space-y-2">
                  <label className="text-surface font-sans font-semibold text-sm">Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-sm border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-surface font-sans font-semibold text-sm">Phone Number *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                      setCustomerPhone(value);
                      if (value.length === 11 && !validateBDPhone(value)) {
                        setPhoneError('Please enter a valid Bangladeshi number (01X-XXXXXXXX)');
                      } else if (value.length > 0 && value.length < 11) {
                        setPhoneError('Phone number must be 11 digits');
                      } else {
                        setPhoneError('');
                      }
                    }}
                    placeholder="01XXXXXXXXX"
                    maxLength={11}
                    className={`w-full px-4 py-3 rounded-sm border-2 text-surface font-sans focus:outline-none ${
                      phoneError ? 'border-red-400 focus:border-red-500' : 'border-primary/20 focus:border-primary'
                    }`}
                  />
                  {phoneError && (
                    <p className="text-xs text-red-500 font-sans">{phoneError}</p>
                  )}
                  <p className="text-xs text-surface/50 font-sans">Valid prefixes: 013, 014, 015, 016, 017, 018, 019</p>
                </div>

                <div className="space-y-2">
                  <label className="text-surface font-sans font-semibold text-sm">Full Address *</label>
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                    className="w-full px-4 py-3 rounded-sm border-2 border-primary/20 text-surface font-sans focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Delivery Selection */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-sans font-semibold text-surface text-sm sm:text-base border-b border-primary/20 pb-2">Delivery Location</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setDeliveryType('inside')}
                    className={`p-3 sm:p-4 rounded-sm border-2 transition-all ${
                      deliveryType === 'inside'
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    <p className="font-sans font-semibold text-surface text-xs sm:text-sm">Inside Dhaka</p>
                    <p className="text-primary font-san font-bold text-base sm:text-lg">৳{DELIVERY_INSIDE_DHAKA}</p>
                  </button>
                  <button
                    onClick={() => setDeliveryType('outside')}
                    className={`p-3 sm:p-4 rounded-sm border-2 transition-all ${
                      deliveryType === 'outside'
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    <p className="font-sans font-semibold text-surface text-xs sm:text-sm">Outside Dhaka</p>
                    <p className="text-primary font-san font-bold text-base sm:text-lg">৳{DELIVERY_OUTSIDE_DHAKA}</p>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-light/30 rounded-sm p-4 border border-primary/10 space-y-2">
                {confirmOrderProduct.type === 'cart' ? (
                  // Cart order price breakdown
                  (() => {
                    const sub = confirmOrderProduct.originalSubtotal;
                    const bulkRate = confirmOrderProduct.appliedBulkDiscount || 0;
                    const promoRate = confirmOrderProduct.appliedDiscount || 0;
                    const bulkAmt = sub * bulkRate;
                    const promoAmt = sub * promoRate;
                    const total = sub - bulkAmt - promoAmt + getDeliveryFee();
                    return (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="font-sans text-surface/70">Subtotal:</span>
                          <span className="font-sans text-surface">৳<span className="font-san">{sub}</span></span>
                        </div>
                        {bulkRate > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="font-sans text-surface/70">Bulk Discount (<span className="font-san">{(bulkRate * 100).toFixed(0)}</span>%):</span>
                            <span className="font-sans text-green-600 font-semibold">-৳<span className="font-san">{bulkAmt.toFixed(0)}</span></span>
                          </div>
                        )}
                        {promoRate > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="font-sans text-surface/70">Promo Discount ({confirmOrderProduct.appliedDiscountCode}):</span>
                            <span className="font-sans text-green-600 font-semibold">-৳<span className="font-san">{promoAmt.toFixed(0)}</span></span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="font-sans text-surface/70">Delivery Fee:</span>
                          <span className="font-sans text-surface">৳<span className="font-san">{getDeliveryFee()}</span></span>
                        </div>
                        <div className="flex justify-between text-lg border-t border-primary/20 pt-2 mt-2">
                          <span className="font-sans font-semibold text-surface">Total:</span>
                          <span className="font-san font-bold text-primary">
                            ৳{total.toFixed(0)}
                          </span>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  // Single product price breakdown
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-surface/70">Product Price:</span>
                      <span className="font-sans text-surface">৳<span className="font-san">{confirmOrderProduct.price * confirmOrderProduct.quantity}</span></span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="font-sans text-surface/70">Discount (<span className="font-san">{(discount * 100).toFixed(0)}</span>%):</span>
                        <span className="font-sans text-green-600 font-semibold">-৳<span className="font-san">{(confirmOrderProduct.price * confirmOrderProduct.quantity * discount).toFixed(0)}</span></span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-surface/70">Delivery Fee:</span>
                      <span className="font-sans text-surface">৳<span className="font-san">{getDeliveryFee()}</span></span>
                    </div>
                    <div className="flex justify-between text-lg border-t border-primary/20 pt-2 mt-2">
                      <span className="font-sans font-semibold text-surface">Total:</span>
                      <span className="font-san font-bold text-primary">
                        ৳{((confirmOrderProduct.price * confirmOrderProduct.quantity * (1 - discount)) + getDeliveryFee()).toFixed(0)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Payment Information */}
              <div className="space-y-3">
                <h4 className="font-sans font-semibold text-surface border-b border-primary/20 pb-2">Payment Information</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
                  <p className="text-sm font-sans text-yellow-800 font-medium">
                    Advance payment of half the total cost and send us the Screenshort(৳<span className="font-san">{confirmOrderProduct.type === 'cart'
                      ? (((confirmOrderProduct.originalSubtotal - (confirmOrderProduct.originalSubtotal * (confirmOrderProduct.appliedBulkDiscount || 0)) - (confirmOrderProduct.originalSubtotal * (confirmOrderProduct.appliedDiscount || 0))) + getDeliveryFee()) / 2).toFixed(0)
                      : (((confirmOrderProduct.price * confirmOrderProduct.quantity * (1 - discount)) + getDeliveryFee()) / 2).toFixed(0)
                    }</span>) is required to confirm the order.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'Bkash', number: paymentNumbers.bkash, color: 'bg-pink-500' },
                    { name: 'Nagad', number: paymentNumbers.nagad, color: 'bg-orange-500' },
                    { name: 'Rocket', number: paymentNumbers.rocket, color: 'bg-purple-500' }
                  ].map((payment) => (
                    <div key={payment.name} className="flex items-center justify-between p-3 bg-white border border-primary/10 rounded-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${payment.color} rounded-sm flex items-center justify-center`}>
                          <span className="text-white font-bold text-xs">{payment.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-sans font-semibold text-surface text-sm">{payment.name}</p>
                          <p className="font-sans text-surface/70 text-sm">{payment.number}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(payment.number, payment.name)}
                        className={`p-2 rounded-sm transition-all ${
                          copiedNumber === payment.name
                            ? 'bg-green-500 text-white'
                            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {copiedNumber === payment.name ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Button with safety catch */}
              {(() => {
                // Safety catch: re-check unique gift box types from live cart
                const confirmGiftItems = confirmOrderProduct.type === 'cart' && confirmOrderProduct.cartItems
                  ? confirmOrderProduct.cartItems.filter(i => i.type === 'gift-box')
                  : [];
                const confirmGiftTypes = new Set(confirmGiftItems.map(i => i.id.replace(/-[^-]+$/, ''))).size;
                const confirmHasGift = confirmGiftTypes > 0;
                const confirmMeetsMin = confirmGiftTypes >= MIN_TYPES;
                const isDisabled = confirmHasGift && !confirmMeetsMin;
                return (
                  <>
                    {isDisabled && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-3">
                        <p className="text-xs font-sans text-yellow-800 font-medium text-center">
                          You need at least <span className="font-san">{MIN_TYPES}</span> different product types in your Custom Gift Box. (<span className="font-san">{confirmGiftTypes}/{MIN_TYPES}</span> types)
                        </p>
                      </div>
                    )}
                    <button
                      onClick={handleConfirmOrderWhatsApp}
                      disabled={isDisabled}
                      className={`w-full py-4 font-sans font-bold rounded-sm transition-colors flex items-center justify-center gap-2 ${
                        isDisabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Buy Now
                    </button>
                  </>
                );
              })()}
              <p className="text-xs text-center text-surface/60 font-sans">
                You'll be redirected to WhatsApp to finalize your order
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-surface/70 backdrop-blur-lg">
          <div className="relative bg-white rounded-sm shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border-2 border-primary/20">
            <div className="px-8 py-6 border-b border-primary/20 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-3xl font-display font-bold text-surface">Privacy Policy</h3>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-sm transition-colors"
              >
                <X className="w-6 h-6 text-surface" />
              </button>
            </div>

            <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-100px)] font-sans text-surface/70 space-y-6">
              <p className="text-sm text-surface/60">Last updated: December 2025</p>

              {[
                {
                  title: '1. Information We Collect',
                  content: 'At Yumora, we collect information that you provide directly to us when you make a purchase or communicate with us. This may include your name, phone number, shipping address, and payment information.'
                },
                {
                  title: '2. How We Use Your Information',
                  content: 'We use the information we collect to process your orders, communicate with you about your purchases, and provide customer support. We may also use your information to send you marketing communications if you have opted in to receive them.'
                },
                {
                  title: '3. Information Sharing',
                  content: 'We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our business, such as payment processors and shipping companies.'
                },
                {
                  title: '4. Data Security',
                  content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.'
                },
                {
                  title: '5. Your Rights',
                  content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at yumorabd@gmail.com.'
                },
                {
                  title: '6. Cookies',
                  content: 'We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookies through your browser settings.'
                },
                {
                  title: '7. Changes to This Policy',
                  content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.'
                },
                {
                  title: '8. Contact Us',
                  content: 'If you have any questions about this privacy policy or our data practices, please contact us at yumorabd@gmail.com or call us at +880 1335 156146.'
                }
              ].map((section, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="text-xl font-display font-bold text-surface">{section.title}</h4>
                  <p className="leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

);
}

export default App;
