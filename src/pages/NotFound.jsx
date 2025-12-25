import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';
import { pageTransition } from '../utils/animations';

const NotFound = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="text-center space-y-8 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative"
        >
          <div className="text-9xl font-display font-bold text-gradient opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-32 h-32 text-primary/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-light">
            Mystery Not Found
          </h1>
          <p className="text-xl text-light/70">
            The treasure you seek has vanished into the unknown. Perhaps it was never meant to be found...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="primary" className="space-x-2">
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">
              Browse Shop
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
