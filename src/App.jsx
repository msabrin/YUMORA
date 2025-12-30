import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, IceCream } from 'lucide-react';

// Product data with availability
const mysteryBoxOptions = [
  { scoops: 1, price: 15 },
  { scoops: 2, price: 28 },
  { scoops: 3, price: 40 }
];

const giftBoxProducts = [
  {
    id: 'gift-1',
    name: 'Eternal Bloom Ring',
    image: '/assets/ring01.png',
    images: ['/assets/ring01.png', '/assets/1ring01.png', '/assets/2ring01.png', '/assets/3ring01.png'],
    price: 299,
    colors: ['Red', 'Pink', 'Blue', 'Yellow'],
    availableColors: ['Red', 'Blue', 'Yellow'], // Pink unavailable
    inStock: true
  },
  {
    id: 'gift-2',
    name: 'Premium Flower Band',
    image: '/assets/flowerband01.png',
    images: ['/assets/flowerband01.png', '/assets/1flowerband01.png', '/assets/2flowerband01.png', '/assets/3flowerband01.png'],
    price: 349,
    colors: ['Red', 'Pink', 'Green', 'Blue'],
    availableColors: ['Red', 'Pink', 'Green', 'Blue'],
    inStock: false // Out of stock
  },
  {
    id: 'gift-3',
    name: 'Heritage Earring & Locket',
    image: '/assets/earring&locket01.png',
    images: ['/assets/earring&locket01.png', '/assets/earring&locket02.png', '/assets/earring&locket03.png', '/assets/earring&locket11.png'],
    price: 599,
    colors: ['Red', 'Pink', 'Yellow'],
    availableColors: ['Red', 'Pink', 'Yellow'],
    inStock: true
  },
  {
    id: 'gift-4',
    name: 'Celestial Ring',
    image: '/assets/1ring01.png',
    images: ['/assets/1ring01.png', '/assets/ring01.png', '/assets/2ring01.png', '/assets/4ring01.png'],
    price: 449,
    colors: ['Red', 'Blue', 'Yellow'],
    availableColors: ['Red', 'Blue'], // Yellow unavailable
    inStock: true
  },
  {
    id: 'gift-5',
    name: 'Garden Blossom Band',
    image: '/assets/1flowerband01.png',
    images: ['/assets/1flowerband01.png', '/assets/flowerband01.png', '/assets/2flowerband01.png', '/assets/3flowerband01.png'],
    price: 389,
    colors: ['Pink', 'Green', 'Blue'],
    availableColors: ['Pink', 'Green', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-6',
    name: 'Vintage Elegance Set',
    image: '/assets/earring&locket02.png',
    images: ['/assets/earring&locket02.png', '/assets/earring&locket01.png', '/assets/earring&locket03.png', '/assets/1earring&locket11.png'],
    price: 649,
    colors: ['Red', 'Pink', 'Green', 'Yellow'],
    availableColors: ['Red', 'Pink', 'Green', 'Yellow'],
    inStock: true
  },
  {
    id: 'gift-7',
    name: 'Modern Romance Ring',
    image: '/assets/2ring01.png',
    images: ['/assets/2ring01.png', '/assets/ring01.png', '/assets/1ring01.png', '/assets/3ring01.png'],
    price: 329,
    colors: ['Red', 'Pink', 'Blue'],
    availableColors: ['Red', 'Pink', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-8',
    name: 'Botanical Dreams Band',
    image: '/assets/2flowerband01.png',
    images: ['/assets/2flowerband01.png', '/assets/flowerband01.png', '/assets/1flowerband01.png', '/assets/3flowerband01.png'],
    price: 419,
    colors: ['Pink', 'Green', 'Yellow'],
    availableColors: ['Green'], // Pink and Yellow unavailable
    inStock: true
  },
  {
    id: 'gift-9',
    name: 'Royal Heritage Set',
    image: '/assets/earring&locket03.png',
    images: ['/assets/earring&locket03.png', '/assets/earring&locket01.png', '/assets/earring&locket02.png', '/assets/earring&locket11.png'],
    price: 699,
    colors: ['Red', 'Blue', 'Green', 'Yellow'],
    availableColors: ['Red', 'Blue', 'Green', 'Yellow'],
    inStock: true
  },
  {
    id: 'gift-10',
    name: 'Infinity Ring',
    image: '/assets/3ring01.png',
    images: ['/assets/3ring01.png', '/assets/ring01.png', '/assets/1ring01.png', '/assets/2ring01.png'],
    price: 379,
    colors: ['Red', 'Pink', 'Blue'],
    availableColors: ['Red', 'Pink', 'Blue'],
    inStock: true
  },
  {
    id: 'gift-11',
    name: 'Enchanted Garden Band',
    image: '/assets/3flowerband01.png',
    images: ['/assets/3flowerband01.png', '/assets/flowerband01.png', '/assets/1flowerband01.png', '/assets/2flowerband01.png'],
    price: 429,
    colors: ['Green', 'Blue', 'Yellow'],
    availableColors: ['Green', 'Blue', 'Yellow'],
    inStock: true
  },
  {
    id: 'gift-12',
    name: 'Premium Eternity Ring',
    image: '/assets/4ring01.png',
    images: ['/assets/4ring01.png', '/assets/ring01.png', '/assets/1ring01.png', '/assets/2ring01.png'],
    price: 549,
    colors: ['Red', 'Pink', 'Green', 'Blue', 'Yellow'],
    availableColors: ['Red', 'Pink', 'Green', 'Blue', 'Yellow'],
    inStock: true
  }
];

const colorOptions = ['Red', 'Pink', 'Green', 'Blue', 'Purple', 'Yellow'];
const availableCupColors = ['Red', 'Green', 'Blue', 'Purple']; // Pink and Yellow unavailable

const colorStyles = {
  Red: 'bg-red-500',
  Pink: 'bg-pink-400',
  Green: 'bg-green-500',
  Blue: 'bg-blue-500',
  Purple: 'bg-purple-500',
  Yellow: 'bg-yellow-400'
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showGiftBoxCollection, setShowGiftBoxCollection] = useState(false);

  // Hero Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mystery Box state
  const [mysteryBoxScoops, setMysteryBoxScoops] = useState(1);
  const [customScoops, setCustomScoops] = useState('');
  const [isCustomScoops, setIsCustomScoops] = useState(false);

  // Color Cup state
  const [cupColor, setCupColor] = useState('Red');
  const [cupQuantity, setCupQuantity] = useState(1);

  // Gift Box Modal state
  const [giftBoxColor, setGiftBoxColor] = useState('Red');
  const [giftBoxQuantity, setGiftBoxQuantity] = useState(1);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

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

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
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
    alert('Added to cart!');
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
    alert('Added to cart!');
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

    const item = {
      id: `${selectedGiftBox.id}-${giftBoxColor}`,
      name: selectedGiftBox.name,
      type: 'gift-box',
      color: giftBoxColor,
      price: selectedGiftBox.price,
      quantity: giftBoxQuantity,
      image: selectedGiftBox.image
    };

    addToCart(item);
    setSelectedGiftBox(null);
    alert('Added to cart!');
  };

  // Buy Now functions
  const buyNowMysteryBox = () => {
    addMysteryBoxToCart();
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const buyNowColorCup = () => {
    addColorCupToCart();
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const buyNowGiftBox = () => {
    addGiftBoxToCart();
    setTimeout(() => setIsCartOpen(true), 300);
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

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // WhatsApp checkout
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const orderDetails = cartItems.map(item => {
      let details = `${item.name} x${item.quantity}`;
      if (item.scoops) details += ` (${item.scoops} Scoops)`;
      if (item.color) details += ` (${item.color})`;
      details += ` - $${item.price * item.quantity}`;
      return details;
    }).join('\n');

    const total = calculateTotal();
    const message = `Hello! I'd like to place an order:\n\n${orderDetails}\n\nTotal: $${total.toFixed(2)}`;

    const whatsappNumber = '8801335156146';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  // Open gift box modal
  const openGiftBoxModal = (product) => {
    setSelectedGiftBox(product);
    setGiftBoxColor(product.availableColors[0] || product.colors[0]);
    setGiftBoxQuantity(1);
    setSelectedGalleryImage(0);
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
                    scrollToSection(item.toLowerCase());
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
                <ShoppingBag className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" style={{ backgroundColor: '#c5a880', color: '#fff' }}>
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
                    scrollToSection(item.toLowerCase());
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
          <section id="home" className="relative py-24 md:py-36 overflow-hidden">
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
              <div className="relative min-h-[600px]">
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

          {/* Products Section */}
      <section id="shop" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
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

          <div className="space-y-16">
            {/* 1. Charm Mystery Box */}
            <div className="bg-white/10 backdrop-blur-xl rounded-sm p-10 md:p-14 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h4 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3" style={{ color: '#eedfe3' }}>
                    <IceCream className="w-10 h-10" style={{ color: '#c5a880' }} />
                    Charm Mystery Box
                  </h4>

                  <p className="font-sans leading-relaxed text-base" style={{ color: '#eedfe3', opacity: 0.8 }}>
                    Unlock the unknown with our curated mystery collection. Each scoop reveals treasures beyond imagination.
                  </p>

                  {/* Scoop Selector */}
                  <div className="space-y-4">
                    <label className="font-sans font-semibold" style={{ color: '#eedfe3' }}>Select Scoops:</label>

                    <div className="grid grid-cols-3 gap-3">
                      {mysteryBoxOptions.map(option => (
                        <button
                          key={option.scoops}
                          onClick={() => {
                            setIsCustomScoops(false);
                            setMysteryBoxScoops(option.scoops);
                          }}
                          className={`p-4 rounded-sm font-sans font-semibold transition-all border-2 ${
                            !isCustomScoops && mysteryBoxScoops === option.scoops
                              ? 'text-white border-[#c5a880]'
                              : 'border-white/20 hover:border-[#c5a880]'
                          }`}
                          style={!isCustomScoops && mysteryBoxScoops === option.scoops
                            ? { backgroundColor: '#c5a880' }
                            : { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#eedfe3' }}
                        >
                          <div className="flex items-center justify-center gap-1 text-2xl font-display">
                            <IceCream className="w-6 h-6" />
                            {option.scoops}
                          </div>
                          <div className="text-xm mt-1 opacity-80">Tk {option.price}</div>
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
            <div className="bg-white/10 backdrop-blur-xl rounded-sm p-10 md:p-14 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
            <div className="bg-white/10 backdrop-blur-xl rounded-sm p-10 md:p-14 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
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

                  <p className="font-display font-bold text-5xl" style={{ color: '#c5a880' }}>$12</p>

                  {/* Color Selector */}
                  <div className="space-y-4">
                    <label className="font-sans font-semibold" style={{ color: '#eedfe3' }}>Select Color:</label>
                    <div className="grid grid-cols-3 gap-3">
                      {colorOptions.map(color => {
                        const isAvailable = availableCupColors.includes(color);
                        return (
                          <button
                            key={color}
                            onClick={() => isAvailable && setCupColor(color)}
                            disabled={!isAvailable}
                            className={`relative p-4 rounded-sm font-sans font-semibold transition-all ${
                              isAvailable
                                ? `${colorStyles[color]} text-white hover:opacity-90 ${
                                    cupColor === color ? 'ring-4 ring-primary' : ''
                                  }`
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {color}
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

              <div className="grid grid-cols-3 gap-6 pt-10">
                {[
                  { value: '38+', label: 'Years' },
                  { value: '50K+', label: 'Customers' },
                  { value: '100%', label: 'Handcrafted' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 rounded-sm bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <p className="text-4xl font-display font-bold mb-2" style={{ color: '#c5a880' }}>{stat.value}</p>
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
        <section className="py-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-12">
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
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] font-sans font-semibold mb-4" style={{ color: '#c5a880' }}>
                Our Collection
              </p>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#eedfe3' }}>
                Custom Gift Box
              </h3>
              <p className="font-sans text-lg max-w-2xl mx-auto" style={{ color: '#eedfe3', opacity: 0.8 }}>
                Explore our exquisite collection and customize your perfect gift
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {giftBoxProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => product.inStock && openGiftBoxModal(product)}
                  className={`group relative bg-white/10 backdrop-blur-xl rounded-sm overflow-hidden border border-white/20 shadow-lg transition-all duration-300 ${
                    product.inStock
                      ? 'cursor-pointer hover:shadow-2xl hover:border-[#c5a880] hover:-translate-y-1'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform ${
                        product.inStock ? 'group-hover:scale-105' : 'grayscale'
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
                      <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                        <span className="font-sans font-bold text-sm" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h5 className="font-sans font-semibold text-sm truncate mb-1" style={{ color: '#eedfe3' }}>{product.name}</h5>
                    <p className="font-display font-bold text-lg" style={{ color: '#c5a880' }}>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
                Crafting timeless elegance since 2025. Premium Gifts for those who appreciate the finer things.
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
              © 2025 Yumora by <a href="https://github.com/msabrin" target="_blank" rel="noopener noreferrer"> <strong>Mirza Sabrin</strong></a> .All rights reserved. Crafted with excellence.
            </p>
          </div>
        </div>
      </footer>

      {/* Gift Box Detail Modal */}
      {selectedGiftBox && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-surface/70 backdrop-blur-lg">
          <div className="relative bg-white rounded-sm shadow-2xl max-w-4xl w-full border-2 border-primary/20">
            <button
              onClick={() => setSelectedGiftBox(null)}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-primary/10 rounded-sm transition-colors"
            >
              <X className="w-6 h-6 text-surface" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
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
                        onClick={() => setSelectedGalleryImage(index)}
                        className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
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
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-surface mb-2">
                      {selectedGiftBox.name}
                    </h3>
                    <p className="text-4xl font-display font-bold text-primary">
                      ${selectedGiftBox.price}
                    </p>
                    {!selectedGiftBox.inStock && (
                      <p className="text-sm font-sans text-red-600 mt-2 font-semibold">
                        Currently Sold Out
                      </p>
                    )}
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="text-surface font-sans font-semibold block mb-3">
                      Select Color:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedGiftBox.colors.map(color => {
                        const isAvailable = selectedGiftBox.availableColors.includes(color);
                        return (
                          <button
                            key={color}
                            onClick={() => isAvailable && setGiftBoxColor(color)}
                            disabled={!isAvailable || !selectedGiftBox.inStock}
                            className={`relative p-4 rounded-sm font-sans font-semibold transition-all ${
                              isAvailable && selectedGiftBox.inStock
                                ? `${colorStyles[color]} text-white hover:opacity-90 ${
                                    giftBoxColor === color ? 'ring-4 ring-primary' : ''
                                  }`
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {color}
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
                    className={`w-full px-6 py-4 font-sans font-bold rounded-sm transition-all border-2 ${
                      selectedGiftBox.inStock
                        ? 'bg-white text-surface border-primary/20 hover:border-primary'
                        : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {selectedGiftBox.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>
                  <button
                    onClick={buyNowGiftBox}
                    disabled={!selectedGiftBox.inStock}
                    className={`w-full px-6 py-4 font-sans font-bold rounded-sm transition-all ${
                      selectedGiftBox.inStock
                        ? 'bg-primary text-white hover:bg-surface'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedGiftBox.inStock ? 'Buy Now' : 'Sold Out'}
                  </button>
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
                            ${item.price} × {item.quantity}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-7 h-7 rounded-sm bg-white border border-primary/20 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm font-bold"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-sans font-semibold text-surface">
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
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-sans font-semibold text-surface">Total:</span>
                    <span className="font-display font-bold text-2xl text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 bg-primary text-white font-sans font-bold rounded-sm hover:bg-surface transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Complete Order via WhatsApp
                  </button>
                  <p className="text-xs text-center text-surface/60 font-sans">
                    You'll be redirected to WhatsApp to complete your purchase
                  </p>
                </div>
              )}
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
                  content: 'At Yumora, we collect information that you provide directly to us when you make a purchase, create an account, or communicate with us. This may include your name, email address, shipping address, and payment information.'
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
                  content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@yumora.com.'
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
                  content: 'If you have any questions about this privacy policy or our data practices, please contact us at privacy@yumora.com or call us at +880 1335 156146.'
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
