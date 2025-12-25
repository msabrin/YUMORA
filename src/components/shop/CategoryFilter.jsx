import { categories } from '../../data/data';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-primary">
        Category
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-primary text-surface font-semibold'
                : 'glass-subtle text-light hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
