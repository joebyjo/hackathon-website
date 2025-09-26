import UserProfile from "@/components/UserProfile";
import { type User } from "@shared/schema";

export default function Profile() {
  // TODO: remove mock functionality - get real user data
  const mockUser: User = {
    id: "1",
    username: "john_doe",
    email: "john.doe@student.adelaide.edu.au",
    fullName: "John Doe",
    studentId: "a1234567",
    year: 2,
    major: "Computer Science"
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // TODO: Implement profile editing functionality
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <UserProfile 
        user={mockUser} 
        onEditProfile={handleEditProfile}
      />
    </div>
  );
}