# Course Recommender & Rating Website Design Guidelines

## Design Approach
**Design System Approach**: Using a clean, utility-focused design inspired by educational platforms like Canvas and modern course platforms like Coursera. The interface prioritizes information density, readability, and efficient navigation for academic content.

**Design Principles**:
- Information clarity and academic professionalism
- Efficient course discovery and comparison
- Community-driven trust through ratings and reviews
- AI-powered personalization without overwhelming the interface

## Core Design Elements

### A. Color Palette
**Primary Colors**: 
- Deep blue (220 85% 25%) for primary actions and University branding
- Light blue (220 60% 95%) for subtle backgrounds

**Secondary Colors**:
- Neutral grays (220 10% 95%, 220 15% 20%) for text and borders
- Success green (142 76% 36%) for positive ratings
- Warning amber (43 96% 56%) for moderate ratings
- Error red (0 84% 60%) for critical information

**Dark Mode**: Deep navy backgrounds (220 30% 8%) with light text (220 20% 95%)

### B. Typography
**Primary Font**: Inter from Google Fonts for excellent readability
**Sizes**: 
- Headers: text-2xl to text-4xl (bold)
- Body: text-base (regular)
- Captions: text-sm (medium)

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, and 16
- Cards: p-6, gap-4
- Sections: py-12, px-4
- Components: m-2, p-4

### D. Component Library

**Navigation**: 
- Clean horizontal navbar with University logo
- Sidebar navigation for course categories and filters
- Breadcrumb navigation for course hierarchy

**Course Cards**:
- Compact cards showing course code, title, rating stars, and quick stats
- Hover states revealing course description preview
- Color-coded difficulty indicators

**Rating System**:
- 5-star visual rating with half-star precision
- Rating distribution bars
- Review cards with student avatars and course completion status

**AI Chat Interface**:
- Floating chat button in bottom-right
- Clean chat bubble design with course suggestion cards
- Quick suggestion chips for common queries

**Forms**:
- Clean input fields with floating labels
- Multi-step course review forms
- Advanced search filters with clear categorization

**Data Displays**:
- Course prerequisite trees
- Progress tracking dashboards
- Recommendation grids with reasoning explanations

**Overlays**:
- Course detail modals with tabbed content
- AI recommendation explanations
- Student profile overlays

### E. Animations
Minimal and purposeful:
- Smooth transitions for rating interactions
- Gentle hover effects on course cards
- Loading states for AI recommendations

## Images
No large hero image needed. Focus on:
- University of Adelaide logo in navigation
- Student avatar placeholders for reviews
- Course category icons using Heroicons
- Rating star icons and progress indicators
- Small thumbnail images for course categories if available

This design prioritizes academic professionalism while maintaining modern usability standards for effective course discovery and community engagement.