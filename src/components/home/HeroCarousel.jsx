import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlide from './HeroSlide';
import { heroSlides } from '../../data/data';
import { carouselVariants } from '../../utils/animations';
import logo from '../../assets/YUMORA.png';

const HeroCarousel = () => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const slideIndex = ((currentIndex % heroSlides.length) + heroSlides.length) % heroSlides.length;

  const paginate = (newDirection) => {
    setCurrentIndex([currentIndex + newDirection, newDirection]);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[700px] md:h-[600px] overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      {/* Logo backdrop */}
      <div className="absolute left-1/4 top-2/3 -translate-y-1/2 w-1/2 h-full flex items-center justify-start pl-8 md:pl-16">
        <img
          src={logo}
          alt=""
          className="w-full max-w-md h-auto object-contain opacity-20 mix-blend-overlay"
        />
      </div>

      <div className="relative h-full max-w-7xl mx-auto flex items-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <HeroSlide slide={heroSlides[slideIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 glass rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-light" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 glass rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-light" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex([index, index > slideIndex ? 1 : -1])}
            className={`transition-all duration-300 rounded-full ${
              index === slideIndex
                ? 'w-8 h-3 bg-primary'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
