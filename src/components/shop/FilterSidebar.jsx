import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';

const FilterSidebar = ({ filters, setFilters }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6">
      <SearchBar
        searchQuery={filters.searchQuery}
        setSearchQuery={setFilters.setSearchQuery}
      />
      <CategoryFilter
        selectedCategory={filters.selectedCategory}
        setSelectedCategory={setFilters.setSelectedCategory}
      />
      <ColorFilter
        selectedColor={filters.selectedColor}
        setSelectedColor={setFilters.setSelectedColor}
      />
      <PriceFilter
        priceRange={filters.priceRange}
        setPriceRange={setFilters.setPriceRange}
      />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-80 flex-shrink-0">
        <GlassCard hover={false} className="sticky top-24">
          <FilterContent />
        </GlassCard>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="p-4 bg-primary text-surface rounded-full shadow-glow-strong hover:scale-110 transition-transform"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 glass-strong z-50 lg:hidden p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-gradient-gold">
                  Filters
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 glass rounded-lg hover:bg-white/20"
                >
                  <X className="w-6 h-6 text-light" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
