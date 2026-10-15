# sadiq-ai.dev

Personal portfolio and resume site for Sadiq Hasan — AI Engineer building Generative AI retrieval and agent systems.

**Live:** [sadiq-ai.dev](https://sadiq-ai.dev)

## Stack

- React + Create React App
- SCSS (custom design system, no UI framework)
- Vercel (hosting) + Cloudflare (DNS)

## Sections

- Hero / intro
- About
- Skills
- Experience
- Projects
- Education
- Contact

## Development

```bash
npm install
npm start      # dev server
npm run build  # production build
```

## Structure

- `src/portfolio.js` — all page content (name, bio, skills, experience, projects, contact)
- `src/containers/` — page sections
- `src/components/` — shared UI components
- `src/theme.scss` — color tokens (light/dark mode)
- `resume/resume.tex` — LaTeX resume source; compile with `tectonic resume.tex`, then copy the output to `public/resume.pdf` (see `resume/README.md`)
- `public/` — static assets, SEO meta, sitemap

## Deployment

Pushes to `main` auto-deploy via Vercel. `vercel.json` redirects `/cv` → `/` (307) so resume-driven traffic is distinguishable from organic traffic in analytics.
