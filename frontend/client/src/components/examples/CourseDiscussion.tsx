import CourseDiscussion from '../CourseDiscussion';

export default function CourseDiscussionExample() {
  return (
    <div className="max-w-4xl">
      <CourseDiscussion 
        courseId="comp-sci-1015"
        courseName="COMP SCI 1015 - Introduction to Programming"
        onNewPost={(title, content) => console.log('New post:', { title, content })}
        onLikePost={(postId) => console.log('Liked post:', postId)}
        onReplyPost={(postId, reply) => console.log('Reply to post:', postId, reply)}
      />
    </div>
  );
}