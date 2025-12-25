import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, MessageCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { generateWhatsAppURL } from '../../utils/whatsapp';

const ProductDetailGeneral = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const whatsappURL = generateWhatsAppURL(product, { quantity });
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="h-96 lg:h-[600px] rounded-3xl shadow-glow-strong"
          style={{ background: product.image }}
        />
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <span className="inline-block px-4 py-1 glass-strong rounded-full text-sm font-semibold text-primary mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl font-display font-bold text-gradient mb-4">
            {product.name}
          </h1>
          <p className="text-4xl font-bold text-primary">
            ${product.price}
          </p>
        </div>

        <GlassCard hover={false}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-light/70">Color:</span>
              <span className="px-4 py-2 glass-strong rounded-full text-accent font-medium">
                {product.color}
              </span>
            </div>
          </div>
        </GlassCard>

        <div>
          <h3 className="text-xl font-display font-semibold text-light mb-3">
            Description
          </h3>
          <p className="text-light/80 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Quantity */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-light font-medium">Quantity:</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 glass-strong rounded-lg hover:bg-white/20 transition-colors"
              >
                <Minus className="w-5 h-5 text-light" />
              </button>
              <span className="text-2xl font-bold text-primary w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 glass-strong rounded-lg hover:bg-white/20 transition-colors"
              >
                <Plus className="w-5 h-5 text-light" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Buy Now */}
        <Button
          variant="primary"
          className="w-full text-lg py-4"
          onClick={handleBuyNow}
        >
          <span className="flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Buy Now - ${(product.price * quantity).toFixed(2)}</span>
          </span>
        </Button>
      </motion.div>
    </div>
  );
};

export default ProductDetailGeneral;
