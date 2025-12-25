import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  return (
    <GlassCard className="group">
      {/* Image */}
      <div className="relative mb-4">
        <div
          className="h-64 rounded-xl shadow-lg group-hover:shadow-glow transition-all duration-300"
          style={{ background: product.image }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 glass-strong rounded-full text-xs font-semibold text-light">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-display font-bold text-light group-hover:text-gradient-gold transition-all">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
        </div>

        <p className="text-light/70 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Color Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-light/60">Color:</span>
          <span className="px-3 py-1 glass-subtle rounded-full text-xs font-medium text-accent">
            {product.color}
          </span>
        </div>

        {/* Button */}
        <Link to={`/product/${product.id}`}>
          <Button variant="primary" className="w-full mt-4 group/btn">
            <span className="flex items-center justify-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>View Product</span>
            </span>
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};

export default ProductCard;
