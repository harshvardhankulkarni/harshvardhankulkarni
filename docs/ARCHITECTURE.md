<!-- GSD -->

# GitHub Profile — Architecture

## Context and Goals

GitHub profile repository for Harshvardhan Kulkarni. The README.md auto-displays on the GitHub profile page (github.com/harshvardhankulkarni). The index.html is a portfolio-style personal site hosted on GitHub Pages with a dark animated theme.

## Architecture

Two-file static site. No build tools, no dependencies, no server-side processing.

## Components

| File | Role |
|------|------|
| `README.md` | GitHub profile README (auto-displays on profile page) |
| `index.html` | Portfolio-style personal site with animated dark theme |

## Profile Site Features (index.html)

- Animated gradient orbs in background
- Typing effect on hero headline
- Glassmorphism card design
- Scroll-triggered animations
- Sections: hero, about, skills grid, experience timeline, project cards, soft skills, contact form

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Dark theme (#0a0a0f background) | Modern, professional appearance |
| Glassmorphism cards | Visual depth without heavy graphics |
| Single HTML file | No build tools, easy to maintain |
| Google Fonts CDN | Typography without hosting fonts |
| Inline CSS/JS | Zero dependencies, instant page load |

## Trade-offs

- Inline CSS limits maintainability for larger sites
- No JavaScript framework — animations are custom vanilla JS
- No SSR or templating — manual HTML updates
- CDN fonts require internet access

## File Organization

```
profile-readme/
├── README.md         # GitHub profile README
├── index.html        # Animated portfolio site
└── docs/
    ├── ARCHITECTURE.md
    ├── GETTING-STARTED.md
    ├── DEVELOPMENT.md
    ├── TESTING.md
    └── CONFIGURATION.md
```
