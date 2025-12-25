# Yumora - Mystery & Wonder E-Commerce

A beautiful, glassmorphic e-commerce website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Glassmorphism Design**: Soft modern, futuristic aesthetic with subtle gradients and backdrop blur effects
- **Hero Carousel**: Auto-playing carousel with 6 slides featuring smooth transitions
- **Special Collections**: 3 unique products (Mystery Box, Charm Mystery Box, Color Cup) with custom pricing interfaces
- **Browse Shop**: Filter and search through 12+ products by category, color, and price
- **Dynamic Product Pages**: Different layouts for mystery boxes (scoop selection), color cups (color picker), and general products
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Smooth Animations**: Framer Motion animations throughout for delightful user experience

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable components (GlassCard, Button, Navbar, Footer)
│   ├── home/           # Home page components (Carousel, Special Options)
│   ├── shop/           # Shop page components (Filters, Product Grid)
│   └── product/        # Product detail components (General, Mystery, ColorCup)
├── data/
│   └── data.js         # Product data and configuration
├── hooks/
│   ├── useCart.js      # Shopping cart hook
│   └── useFilter.js    # Product filtering hook
├── layouts/
│   └── MainLayout.jsx  # Main app layout with navbar and footer
├── pages/
│   ├── Home.jsx        # Home page
│   ├── Shop.jsx        # Shop/browse page
│   ├── ProductDetail.jsx  # Product details page
│   └── NotFound.jsx    # 404 page
├── utils/
│   └── animations.js   # Framer Motion animation variants
├── App.jsx             # App routing
├── main.jsx           # App entry point
└── index.css          # Global styles and utilities
```

## Key Pages

### Home (/)
- Auto-playing hero carousel with 6 slides
- Special options grid displaying 3 unique products
- Links to product details and shop

### Shop (/shop)
- Filterable product grid (search, category, color, price)
- Shows only browse products (NOT special options)
- Responsive filter sidebar

### Product Detail (/product/:id)
- **Mystery Boxes**: Scoop selection interface (1, 2, 3 scoops, custom)
- **Color Cup**: Interactive color picker with live preview
- **General Products**: Standard product layout with quantity selector
- Add to cart functionality

## Color Palette

- **Primary (Gold/Tan)**: `#c5a880`
- **Surface (Deep Slate)**: `#4a4e69`
- **Secondary (Muted Mauve)**: `#9a8c98`
- **Light (Pale Pink)**: `#eedfe3`
- **Accent (Sage Grey)**: `#b8b7a4`

## Typography

- **Display Font**: Cormorant Garamond (elegant, sophisticated)
- **Body Font**: Outfit (modern, clean)

## Custom Utilities

- `.glass` - Glassmorphic effect
- `.glass-strong` - Stronger glass effect
- `.glass-subtle` - Subtle glass effect
- `.text-gradient` - Gradient text effect
- `.shadow-glow` - Glowing shadow effect
- `.gradient-mesh` - Background gradient mesh

## Features Breakdown

### Shopping Cart
- Add products with options (scoops, colors)
- Quantity management
- LocalStorage persistence
- Cart count display in navbar

### Product Filtering
- Search by name/description
- Filter by category
- Filter by color
- Filter by price range
- Real-time filtering with debounced search

### Animations
- Page transitions
- Carousel slide animations
- Staggered grid animations
- Hover and tap effects
- Loading states

## Customization

### Adding Products

Edit `src/data/data.js`:

```javascript
// Add to browseProducts array
{
  id: 'prod-13',
  name: 'Your Product',
  category: 'Category',
  price: 50,
  color: 'Color',
  description: 'Description',
  image: 'linear-gradient(135deg, #... 0%, #... 100%)'
}
```

### Modifying Colors

Edit `tailwind.config.js` to change the color palette.

### Adjusting Animations

Edit `src/utils/animations.js` to modify Framer Motion variants.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

Built with love by Yumora Team
