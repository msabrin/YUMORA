import { colors } from '../../data/data';

const ColorFilter = ({ selectedColor, setSelectedColor }) => {
  const colorStyles = {
    Gold: 'bg-yellow-500',
    Silver: 'bg-gray-300',
    Purple: 'bg-purple-500',
    Pink: 'bg-pink-400',
    White: 'bg-white',
    Brown: 'bg-amber-700',
    Black: 'bg-black',
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-primary">
        Color
      </h3>
      <div className="space-y-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center space-x-3 ${
              selectedColor === color
                ? 'bg-primary text-surface font-semibold'
                : 'glass-subtle text-light hover:bg-white/10'
            }`}
          >
            {color !== 'All' && (
              <div className={`w-5 h-5 rounded-full ${colorStyles[color]} border-2 border-white/50`} />
            )}
            <span>{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
