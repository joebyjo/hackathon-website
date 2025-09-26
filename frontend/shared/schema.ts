import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  studentId: text("student_id"),
  year: integer("year"),
  major: text("major"),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(), // e.g., "COMP SCI 1015"
  title: text("title").notNull(),
  description: text("description"),
  credits: integer("credits").notNull(),
  prerequisites: text("prerequisites").array(),
  difficulty: integer("difficulty"), // 1-5 scale
  department: text("department").notNull(),
  semester: text("semester"), // "S1", "S2", "SS", "FY"
  averageRating: real("average_rating").default(0),
  totalRatings: integer("total_ratings").default(0),
  tags: text("tags").array(), // e.g., ["programming", "mathematics", "easy"]
});

export const ratings = pgTable("ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  review: text("review"),
  difficulty: integer("difficulty"), // 1-5 scale
  workload: integer("workload"), // 1-5 scale
  recommendation: boolean("recommendation").default(true),
  semester: text("semester"), // when they took it
  year: integer("year"),
});

export const discussions = pgTable("discussions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull(),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  replies: integer("replies").default(0),
});

export const completedCourses = pgTable("completed_courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  semester: text("semester").notNull(),
  year: integer("year").notNull(),
  grade: text("grade"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  fullName: true,
  studentId: true,
  year: true,
  major: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  averageRating: true,
  totalRatings: true,
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
});

export const insertDiscussionSchema = createInsertSchema(discussions).omit({
  id: true,
  replies: true,
});

export const insertCompletedCourseSchema = createInsertSchema(completedCourses).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Discussion = typeof discussions.$inferSelect;
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
export type CompletedCourse = typeof completedCourses.$inferSelect;
export type InsertCompletedCourse = z.infer<typeof insertCompletedCourseSchema>;
