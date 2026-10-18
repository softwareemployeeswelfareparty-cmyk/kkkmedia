# KKK Media — Dynamic Tamil News & Blog CMS

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-5a67d8.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-black.svg)]()

> **KKK Media** is a modern, production-ready, dynamic Tamil digital news portal and content management system (CMS) engineered with HTML5, CSS3, ES6+ JavaScript, Node.js, Express.js, PostgreSQL, and Prisma ORM.

---

## 🌟 Key Features

### 1. Public Digital News Portal
- **Brand Identity:** High-impact KKK Media branding with deep red (`#c8102e`), white, charcoal (`#121417`), and neutral grey editorial design.
- **Tamil Typography:** Responsive, high-readability typography using Google Fonts (`Noto Sans Tamil` and `Mukta Malar`).
- **Breaking News Ticker:** Animated live ticker with auto-rotation, pulse indicator, and pause-on-hover.
- **Featured News Hero Grid:** Magazine-style hero section featuring large main story and side headline cards.
- **Trending Stories:** Auto-ranked trending widget based on real article view counts.
- **Instant Search:** Full-text keyword and headline search with pagination.
- **Mobile-First Navigation:** Sticky category navigation bar with slide-out drawer on mobile screens.
- **Full Article Experience:**
  - Semantic HTML5 structure
  - Breadcrumb navigation
  - Author profile and reading time calculation
  - One-click social sharing: WhatsApp, X (Twitter), Facebook, Telegram, and Copy Link
  - Tag cloud pills and related articles recommendation engine
- **Static Legal & Information Pages:**
  - About Us (`/about`)
  - Contact Us (`/contact`) with feedback form
  - Privacy Policy (`/privacy-policy`) compliant with Google AdSense and GDPR standards
  - Terms and Conditions (`/terms`)
  - Disclaimer & Editorial Standards (`/disclaimer`)

### 2. Powerful Admin CMS Portal (`/admin`)
- **Dashboard Overview:** Real-time statistics counters (Total Articles, Published, Drafts, Scheduled, Categories, Total Views) and system audit logs.
- **Editorial Workflow:**
  - Write articles in Tamil and English with auto-generating URL slugs
  - Rich-text editor formatting toolbar (H2, H3, Bold, Italic, Blockquote, Lists)
  - Cover image uploader with drag-and-drop, instant preview, and image Alt text
  - Tag chips generator with comma/Enter key support
  - Publication states: **Draft**, **Publish Immediately**, and **Schedule for Future Publication**
  - Toggle **Featured Story** (hero placement) and **Breaking News** (ticker placement)
- **Category Management:** Create, edit, reorder, and safely delete categories (preventing deletion if articles are linked).
- **Media Asset Library:** Upload, inspect, preview, and copy image CDN/local URLs.
- **Site Settings Panel:** Configure site tagline, contact phone/email/address, social media handles, and Google AdSense toggle/client ID.
- **Security & Profile:** BCrypt password hashing, session cookies, and self-service password changing.

### 3. SEO & Google AdSense Readiness
- **Server-Side Rendered (SSR):** Fast First Contentful Paint (FCP) and full search engine indexability with Express + EJS.
- **NewsArticle JSON-LD Schema:** Embedded on all article pages with headline, image, author, datePublished, and dateModified.
- **BreadcrumbList JSON-LD Schema:** Embedded for clear Google search snippet hierarchies.
- **OpenGraph & Twitter Cards:** Dynamic social sharing cards for Facebook, WhatsApp, LinkedIn, and X.
- **Dynamic Sitemap:** `http://localhost:3000/sitemap.xml` generated automatically from published articles and categories.
- **Dynamic Robots.txt:** `http://localhost:3000/robots.txt` protecting admin paths while granting full access to public news.
- **Configurable Ad Slots:** Compliant with Google Publisher Policies (Top Leaderboard, In-Article, and Sticky Sidebar).

---

## 🗄️ Database Architecture

The relational database is architected with PostgreSQL and mapped via **Prisma ORM**:

```mermaid
erDiagram
    User ||--o{ Article : writes
    User ||--o{ MediaAsset : uploads
    User ||--o{ AuditLog : performs
    Category ||--o{ Article : contains
    Article ||--o{ ArticleTag : tagged_with
    Tag ||--o{ ArticleTag : categorizes

    User {
        int id PK
        string email UK
        string passwordHash
        string name
        string role
        string avatar
        string bio
        datetime createdAt
        datetime updatedAt
    }

    Category {
        int id PK
        string nameTamil
        string nameEnglish
        string slug UK
        string description
        int displayOrder
        boolean isActive
    }

    Article {
        int id PK
        string title
        string slug UK
        string shortDescription
        string fullContent
        string featuredImage
        string imageAlt
        int categoryId FK
        int authorId FK
        string status
        boolean isFeatured
        boolean isBreaking
        int viewCount
        string seoTitle
        string seoDescription
        datetime publishedAt
        datetime scheduledDate
    }

    Tag {
        int id PK
        string name UK
        string slug UK
    }

    ArticleTag {
        int articleId PK, FK
        int tagId PK, FK
    }

    MediaAsset {
        int id PK
        string filename
        string originalName
        string mimeType
        int size
        string url
        string altText
        int uploaderId FK
    }

    SiteSetting {
        int id PK
        string key UK
        string value
        string group
    }

    AuditLog {
        int id PK
        int userId FK
        string action
        string entity
        string entityId
        string details
        string ipAddress
        datetime createdAt
    }
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **PostgreSQL**: Local installation OR Docker

### 1. Clone & Install Dependencies
```bash
cd kkkmedia
npm install
```

### 2. Environment Configuration
Copy the example configuration:
```bash
cp .env.example .env
```

#### Option A: Supabase (Recommended for Permanent Free Cloud Database & Storage)
1. Create a free project on [Supabase](https://supabase.com).
2. Go to **Project Settings** > **Database**:
   - Copy **URI (Transaction Pooler - port 6543)** into `DATABASE_URL`
   - Copy **URI (Direct Connection - port 5432)** into `DIRECT_URL`
3. (Optional) In **Storage**, create a public bucket named `kkkmedia` and copy your project URL and Anon key into `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_STORAGE_BUCKET="kkkmedia"
```

#### Option B: Local Development / Fallback
```env
DATABASE_URL="file:./dev.db"
```

### 3. Start PostgreSQL (with Docker Compose)
If you have Docker installed, spin up PostgreSQL 16 and pgAdmin in 1 command:
```bash
docker compose up -d
```
- PostgreSQL: `localhost:5432`
- pgAdmin Web UI: `http://localhost:5050` (Email: `admin@kkkmedia.com`, Password: `adminpassword`)

### 4. Synchronize Database & Seed Rich Tamil Content
```bash
# Push schema to database
npm run db:sync

# Seed realistic Tamil news articles, categories, settings, and admin accounts
npm run db:seed
```

### 5. Launch the Application
```bash
# Development mode with hot-reloading:
npm run dev

# Production mode:
npm start
```

Open your browser:
- 🌐 **Public Tamil News Portal:** [http://localhost:3000/](http://localhost:3000/)
- 🛡️ **Admin CMS Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- 🗺️ **Dynamic XML Sitemap:** [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)
- 🤖 **Robots.txt:** [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)

---

## 🔑 Default Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin / Chief Editor** | `admin@kkkmedia.com` | `Admin@KKKMedia2026!` |
| **Journalist / Senior Editor** | `editor@kkkmedia.com` | `Editor@KKKMedia2026!` |

*(Remember to change passwords in `/admin/profile` upon production deployment)*

---

## 📡 REST API Documentation

All endpoints return uniform JSON responses: `{ success: true, data: ... }`.

### Authentication
- `POST /api/auth/login` — Sign in with email and password (rate-limited, returns JWT token & HTTP-only cookie).
- `POST /api/auth/logout` — Clear session cookie.
- `GET /api/auth/me` — Get current logged-in user details.
- `PUT /api/auth/profile` — Update user name, bio, and change password.

### Articles
- `GET /api/articles?page=1&limit=10&categoryId=1&status=PUBLISHED&search=விஜய்` — List articles with filters and pagination.
- `GET /api/articles/:id` — Get full article by ID.
- `POST /api/articles` — Create article (Requires JWT).
- `PUT /api/articles/:id` — Update article (Requires JWT).
- `DELETE /api/articles/:id` — Delete article (Requires JWT).
- `PATCH /api/articles/:id/toggle-featured` — Toggle featured homepage flag.
- `PATCH /api/articles/:id/toggle-breaking` — Toggle breaking news ticker flag.

### Categories
- `GET /api/categories` — List active categories with published article counts.
- `POST /api/categories` — Create category (Admin/Editor).
- `PUT /api/categories/:id` — Update category (Admin/Editor).
- `DELETE /api/categories/:id` — Delete category (Admin only).
- `POST /api/categories/reorder` — Update display ordering of categories.

### Media Uploads
- `POST /api/media/upload` — Upload image file (Multipart form, validates MIME & max 5MB size).
- `GET /api/media` — List uploaded assets with pagination.
- `DELETE /api/media/:id` — Delete media file and database record.

### Site Settings & Statistics
- `GET /api/settings` — Get all site settings.
- `PUT /api/settings` — Bulk update site settings (Admin only).
- `GET /api/stats/dashboard` — Get dashboard counters, views, and audit log feed.

---

## 🧪 Automated Testing

KKK Media includes automated unit and integration tests powered by **Jest** and **Supertest**:

```bash
npm test
```

Test coverage includes:
- Homepage rendering with KKK Media branding
- Category navigation routes
- Dynamic XML sitemap and robots.txt generation
- Centralized 404 handler
- REST API pagination and article filtering
- Secure authentication and invalid credential rejection
- JWT token issuing

---

## 🔒 Security Best Practices Implemented

1. **Password Hashing:** Passwords hashed with BCrypt (10 rounds).
2. **HTTP-only Cookies:** Tokens stored in secure HTTP-only cookies to eliminate XSS token theft.
3. **HTML Sanitization:** Article bodies sanitized using `sanitize-html` to prevent script injection.
4. **Rate Limiting:** Brute-force protection on `/api/auth/login` (10 requests per 15 mins) and API rate limiting via `express-rate-limit`.
5. **Security Headers:** Strict HTTP response headers using `helmet`.
6. **File Upload Security:** Strict MIME type validation (JPEG, PNG, WEBP, GIF, SVG) and file size restrictions (5MB).
7. **Relational Constraints:** Cascading deletions and foreign key restrictions prevent orphaned records.
8. **Audit Trail:** Admin actions (Login, Create, Update, Delete) are logged with timestamp, user ID, and IP address.

---

## 🚢 Production Deployment Guide

### Deploying to Render / Railway / DigitalOcean

1. **Provision a PostgreSQL Database:**
   - Create a database on Neon, Supabase, AWS RDS, or Render PostgreSQL.
2. **Set Environment Variables:**
   - Set `NODE_ENV=production`
   - Set `DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"`
   - Set `JWT_SECRET` and `COOKIE_SECRET` to secure 64-character random strings.
   - Set `APP_URL="https://yourdomain.com"`
3. **Build & Migration Command:**
   ```bash
   npm run db:sync && npm run db:seed
   ```
4. **Start Command:**
   ```bash
   npm start
   ```

---

## 📄 License
This project is licensed under the ISC License. Built with ❤️ for Tamil digital journalism.
