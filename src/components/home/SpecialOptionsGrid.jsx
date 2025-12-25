import { motion } from 'framer-motion';
import SpecialOptionCard from './SpecialOptionCard';
import { specialOptions } from '../../data/data';
import { staggerContainer, itemVariants } from '../../utils/animations';

const SpecialOptionsGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-4">
            Special Collections
          </h2>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Curated mysteries and wonders waiting to be discovered
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {specialOptions.map((option) => (
            <motion.div key={option.id} variants={itemVariants}>
              <SpecialOptionCard option={option} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOptionsGrid;
