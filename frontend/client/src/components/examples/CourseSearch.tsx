import CourseSearch from '../CourseSearch';

export default function CourseSearchExample() {
  return (
    <div className="p-8 bg-background">
      <CourseSearch 
        onSearch={(query, filters) => {
          console.log('Search:', query);
          console.log('Filters:', filters);
        }}
        placeholder="Search for courses like CS 101, Mathematics, etc..."
      />
    </div>
  );
}