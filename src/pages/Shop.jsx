import { motion } from 'framer-motion';
import { browseProducts } from '../data/data';
import { useFilter } from '../hooks/useFilter';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import { pageTransition } from '../utils/animations';

const Shop = () => {
  const filters = useFilter(browseProducts);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-4">
            Browse Our Collection
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Discover handcrafted treasures and timeless pieces
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters */}
          <FilterSidebar filters={filters} setFilters={filters} />

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-light/70">
                <span className="font-semibold text-primary">
                  {filters.filteredProducts.length}
                </span>{' '}
                {filters.filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filters.filteredProducts} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
