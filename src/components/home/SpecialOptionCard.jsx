import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';

const SpecialOptionCard = ({ option }) => {
  const renderPricing = () => {
    if (option.type === 'mystery') {
      return (
        <div className="space-y-2">
          <p className="text-sm text-light/70 font-medium">Pricing Options:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="glass-subtle rounded-lg p-2">
              <span className="text-accent">1 Scoop:</span>{' '}
              <span className="text-primary font-semibold">${option.pricing.scoop1}</span>
            </div>
            <div className="glass-subtle rounded-lg p-2">
              <span className="text-accent">2 Scoops:</span>{' '}
              <span className="text-primary font-semibold">${option.pricing.scoop2}</span>
            </div>
            <div className="glass-subtle rounded-lg p-2">
              <span className="text-accent">3 Scoops:</span>{' '}
              <span className="text-primary font-semibold">${option.pricing.scoop3}</span>
            </div>
            <div className="glass-subtle rounded-lg p-2">
              <span className="text-accent">Custom:</span>{' '}
              <span className="text-primary font-semibold">${option.pricing.custom}</span>
            </div>
          </div>
        </div>
      );
    }

    if (option.type === 'cup') {
      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-light/70">Price:</span>
            <span className="text-2xl font-bold text-primary">${option.price}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {option.colors.map((color) => (
              <div
                key={color}
                className="px-3 py-1 glass-subtle rounded-full text-xs font-medium text-light"
              >
                {color}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div
        className="h-48 rounded-xl mb-4 shadow-lg"
        style={{ background: option.image }}
      />

      <h3 className="text-2xl font-display font-bold text-gradient-gold mb-2">
        {option.title}
      </h3>

      <p className="text-light/80 mb-4 flex-1 leading-relaxed">
        {option.description}
      </p>

      {renderPricing()}

      <Link to={`/product/${option.id}`} className="mt-6">
        <Button variant="primary" className="w-full group">
          <span className="flex items-center justify-center space-x-2">
            <span>View Details</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </Link>
    </GlassCard>
  );
};

export default SpecialOptionCard;
