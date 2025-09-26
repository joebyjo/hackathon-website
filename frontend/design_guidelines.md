# SmartCourse Advisor Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern educational platforms like Notion, Linear, and Coursera. This utility-focused application prioritizes clarity, efficiency, and student-centered design while maintaining visual appeal for engagement.

## Core Design Principles
- **Student-First Design**: Clean, approachable interface that reduces cognitive load
- **Information Hierarchy**: Clear visual distinction between course data, ratings, and recommendations
- **Trust & Credibility**: Professional appearance that instills confidence in AI recommendations

## Color Palette
**Primary Colors:**
- Brand Primary: 219 94% 68% (vibrant blue for trust and education)
- Dark Mode Primary: 219 84% 78%

**Supporting Colors:**
- Success (ratings): 142 76% 36% (green for positive feedback)
- Warning (difficulty): 38 92% 50% (amber for moderate difficulty)
- Error (prerequisites): 0 72% 51% (red for warnings)
- Neutral Gray: 220 9% 46% (for secondary text and borders)

**Background Treatments:**
- Light mode: Clean white with subtle gray (210 40% 98%)
- Dark mode: Rich charcoal (222 84% 5%) with lighter panels (217 32% 17%)

## Typography
**Font Stack:** Inter from Google Fonts
- Headings: Inter 600-700 (semibold to bold)
- Body text: Inter 400-500 (regular to medium)
- Course codes/technical: Inter 500 (medium, slightly smaller)
- AI chat: Inter 400 (conversational tone)

## Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, and 8
- Micro spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, m-4 (16px) 
- Section spacing: p-6, my-6 (24px)
- Major spacing: p-8, mb-8 (32px)

## Component Library

**Navigation:**
- Fixed top navigation with subtle shadow
- Clean horizontal layout with active state indicators
- Mobile: Hamburger menu with slide-out drawer

**Course Cards:**
- Clean white/dark cards with subtle shadows
- Star ratings prominently displayed
- Tag pills with rounded corners and muted colors
- Hover states with gentle elevation

**Search & Forms:**
- Rounded input fields with focus states
- Dropdown suggestions with smooth animations
- Form validation with inline feedback

**AI Chat Interface:**
- Conversational bubble design
- Distinct styling for bot vs user messages
- Input area with send button and typing indicators

**Modals & Overlays:**
- Course detail modals with smooth transitions
- Backdrop blur effect
- Scrollable content areas with custom scrollbars

## Landing Page Design

**Hero Section:**
- Single viewport height with centered content
- Bold headline: "Smarter Course Choices. Powered by Students + AI."
- Subtle gradient background (219 94% 68% to 219 94% 58%)
- Two prominent CTA buttons with contrasting styles

**Additional Sections:**
1. **Features Overview** (3 columns): Course ratings, AI recommendations, credit transfers
2. **Social Proof**: Student testimonials with course success stories
3. **Getting Started**: Simple 3-step process visualization

**Visual Elements:**
- Minimalist illustrations of students and course materials
- Subtle geometric patterns in background
- No large hero image - focus on typography and clean layout

## Images
No large hero images required. Use:
- Small illustrative icons for features (students, AI, books)
- Profile avatars for testimonials (placeholder circles with initials)
- Course thumbnail placeholders (rectangular with subject icons)

## Responsive Behavior
- Desktop: Multi-column layouts, expanded course cards
- Tablet: Adapted grid systems, collapsible sidebars
- Mobile: Single column, bottom navigation for key actions, swipe gestures for course cards

## Accessibility
- Consistent dark mode across all components including form inputs
- High contrast ratios for text and interactive elements
- Screen reader friendly course rating systems
- Keyboard navigation for all interactive elements

This design system creates a professional, student-friendly platform that balances functionality with visual appeal, ensuring students can efficiently discover and plan their courses with confidence.
