import UserProfile from '../UserProfile';
import { type User } from '@shared/schema';

export default function UserProfileExample() {
  // TODO: remove mock functionality
  const mockUser: User = {
    id: "1",
    username: "john_doe",
    email: "john.doe@student.adelaide.edu.au",
    fullName: "John Doe",
    studentId: "a1234567",
    year: 2,
    major: "Computer Science"
  };

  return (
    <div className="max-w-2xl">
      <UserProfile 
        user={mockUser} 
        onEditProfile={() => console.log('Edit profile clicked')}
      />
    </div>
  );
}