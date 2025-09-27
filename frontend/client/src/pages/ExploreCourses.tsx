import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CourseSearch, { type SearchFilters } from "@/components/CourseSearch";
import CourseCard, { type Course } from "@/components/CourseCard";
import CourseDetailsModal, { type CourseDetails, type CourseReview } from "@/components/CourseDetailsModal";
import axios from "axios";
import { API } from "../../constants" 


export default function ExploreCourses() {
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


    // fectch all the components:
    useEffect(() => {
      const fetchAll = async () => {
        try {
          const resp = await axios.get(`${API}/courses?limit=100`);
          const rows = resp.data?.data ?? resp.data ?? [];
          const courses: Course[] = rows.map((r: any) => ({
            id: String(r.course_id ?? r.id ?? r.course_code ?? Math.random().toString()),
            name: r.title ?? r.name ?? "",
            code: r.course_code ?? r.code ?? "",
            description: r.syllabus ?? r.description ?? "",
            averageRating: Number(r.average_rating ?? r.avg_rating ?? 0),
            reviewCount: Number(r.reviewCount ?? 0),
            units: Number(r.units ?? 0),
            difficulty: typeof r.difficulty === "string" ? r.difficulty : (r.difficulty_rating ? (r.difficulty_rating >= 4 ? "Advanced" : r.difficulty_rating >= 2 ? "Intermediate" : "Beginner") : "Unknown"),
            tags: Array.isArray(r.tags) ? r.tags : [],
            department: r.subject ?? r.department ?? "Unknown",
          }));
          setSearchResults(courses);
        } catch (err) {
          console.error("Failed to fetch all courses:", err);
        }
      };

      fetchAll();
    }, []);

  const handleSearch = async (query: string, filters: SearchFilters) => {
  console.log("Searching for:", query, filters);

  try {
    // Build params object for axios. If departments array exists, send as subject params.
    // build URLSearchParams so subjects are sent as repeated params: ?subject=A&subject=B
    const params = new URLSearchParams();
    if (query && query.trim()) params.append('q', query.trim());
    if (filters.departments && filters.departments.length > 0) {
      filters.departments.forEach(dept => params.append('subject', dept));
    }

    const resp = await axios.get(`${API}/courses/search?${params.toString()}&limit=100`);

    // backend returns { success: true, data: rows } in your route — fall back if not wrapped
    const rows = resp.data?.data ?? resp.data ?? [];
    
    // map backend rows -> Course shape (light mapping)
    const courses: Course[] = rows.map((r: any) => ({
      id: String(r.course_id ?? r.id ?? r.course_code ?? Math.random().toString()),
      name: r.title ?? r.name ?? "",
      code: r.course_code ?? r.code ?? "",
      description: r.syllabus ?? r.description ?? "",
      averageRating: Number(r.average_rating ?? r.avg_rating ?? 0),
      reviewCount: Number(r.reviewCount ?? 0),
      units: Number(r.units ?? 0),
      difficulty: typeof r.difficulty === "string" ? r.difficulty : (r.difficulty_rating ? (r.difficulty_rating >= 4 ? "Advanced" : r.difficulty_rating >= 2 ? "Intermediate" : "Beginner") : "Unknown"),
      tags: Array.isArray(r.tags) ? r.tags : [],
      department: r.subject ?? r.department ?? "Unknown",
    }));

    // client-side difficulty filter (backend doesn't currently accept difficulty filters)
    let filtered = courses;
    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter(c => filters.difficulty.includes(c.difficulty));
    }

    setSearchResults(filtered);
  } catch (err) {
    console.error("Search failed:", err);
    // fallback: clear results or keep previous state
    setSearchResults([]);
  }
};

  const handleViewDetails = async (courseId: string) => {
  try {
    const resp = await axios.get(`${API}/courses/${courseId}`);
    // your backend returns row object (not wrapped), but be safe:
    const row = resp.data?.data ?? resp.data ?? null;
    if (!row) {
      console.error("No course details returned");
      return;
    }

    // minimal mapping to CourseDetails shape expected by your modal
    const details: CourseDetails = {
      id: String(row.course_id ?? row.id ?? row.course_code ?? courseId),
      name: row.title ?? row.name ?? "",
      code: row.course_code ?? row.code ?? "",
      description: row.syllabus ?? row.description ?? "",
      acad_career_descr: row.acad_career_descr ?? "",
      term_descr: row.term_descr ?? "",
      campus: row.campus ?? "",
      subject: row.subject ?? row.department ?? "",
      units: Number(row.units ?? 0),
      eftls: row.eftls ?? "",
      prerequisite: row.prerequisite ?? row.prereqs ?? "",
      co_requisite: row.co_requisite ?? row.coreqs ?? "",
      assumed_knowledge: row.assumed_knowledge ?? "",
      incompatible: row.incompatible ?? "",
      assessment: row.assessment ?? "",
      syllabus: row.syllabus ?? "",
      department: row.department ?? "",
      difficulty_rating: Number(row.difficulty_rating ?? 0),
      averageRating: Number(row.average_rating ?? 0),
      reviewCount: Number(row.reviewCount ?? 0),
      tags: Array.isArray(row.tags) ? row.tags : [],
      reviews: Array.isArray(row.reviews) ? row.reviews.map((r: any) => ({
        id: String(r.id ?? Math.random().toString()),
        studentName: r.studentName ?? r.name ?? "Anonymous",
        rating: Number(r.rating ?? 0),
        comment: r.comment ?? r.text ?? "",
        tags: Array.isArray(r.tags) ? r.tags : [],
        semester: r.semester ?? "",
        helpful: Number(r.helpful ?? 0),
        timestamp: r.timestamp ? new Date(r.timestamp) : new Date(),
      })) : []
    };

    setSelectedCourse(details);
    setIsModalOpen(true);
  } catch (err) {
    console.error("Failed to fetch course details:", err);
  }
};


  const handleAddToWishlist = async (courseId: string) => {
  try {
    await axios.post(`${API}/users/saved-courses`, { course_id: courseId });
    console.log("Added to wishlist:", courseId);
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
  }
};


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
            Explore Courses
          </h1>
          <p className="text-muted-foreground">
            Search through thousands of courses with real student reviews and ratings
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <CourseSearch onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Found {searchResults.length} courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={handleViewDetails}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search criteria.</p>
          </div>
        )}
      </div>

      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
}