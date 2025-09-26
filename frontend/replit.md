# Course Recommender & Rating Website

## Overview

CourseLink is a comprehensive course discovery and rating platform specifically designed for the University of Adelaide. The application serves as an educational hub where students can browse courses, read reviews, receive AI-powered recommendations, and participate in course discussions. Built with a modern full-stack architecture, the platform prioritizes academic professionalism while providing efficient course discovery and comparison tools.

The system combines traditional course browsing functionality with AI-driven personalization, allowing students to make informed decisions about their academic journey through community-driven ratings, detailed course information, and intelligent recommendations based on their interests and academic goals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, leveraging a component-based architecture that emphasizes reusability and maintainability. The application uses Wouter for lightweight client-side routing and TanStack Query for efficient server state management and caching.

**UI Framework**: Utilizes shadcn/ui components built on Radix UI primitives, providing a consistent and accessible design system. The component library follows the "New York" style variant with extensive customization through Tailwind CSS variables.

**State Management**: Implements a hybrid approach with React Query handling server state (course data, user profiles, ratings) while React's built-in state management handles local UI state (modals, forms, theme preferences).

**Styling System**: Uses Tailwind CSS with custom design tokens defined in CSS variables, supporting both light and dark themes. The design system includes elevated hover states, consistent spacing units, and a professional color palette suitable for educational platforms.

### Backend Architecture
The backend follows a REST API architecture using Express.js with TypeScript. The server implements a modular route structure with clear separation between API endpoints and static file serving.

**Server Structure**: Uses Express middleware for request logging, JSON parsing, and error handling. The development environment integrates Vite for hot module replacement and efficient development workflows.

**Storage Layer**: Implements an abstraction pattern with an `IStorage` interface, currently using in-memory storage (`MemStorage`) for development. The storage interface is designed to be easily replaceable with database implementations (PostgreSQL) without changing business logic.

**API Design**: RESTful endpoints with consistent error handling and request/response formatting. All API routes are prefixed with `/api` for clear separation from frontend routes.

### Database Schema Design
The application uses Drizzle ORM with PostgreSQL as the target database. The schema defines five core entities:

**Users Table**: Stores student information including university-specific data like student ID, academic year, and major. Supports both regular users and university-specific authentication patterns.

**Courses Table**: Central entity containing course codes, titles, descriptions, prerequisites, and metadata like difficulty ratings and department classifications. Includes arrays for prerequisites and tags to support flexible course relationships.

**Ratings Table**: Links users to courses with detailed rating information including star ratings, written reviews, difficulty assessments, workload evaluations, and recommendation status. Tracks temporal data like semester and year when the course was taken.

**Discussions Table**: Enables course-specific discussion forums with user-generated content including discussion titles, content, and reply tracking.

The schema uses UUID primary keys and establishes relationships through foreign keys, designed for scalability and data integrity.

### Authentication & Authorization
The current implementation includes foundational user management structures with username/email-based identification. The system is architected to accommodate university single sign-on systems and role-based access control for different user types (students, faculty, administrators).

### Component Architecture
The frontend implements a hierarchical component structure with clear separation of concerns:

**Page Components**: Route-level components (Home, Profile, Discussions) that coordinate multiple feature components and handle page-specific state.

**Feature Components**: Domain-specific components like CourseCard, CourseFilter, and AIRecommendationChat that encapsulate business logic and user interactions.

**UI Components**: Reusable, design-system components from shadcn/ui that provide consistent styling and behavior across the application.

**Example Components**: Includes comprehensive example implementations for all major components, facilitating development and testing.

## External Dependencies

**Database**: Uses Neon Database (PostgreSQL) as the primary data store with Drizzle ORM for type-safe database operations and migrations.

**Authentication**: Structured to integrate with university authentication systems, currently using session-based authentication with connect-pg-simple for PostgreSQL session storage.

**UI Framework**: Radix UI provides accessible component primitives, while Tailwind CSS handles styling and responsive design.

**Development Tools**: Vite for frontend bundling and development server, ESBuild for production builds, TypeScript for type safety, and various development utilities including runtime error overlays and source mapping.

**State Management**: TanStack React Query for server state management, providing caching, background updates, and optimistic updates for better user experience.

**Form Handling**: React Hook Form with Zod resolvers for type-safe form validation and submission.

**Fonts & Assets**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono) for typography, with support for custom asset handling.

**Production Deployment**: Configured for Node.js production deployment with proper environment variable management and static file serving.