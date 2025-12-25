import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { staggerContainer, itemVariants } from '../../utils/animations';
import { Package } from 'lucide-react';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-20 h-20 text-light/30 mb-4" />
        <h3 className="text-2xl font-display font-semibold text-light/60 mb-2">
          No products found
        </h3>
        <p className="text-light/50">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
