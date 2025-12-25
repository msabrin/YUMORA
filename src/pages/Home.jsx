import { motion } from 'framer-motion';
import HeroCarousel from '../components/home/HeroCarousel';
import SpecialOptionsGrid from '../components/home/SpecialOptionsGrid';
import { pageTransition } from '../utils/animations';

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <HeroCarousel />
      <SpecialOptionsGrid />
    </motion.div>
  );
};

export default Home;
