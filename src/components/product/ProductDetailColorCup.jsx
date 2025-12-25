import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { generateWhatsAppURL } from '../../utils/whatsapp';

const ProductDetailColorCup = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const colorStyles = {
    Red: { bg: 'bg-red-500', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' },
    Blue: { bg: 'bg-blue-500', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    Green: { bg: 'bg-green-500', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    Pink: { bg: 'bg-pink-400', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    Yellow: { bg: 'bg-yellow-400', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  };

  const handleBuyNow = () => {
    const whatsappURL = generateWhatsAppURL(product, { color: selectedColor });
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image with Color Preview */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div
          className="h-96 lg:h-[600px] rounded-3xl shadow-glow-strong relative overflow-hidden transition-all duration-500"
          style={{ background: colorStyles[selectedColor]?.gradient || product.image }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={selectedColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-64 h-64 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center"
            >
              <div className="text-6xl font-display font-bold text-white drop-shadow-lg">
                {selectedColor}
              </div>
            </motion.div>
          </div>
        </div>
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
            Color Collection
          </span>
          <h1 className="text-5xl font-display font-bold text-gradient mb-4">
            {product.title}
          </h1>
          <p className="text-4xl font-bold text-primary">
            ${product.price}
          </p>
        </div>

        <p className="text-light/80 leading-relaxed text-lg">
          {product.description}
        </p>

        {/* Color Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold text-primary">
            Choose Your Color
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {product.colors.map((color) => (
              <motion.button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`relative p-6 rounded-2xl transition-all ${
                  selectedColor === color
                    ? 'ring-4 ring-primary shadow-glow-strong'
                    : 'glass-strong hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="space-y-3">
                  <div
                    className={`w-full h-20 rounded-xl ${colorStyles[color]?.bg} shadow-lg`}
                  />
                  <div className="text-center font-semibold text-light">
                    {color}
                  </div>
                  {selectedColor === color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-surface" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Info */}
        <GlassCard hover={false}>
          <div className="flex justify-between items-center">
            <span className="text-light/70">Selected Color:</span>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${colorStyles[selectedColor]?.bg}`} />
              <span className="font-semibold text-light text-lg">{selectedColor}</span>
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
            <span>Buy Now - ${product.price}</span>
          </span>
        </Button>
      </motion.div>
    </div>
  );
};

export default ProductDetailColorCup;
