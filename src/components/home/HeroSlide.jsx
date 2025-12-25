import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSlide = ({ slide }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full px-4 sm:px-6 lg:px-8">
      {/* Left: Text Content */}
      <motion.div
        className="space-y-6 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.p
          className="text-accent text-sm uppercase tracking-widest font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {slide.subtitle}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-light/90 leading-relaxed max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {slide.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to={slide.linkTo}>
            <Button variant="primary" className="text-lg px-8 py-4">
              {slide.cta}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        className="relative h-96 md:h-[500px]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="w-full h-full rounded-3xl shadow-glow-strong"
          style={{
            background: slide.image,
          }}
        />
        <div className="absolute inset-0 rounded-3xl glass-subtle flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm animate-float" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSlide;
