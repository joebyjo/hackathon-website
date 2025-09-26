import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, ThumbsUp, Reply, Clock } from "lucide-react";
import { useState } from "react";
import { type Discussion } from "@shared/schema";

interface DiscussionPost extends Discussion {
  author: string;
  authorInitials: string;
  timeAgo: string;
  likes: number;
  replies: number;
}

interface CourseDiscussionProps {
  courseId: string;
  courseName?: string;
  onNewPost?: (title: string, content: string) => void;
  onLikePost?: (postId: string) => void;
  onReplyPost?: (postId: string, reply: string) => void;
}

export default function CourseDiscussion({ 
  courseId, 
  courseName = "Course Discussion", 
  onNewPost,
  onLikePost,
  onReplyPost 
}: CourseDiscussionProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // TODO: remove mock functionality
  const mockDiscussions: DiscussionPost[] = [
    {
      id: "1",
      courseId,
      userId: "user1",
      title: "Final Exam Tips?",
      content: "Hey everyone! I'm preparing for the final exam and wondering if anyone has tips on what topics to focus on. The assignment was pretty challenging, so I'm trying to understand what areas are most important.",
      replies: 5,
      author: "Sarah Chen",
      authorInitials: "SC",
      timeAgo: "2 hours ago",
      likes: 12
    },
    {
      id: "2", 
      courseId,
      userId: "user2",
      title: "Study Group Formation",
      content: "Looking to form a study group for the upcoming exam. We could meet weekly to go through practice problems and discuss lecture materials. Anyone interested?",
      replies: 8,
      author: "Mike Johnson",
      authorInitials: "MJ", 
      timeAgo: "1 day ago",
      likes: 18
    },
    {
      id: "3",
      courseId,
      userId: "user3",
      title: "Assignment 3 - Struggling with recursion",
      content: "I'm having trouble understanding the recursive approach for Assignment 3, Question 2. The base case makes sense but I'm confused about how the recursive calls work together. Any hints?",
      replies: 3,
      author: "Alex Kim",
      authorInitials: "AK",
      timeAgo: "3 days ago", 
      likes: 7
    }
  ];

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    onNewPost?.(newPostTitle, newPostContent);
    setNewPostTitle("");
    setNewPostContent("");
    setIsCreatingPost(false);
    console.log('New post created:', { title: newPostTitle, content: newPostContent });
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return;
    
    onReplyPost?.(postId, replyContent);
    setReplyContent("");
    setReplyingTo(null);
    console.log('Reply sent to post:', postId, replyContent);
  };

  return (
    <div className="space-y-6" data-testid="course-discussion">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {courseName} - Discussion
            </div>
            <Button 
              onClick={() => setIsCreatingPost(!isCreatingPost)}
              data-testid="button-new-post"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </CardTitle>
        </CardHeader>

        {isCreatingPost && (
          <CardContent className="space-y-4 border-t">
            <div className="space-y-2">
              <Input
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                data-testid="input-post-title"
              />
              <Textarea
                placeholder="What would you like to discuss?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-24"
                data-testid="textarea-post-content"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsCreatingPost(false)}
                data-testid="button-cancel-post"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                data-testid="button-submit-post"
              >
                Post
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Discussion Posts */}
      <div className="space-y-4">
        {mockDiscussions.map((discussion) => (
          <Card key={discussion.id} className="hover-elevate" data-testid={`discussion-post-${discussion.id}`}>
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{discussion.authorInitials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1" data-testid={`post-title-${discussion.id}`}>
                    {discussion.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span data-testid={`post-author-${discussion.id}`}>{discussion.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span data-testid={`post-time-${discussion.id}`}>{discussion.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm" data-testid={`post-content-${discussion.id}`}>
                {discussion.content}
              </p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLikePost?.(discussion.id)}
                    className="text-muted-foreground hover:text-primary"
                    data-testid={`button-like-${discussion.id}`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {discussion.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(replyingTo === discussion.id ? null : discussion.id)}
                    className="text-muted-foreground hover:text-primary"
                    data-testid={`button-reply-${discussion.id}`}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply ({discussion.replies})
                  </Button>
                </div>

                <Badge variant="secondary" data-testid={`badge-replies-${discussion.id}`}>
                  {discussion.replies} replies
                </Badge>
              </div>

              {/* Reply Box */}
              {replyingTo === discussion.id && (
                <div className="space-y-3 pt-3 border-t bg-muted/20 -mx-6 px-6 pb-4">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="bg-background"
                    data-testid={`textarea-reply-${discussion.id}`}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                      data-testid={`button-cancel-reply-${discussion.id}`}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReply(discussion.id)}
                      disabled={!replyContent.trim()}
                      data-testid={`button-send-reply-${discussion.id}`}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" data-testid="button-load-more">
          Load More Discussions
        </Button>
      </div>
    </div>
  );
}