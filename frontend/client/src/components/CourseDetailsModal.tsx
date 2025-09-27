import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Heart,
  MessageSquare
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface CourseDetails {
  id: string;
  name: string;
  code: string;
  description: string;
  acad_career_descr: string;
  term_descr: string;
  campus: string;
  subject: string;
  units: number;
  eftls: string;
  prerequisite: string;
  co_requisite: string;
  assumed_knowledge: string;
  incompatible: string;
  assessment: string;
  syllabus: string;
  department: string;
  difficulty_rating: number;
  averageRating: number;
  reviewCount: number;
  tags: string[];
  reviews: CourseReview[];
}

export interface CourseReview {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  tags: string[];
  semester: string;
  helpful: number;
  timestamp: Date;
}

interface CourseDetailsModalProps {
  course: CourseDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWishlist?: (courseId: string) => void;
  onSubmitReview?: (courseId: string, rating: number, comment: string, tags: string[]) => void;
}

export default function CourseDetailsModal({ 
  course, 
  isOpen, 
  onClose, 
  onAddToWishlist,
  onSubmitReview 
}: CourseDetailsModalProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewTags, setReviewTags] = useState<string[]>([]);

  if (!course) return null;

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          interactive ? 'cursor-pointer hover-elevate' : ''
        } ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-muted-foreground'
        }`}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
      />
    ));
  };

  const availableReviewTags = [
    "Great Lecturer", "Heavy Workload", "Easy A", "Hard but Rewarding",
    "Lots of Reading", "Group Projects", "Clear Instructions", "Helpful TA",
    "Would Recommend", "Skip if Possible"
  ];
  
  const handleSubmitReview = () => {
    if (reviewRating > 0) {
      onSubmitReview?.(course.id, reviewRating, reviewComment, reviewTags);
      setShowReviewForm(false);
      setReviewRating(0);
      setReviewComment("");
      setReviewTags([]);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" data-testid="modal-course-details">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2" data-testid={`modal-title-${course.code}`}>
                {course.code} - {course.name}
              </DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{course.department}</span>
                <span>{course.units} units</span>
                <span>{course.campus}</span>
                <span>{course.term_descr}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => onAddToWishlist?.(course.id)}
              data-testid="button-add-to-wishlist"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save Course
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6">
            {/* Rating Overview */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{course.averageRating.toFixed(1)}</div>
                  <div className="flex items-center justify-center mb-1" data-testid="course-rating-stars">
                    {renderStars(course.averageRating)}
                  </div>
                  <div className="text-xs text-muted-foreground">3 reviews</div>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{course.difficulty_rating}/5</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowReviewForm(true)}
                data-testid="button-write-review"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Review
              </Button>
            </div>

            {/* Course Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Academic Career:</span> {course.acad_career_descr}</div>
                    <div><span className="font-medium">Subject:</span> {course.subject}</div>
                    <div><span className="font-medium">EFTSL:</span> {course.eftls}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Requirements
                  </h3>
                  <div className="space-y-2 text-sm">
                    {course.prerequisite && (
                      <div><span className="font-medium">Prerequisites:</span> {course.prerequisite}</div>
                    )}
                    {course.co_requisite && (
                      <div><span className="font-medium">Co-requisites:</span> {course.co_requisite}</div>
                    )}
                    {course.assumed_knowledge && (
                      <div><span className="font-medium">Assumed Knowledge:</span> {course.assumed_knowledge}</div>
                    )}
                    {course.incompatible && (
                      <div><span className="font-medium">Incompatible:</span> {course.incompatible}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* Assessment & Syllabus */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Assessment</h3>
                  <p className="text-sm text-muted-foreground">{course.assessment}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Syllabus</h3>
                  <p className="text-sm text-muted-foreground">{course.syllabus}</p>
                </CardContent>
              </Card>
            </div>

            {/* Popular Tags */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">What Students Say</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Form */}
            {showReviewForm && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Rating</label>
                      <div className="flex items-center space-x-1">
                        {renderStars(reviewRating, true, setReviewRating)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Comment (optional)</label>
                      <Textarea
                        placeholder="Share your experience with this course..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        data-testid="textarea-review-comment"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {availableReviewTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={reviewTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer hover-elevate"
                            onClick={() => {
                              setReviewTags(prev => 
                                prev.includes(tag) 
                                  ? prev.filter(t => t !== tag)
                                  : [...prev, tag]
                              );
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleSubmitReview} disabled={reviewRating === 0}>
                        Submit Review
                      </Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Student Reviews */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Student Reviews ({course.reviews.length})</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{review.studentName}</span>
                              <span className="text-xs text-muted-foreground">{review.semester}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {review.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{review.helpful} found helpful</span>
                            <span>{review.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}