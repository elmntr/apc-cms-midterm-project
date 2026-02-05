# The Unseen Journey - Personal Biography CMS

A **Next.js + TypeScript** full-stack CMS for managing a personal biography website with a high-fidelity, minimalist design.

## Features

✨ **Modern Design**
- Clean, minimalist aesthetic with slate gray, navy blue, and white color palette
- Responsive grid-based layouts
- Smooth transitions and hover effects
- Playfair Display for headings, Inter for body text

📸 **Photo Gallery Management**
- Childhood gallery (birth to Grade 6) - 3-column grid
- College section - masonry layout
- API endpoints for managing photos with captions, dates, and descriptions

🎯 **Interactive Timeline**
- Visual timeline connecting sections
- Dotted line through "The Gap" area
- Styled with slate gray and navy blue

⚙️ **API-Based CMS**
- RESTful endpoints for managing all content
- Manage photos across sections
- Edit hobbies in "The Gap" section
- Customize site settings (headings, quotes, URLs)
- No admin UI - manage via API calls

## Project Structure

```
The-Unseen-Journey/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Google Fonts
│   │   ├── page.tsx            # Main biography page
│   │   ├── globals.css         # Global styles & animations
│   │   ├── api/
│   │   │   ├── photos/         # Photo management API
│   │   │   ├── hobbies/        # Hobby management API
│   │   │   ├── settings/       # Site settings API
│   │   │   └── contact/        # Contact form API
│   │   └── admin/              # Admin dashboard
│   │       ├── layout.tsx      # Admin layout with sidebar
│   │       ├── page.tsx        # Admin dashboard home
│   │       ├── photos/         # Photo management page
│   │       ├── hobbies/        # Hobby management page
│   │       └── settings/       # Settings management page
│   └── components/
│       ├── Navigation.tsx      # Fixed navigation bar
│       ├── HeroSection.tsx     # Split-screen hero with photos
│       ├── ChildhoodGallery.tsx # 3-column photo grid
│       ├── GapSection.tsx      # Dark section with quote & hobbies
│       ├── CollegeSection.tsx  # Masonry gallery
│       ├── Timeline.tsx        # Visual timeline element
│       └── Footer.tsx          # Contact form & footer
├── prisma/
│   └── schema.prisma           # Database models (MongoDB ready)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example

```

## Design Specifications

### Color Palette
- **Slate Gray**: #708090
- **Navy Blue**: #000080
- **White**: #FFFFFF

### Typography
- **Headings**: Playfair Display (serif, bold)
- **Body**: Inter (sans-serif)

### UI Elements
- **Buttons**: Pill-shaped with subtle drop shadow
- **Image Frames**: Rounded corners (12px)
- **Gallery**: 3-column grid (childhood), masonry (college)

### Sections
1. **Navigation Bar** - Fixed top nav with links & Admin button
2. **Hero Section** - Split-screen with placeholder photos & "From Then to Now"
3. **Childhood Gallery** - 3-column grid with rounded frames
4. **Timeline** - Dotted line connecting sections
5. **Gap Section** - Dark theme, large serif quote, hobby icons
6. **College Section** - Masonry layout with captions & dates
7. **Footer** - Contact form & links

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd The-Unseen-Journey
npm install
```

### Environment Setup

Create a `.env.local` file:

```bash
DATABASE_URL="mongodb://localhost:27017/the-unseen-journey"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` for the main site and `http://localhost:3000/admin` for the CMS.

### Build & Deploy

```bash
npm run build
npm start
```

## API Routes

### Photos
- `GET /api/photos` - Get all photos
- `GET /api/photos?section=childhood` - Get photos by section
- `POST /api/photos` - Create new photo
- `DELETE /api/photos/[id]` - Delete photo

### Hobbies
- `GET /api/hobbies` - Get all hobbies
- `POST /api/hobbies` - Create hobby
- `DELETE /api/hobbies/[id]` - Delete hobby

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update settings

### Contact
- `POST /api/contact` - Submit contact form

## Database Models (Prisma + MongoDB)

- **GalleryPhoto**: Photos with metadata
- **TimelineEvent**: Timeline milestones
- **Hobby**: Gap section hobbies
- **ContactInfo**: Messages from contact form
- **BiographySettings**: Site configuration

## Styling

Built with **Tailwind CSS** for responsive, utility-first styling.

Key CSS features:
- Pill-shaped buttons with hover effects
- Rounded image frames
- Timeline with dotted line pattern
- Responsive grid layouts
- Smooth transitions

## Future Enhancements

- [ ] Database integration (MongoDB via Prisma)
- [ ] Image upload/storage (AWS S3 or Cloudinary)
- [ ] Authentication for admin panel
- [ ] Email notifications for contact form
- [ ] SEO optimization
- [ ] Social media sharing

## License

MIT

---

**Built with Next.js 14, React 18, TypeScript, and Tailwind CSS**
