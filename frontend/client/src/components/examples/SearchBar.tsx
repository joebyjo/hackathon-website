import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="w-full max-w-2xl">
      <SearchBar 
        onSearch={(query) => console.log('Search query:', query)}
        onFilterClick={() => console.log('Filter clicked')}
      />
    </div>
  );
}