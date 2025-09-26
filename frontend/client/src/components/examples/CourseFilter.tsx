import CourseFilter from '../CourseFilter';

export default function CourseFilterExample() {
  return (
    <div className="max-w-md">
      <CourseFilter 
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
        onClearFilters={() => console.log('Filters cleared')}
        onClose={() => console.log('Filter panel closed')}
      />
    </div>
  );
}