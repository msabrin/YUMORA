import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { specialOptions, browseProducts } from '../data/data';
import ProductDetailGeneral from '../components/product/ProductDetailGeneral';
import ProductDetailMystery from '../components/product/ProductDetailMystery';
import ProductDetailColorCup from '../components/product/ProductDetailColorCup';
import { pageTransition } from '../utils/animations';

const ProductDetail = () => {
  const { id } = useParams();

  // Find product in both special options and browse products
  const allProducts = [...specialOptions, ...browseProducts];
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const renderProductDetail = () => {
    if (product.type === 'mystery') {
      return <ProductDetailMystery product={product} />;
    }
    if (product.type === 'cup') {
      return <ProductDetailColorCup product={product} />;
    }
    return <ProductDetailGeneral product={product} />;
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb / Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to={product.type ? '/' : '/shop'}
            className="inline-flex items-center space-x-2 text-light/70 hover:text-primary transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {product.type ? 'Home' : 'Shop'}</span>
          </Link>
        </motion.div>

        {/* Product Detail */}
        {renderProductDetail()}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
