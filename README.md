# 🤖 Ai Nest - AI-Powered Digital Agency Website

> **Build Smarter. Design Better.**

A modern, responsive website for Ai Nest, an AI-powered digital agency specializing in intelligent automation, web development, and innovative digital solutions.

![Ai Nest Website](https://via.placeholder.com/1200x600/6366f1/ffffff?text=Ai+Nest+Website)

## ✨ Features

### 🎨 **Modern Design**
- **Liquid Glass Aesthetic** - Apple-inspired design with backdrop-blur effects
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **Responsive Design** - Mobile-first approach with perfect cross-device compatibility
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions

### 🚀 **Performance & UX**
- **Next.js 14** - Latest App Router with server-side rendering
- **TypeScript** - Full type safety throughout the application
- **Optimized Images** - Next.js Image component with lazy loading
- **SEO Optimized** - Meta tags, Open Graph, and structured data

### 💾 **Backend Integration**
- **Supabase Database** - Real-time data with PostgreSQL
- **Dynamic Content** - All content managed through database
- **Form Handling** - Contact forms and newsletter signup
- **Type-Safe APIs** - Full TypeScript integration with database

### 🌍 **Internationalization**
- **Currency Converter** - GHS/USD toggle with localStorage persistence
- **Localized Content** - Ghana-focused with international support

## 🏗️ **Architecture**

\`\`\`
ai-nest-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   ├── contact/           # Contact page
│   ├── pricing/           # Pricing page
│   ├── projects/          # Portfolio/case studies
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── hero-section.tsx  # Homepage hero
│   ├── footer.tsx        # Site footer
│   └── ...               # Other components
├── contexts/             # React contexts
│   └── currency-context.tsx
├── lib/                  # Utilities and configurations
│   ├── supabase.ts      # Database client
│   └── utils.ts         # Helper functions
└── scripts/             # Database scripts
    ├── 01-create-tables.sql
    └── 02-seed-data.sql
\`\`\`

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone & Install
\`\`\`bash
git clone <repository-url>
cd ai-nest-website
npm install
\`\`\`

### 2. Environment Setup
Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 3. Database Setup
1. Create a new Supabase project
2. Run the SQL scripts in order:
   - `scripts/01-create-tables.sql`
   - `scripts/02-seed-data.sql`

### 4. Development
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the website.

## 📊 **Database Schema**

### Tables Created
- **pricing_plans** - Service pricing tiers
- **testimonials** - Client testimonials
- **case_studies** - Portfolio projects
- **blog_posts** - Blog articles
- **team_members** - Team profiles
- **contact_submissions** - Contact form data
- **newsletter_subscribers** - Email subscribers
- **add_ons** - Additional services

### Sample Data Included
- 3 pricing plans (Starter, Pro, Enterprise)
- 4 client testimonials
- 4 case studies
- 3 blog posts
- 4 team members
- 6 add-on services

## 🎨 **Design System**

### Color Palette
- **Primary**: Blue to Purple gradient
- **Secondary**: Various accent gradients
- **Glass Effects**: Backdrop-blur with transparency
- **Dark Mode**: Automatic system detection

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text
- **Body**: Regular weight with proper line height
- **Code**: Monospace for technical content

### Components
- **Glass Cards** - Translucent containers
- **Gradient Buttons** - Eye-catching CTAs
- **Animated Elements** - Smooth hover effects
- **Responsive Grids** - Flexible layouts

## 📱 **Pages Overview**

### 🏠 **Homepage**
- Hero section with animated elements
- Services carousel (desktop grid, mobile slider)
- Client testimonials slider
- Featured case studies
- Newsletter signup

### 🛠️ **Services**
- Detailed service descriptions
- Process workflow
- FAQ section
- Technology stack showcase

### 💰 **Pricing**
- Dynamic pricing from database
- Monthly/yearly toggle
- Add-ons showcase
- Currency conversion

### 📁 **Projects**
- Portfolio gallery
- Category filtering
- Search functionality
- Individual project pages

### 📝 **Blog**
- Article listing
- Category filtering
- Search functionality
- Individual blog posts
- Related articles

### 👥 **About**
- Company mission
- Core values
- Team profiles
- Company statistics

### 📞 **Contact**
- Contact form with validation
- Company information
- Response time guarantee
- Success/error handling

## 🔧 **Development**

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks (optional)

### Performance
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic with Next.js
- **Lazy Loading** - Components and images
- **Bundle Analysis** - Built-in analyzer

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

### Environment Variables
\`\`\`env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

## 📈 **SEO & Analytics**

### SEO Features
- Meta tags for all pages
- Open Graph images
- Structured data
- Sitemap generation
- Robot.txt

### Analytics Ready
- Google Analytics integration ready
- Custom event tracking
- Performance monitoring
- User behavior tracking

## 🔒 **Security**

### Best Practices
- Environment variables for secrets
- Supabase Row Level Security (RLS)
- Input validation with Zod
- XSS protection
- CSRF protection

## 🤝 **Contributing**

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use meaningful component names
- Write descriptive commit messages
- Add comments for complex logic

## 📋 **Roadmap**

### Phase 1 ✅ (Completed)
- [x] Core website structure
- [x] All main pages
- [x] Database integration
- [x] Responsive design
- [x] Basic SEO

### Phase 2 🚧 (In Progress)
- [ ] Admin dashboard
- [ ] User authentication
- [ ] Advanced blog features
- [ ] Email automation

### Phase 3 📅 (Planned)
- [ ] AI chatbot integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Performance optimization

## 🐛 **Troubleshooting**

### Common Issues

**Database Connection**
\`\`\`bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
\`\`\`

**Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

**Styling Issues**
\`\`\`bash
# Rebuild Tailwind
npm run dev
\`\`\`

## 📞 **Support**

- **Documentation**: Check this README
- **Issues**: Create GitHub issue
- **Email**: hello@ainest.com
- **Website**: [ainest.com](https://ainest.com)

## 📄 **License**

This project is proprietary software owned by Ai Nest. All rights reserved.

---

**Built with ❤️ by the Ai Nest team**

*Build Smarter. Design Better.*

## 🎉 **Complete Website Delivered**

### ✅ **All Pages Built**
- **Homepage** - Hero, services carousel, testimonials, case studies, newsletter
- **Services** - Detailed descriptions, process flow, FAQ
- **Pricing** - Dynamic pricing with currency converter, add-ons
- **Projects** - Portfolio with filtering and individual project pages
- **Blog** - Article listing and individual blog posts
- **About** - Team profiles, company values, mission
- **Contact** - Full contact form with Supabase integration

### ✅ **Advanced Features**
- **Liquid Glass Design** - Apple-inspired aesthetic throughout
- **Dark/Light Mode** - Seamless theme switching
- **Currency Converter** - GHS/USD toggle with persistence
- **Responsive Design** - Perfect on all devices
- **Smooth Animations** - Framer Motion throughout
- **SEO Optimized** - Meta tags, Open Graph, structured data

### ✅ **Backend Integration**
- **Complete Database Schema** - 8 tables with relationships
- **Seeded Sample Data** - Ready for immediate testing
- **Type-Safe APIs** - Full TypeScript integration
- **Form Handling** - Contact forms and newsletter signup
- **Real-time Data** - Dynamic content from Supabase

### ✅ **Documentation**
- **Comprehensive README** - Setup, deployment, and usage
- **Detailed Changelog** - All features and changes tracked
- **Database Scripts** - Easy setup and seeding

The website is **production-ready** and can be deployed to Vercel immediately after adding your Supabase credentials. The design perfectly captures the "Build Smarter. Design Better." brand identity with a modern, professional aesthetic that showcases AI expertise.
