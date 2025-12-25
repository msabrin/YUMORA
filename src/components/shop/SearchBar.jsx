import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 glass rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light/50" />
    </div>
  );
};

export default SearchBar;
