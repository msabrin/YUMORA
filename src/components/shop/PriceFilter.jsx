const PriceFilter = ({ priceRange, setPriceRange }) => {
  const ranges = [
    { label: 'All Prices', value: 'All' },
    { label: '$0 - $30', value: '0-30' },
    { label: '$31 - $50', value: '31-50' },
    { label: '$51 - $80', value: '51-80' },
    { label: '$80+', value: '80+' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-primary">
        Price Range
      </h3>
      <div className="space-y-2">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => setPriceRange(range.value)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              priceRange === range.value
                ? 'bg-primary text-surface font-semibold'
                : 'glass-subtle text-light hover:bg-white/10'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter;
