# Personal Portfolio (Jamstack, Next.js App Router + Tailwind)

## 1) Stack rationale
This project uses **Option A (Jamstack)**: Next.js App Router + Tailwind + markdown content + serverless API routes on Vercel. It is the best fit for a portfolio because content-heavy pages can be pre-rendered for speed and SEO, while dynamic needs (contact form, optional project CRUD) are handled by secure serverless routes without maintaining a full backend.

## 2) High-level architecture (components + data flow)
```text
Browser
  -> Vercel Edge CDN
    -> Next.js App Router pages (SSG/ISR for Home, About, Projects, Blog, Resume)
    -> Markdown content loader (content/projects, content/posts)
    -> API routes (/api/contact, /api/projects)
       -> Validation (Zod) + honeypot anti-spam
       -> Resend email API (contact forwarding)

Optional future extension:
  API routes -> Prisma -> PostgreSQL
```

## 3) Third-party libraries/services
- **Next.js**: routing, metadata, static generation, serverless APIs.
- **Tailwind CSS**: consistent design system and responsive UI.
- **gray-matter**: frontmatter parsing for markdown content.
- **react-markdown + remark-gfm**: markdown rendering with GFM support.
- **zod**: request validation for APIs.
- **Resend**: contact form email forwarding.
- **Vitest**: fast route/schema unit testing.
- **Vercel**: hosting, previews, CDN, image optimization.

## 4) Security considerations and mitigations
- HTTPS by default on Vercel + custom domain TLS.
- Security headers via `middleware.ts` (CSP, XFO, Referrer-Policy, no-sniff, permissions policy).
- Input validation with Zod in contact/project APIs.
- Honeypot spam protection for contact form.
- Secret management via environment variables (`.env.example` included).
- Admin write endpoint protected by `ADMIN_API_TOKEN` header.
- No client-side secrets.

## 5) Accessibility + SEO plan
- Semantic HTML (`header`, `nav`, `main`, `article`, `footer`).
- Keyboard-friendly forms and links.
- High-contrast dark-first palette.
- Metadata + sitemap + robots.
- Structured content model (title, excerpt, tags, dates) for better indexing.
- Progressive enhancement: content remains readable without JS.

## 6) Performance plan
- Static pre-rendering for markdown pages.
- Route-level code splitting by App Router.
- CDN edge caching via Vercel.
- Keep JS minimal; render mostly server components.
- Use modern image formats in `/public/images` (WebP/AVIF recommended).
- Target Lighthouse: Perf >= 90, SEO >= 95, A11y >= 95.

## 7) Privacy/compliance notes
- No tracking cookies by default.
- Privacy page included.
- If GA or cookie-based analytics are enabled, add opt-in cookie consent banner for GDPR/CCPA compliance.

## Project structure
```text
.
├─ app/
│  ├─ api/
│  │  ├─ contact/route.ts
│  │  └─ projects/
│  │     ├─ route.ts
│  │     └─ [slug]/route.ts
│  ├─ about/page.tsx
│  ├─ blog/page.tsx
│  ├─ blog/[slug]/page.tsx
│  ├─ contact/page.tsx
│  ├─ projects/page.tsx
│  ├─ projects/[slug]/page.tsx
│  ├─ resume/page.tsx
│  ├─ privacy/page.tsx
│  ├─ feed.xml/route.ts
│  ├─ robots.ts
│  ├─ sitemap.ts
│  ├─ error.tsx
│  ├─ not-found.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
├─ content/
│  ├─ projects/*.md
│  └─ posts/*.md
├─ lib/
├─ prisma/schema.prisma
├─ tests/validation.test.ts
├─ .github/workflows/ci.yml
└─ middleware.ts
```

## Design system defaults
- **Colors**: `bg #0a0a0f`, `surface #11131a`, `text #e6eaf2`, `muted #9aa4b5`, `accent #6ee7ff`
- **Typography**: Inter (UI), JetBrains Mono (labels/code)
- **Spacing scale**: Tailwind spacing system (`p-2`, `p-4`, `p-6`, `gap-4`)
- **Components**: button, cards, nav, content containers

### 3 UI layout variations included
1. **Grid project gallery**: `/projects`
2. **Immersive project detail layout**: `/projects/[slug]`
3. **Blog listing + detail layout**: `/blog`, `/blog/[slug]`

## Local development
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build + run
```bash
npm run build
npm run start
```

## Tests
```bash
npm run test
npm run lint
```

## Deployment (Vercel)
```bash
npm i -g vercel
vercel
vercel --prod
```

## Required environment variables
See `.env.example`:
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `ADMIN_API_TOKEN`
- optional `DATABASE_URL`

## Milestone implementation plan (estimate)
1. Discovery + content inventory: **0.5 day**
2. UI system + wireframes: **1 day**
3. Frontend pages + markdown model: **1.5 days**
4. Contact API + validation + security headers: **0.5 day**
5. SEO/accessibility/performance pass: **0.5 day**
6. Tests + CI/CD + deployment: **0.5 day**
7. Content migration + polish: **0.5 day**

## Inputs needed from you
- Bio and resume text
- Project entries + screenshots + demo/repo links
- Social/profile links
- Domain name + Vercel account access
- Optional logo/brand assets

## Handoff checklist
- [x] Source code + routes + API handlers
- [x] Markdown sample content
- [x] Contact email forwarding setup
- [x] Security middleware
- [x] CI workflow
- [x] Tests
- [x] Prisma schema (future dynamic expansion)
- [x] Deployment and admin documentation

## Admin guide (Git/Markdown workflow)
1. Add a new project markdown file under `content/projects/your-slug.md`.
2. Use frontmatter fields: `title`, `summary`, `tech`, `tags`, `demoUrl`, `repoUrl`.
3. Add blog post markdown to `content/posts/` with `title`, `excerpt`, `date`, `tags`.
4. Commit + push to main branch; Vercel redeploys automatically.
5. Validate in preview URL before production merge.
