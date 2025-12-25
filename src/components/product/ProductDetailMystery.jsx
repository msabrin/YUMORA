import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, IceCream } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { generateWhatsAppURL } from '../../utils/whatsapp';

const ProductDetailMystery = ({ product }) => {
  const [selectedScoop, setSelectedScoop] = useState('scoop1');

  const scoopOptions = [
    { id: 'scoop1', label: '1 Scoop', price: product.pricing.scoop1, icon: 1 },
    { id: 'scoop2', label: '2 Scoops', price: product.pricing.scoop2, icon: 2 },
    { id: 'scoop3', label: '3 Scoops', price: product.pricing.scoop3, icon: 3 },
    { id: 'custom', label: 'Custom Mystery', price: product.pricing.custom, icon: '✨' },
  ];

  const handleBuyNow = () => {
    const whatsappURL = generateWhatsAppURL(product, { scoop: selectedScoop });
    window.open(whatsappURL, '_blank');
  };

  const selectedPrice = product.pricing[selectedScoop];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div
          className="h-96 lg:h-[600px] rounded-3xl shadow-glow-strong relative overflow-hidden"
          style={{ background: product.image }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-md"
            />
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
            Mystery Collection
          </span>
          <h1 className="text-5xl font-display font-bold text-gradient mb-4">
            {product.title}
          </h1>
        </div>

        <p className="text-light/80 leading-relaxed text-lg">
          {product.description}
        </p>

        {/* Scoop Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold text-primary">
            Choose Your Mystery Level
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {scoopOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedScoop(option.id)}
                className={`relative p-6 rounded-2xl transition-all ${
                  selectedScoop === option.id
                    ? 'bg-primary text-surface shadow-glow-strong'
                    : 'glass-strong hover:bg-white/20 text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl mb-2">
                    {typeof option.icon === 'number' ? (
                      <div className="flex justify-center space-x-1">
                        {Array.from({ length: option.icon }).map((_, i) => (
                          <IceCream key={i} className="w-6 h-6" />
                        ))}
                      </div>
                    ) : (
                      option.icon
                    )}
                  </div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-2xl font-bold">
                    ${option.price}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Info */}
        <GlassCard hover={false}>
          <div className="flex justify-between items-center">
            <span className="text-light/70">Selected:</span>
            <div className="text-right">
              <div className="font-semibold text-light">
                {scoopOptions.find(o => o.id === selectedScoop)?.label}
              </div>
              <div className="text-3xl font-bold text-primary">
                ${selectedPrice}
              </div>
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
            <span>Buy Now - ${selectedPrice}</span>
          </span>
        </Button>
      </motion.div>
    </div>
  );
};

export default ProductDetailMystery;
