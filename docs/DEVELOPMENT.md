<!-- GSD -->
# Development

## Project Structure

```
profile-readme/
├── README.md              # GitHub profile README (edit for profile changes)
├── index.html             # Animated portfolio site (edit for site changes)
└── docs/                  # GSD documentation
    ├── ARCHITECTURE.md
    ├── GETTING-STARTED.md
    ├── DEVELOPMENT.md     # This file
    ├── TESTING.md
    └── CONFIGURATION.md
```

Everything is in two files. No build step. No compilation.

---

## How to Modify

### README.md (GitHub Profile)

The README uses GitHub Flavored Markdown with inline HTML for centering and links.

**To update the bio:**
Edit lines 22–24 (About section). Keep it concise — 1–2 paragraphs.

**To update skills:**
Edit lines 30–36. The skills are pipe-delimited inline text. Reorder to emphasize current focus areas.

**To update portfolio links:**
Edit the table rows (lines 43–51). Each row is `| Name | URL | Description |`.

**To add/remove links:**
Edit the link bar (lines 7–16). Use standard Markdown link syntax.

### index.html (Portfolio Site)

The site is fully self-contained in a single HTML file with inline `<style>` and `<script>` blocks.

#### Styling (CSS, lines 9–331)

CSS custom properties are defined in `:root` (lines 11–26):

```css
:root {
  --bg: #0a0a0f;
  --accent: #6c63ff;
  --accent2: #00d4aa;
  --gradient: linear-gradient(135deg, #6c63ff, #00d4aa);
  /* ... */
}
```

**To change the color scheme:** Update the `:root` variables. The entire site re-themes automatically.

**To modify animations:** Adjust keyframe definitions (`.orbFloat`, `.fadeInUp`, `.bounce`) or transition durations.

**To adjust responsive breakpoints:** Edit `@media(max-width:768px)` and `@media(max-width:480px)` blocks (lines 311–330).

#### Content (HTML, lines 332–668)

Each section is a `<section>` element with an `id` matching the nav link:

| Section | Element ID | Lines |
|---------|------------|-------|
| Hero | (none, first section) | 352–373 |
| About | `#about` | 375–410 |
| Skills | `#skills` | 412–469 |
| Experience | `#experience` | 471–491 |
| Projects | `#projects` | 493–591 |
| Soft Skills | `#softskills` | 593–641 |
| Contact | `#contact` | 643–663 |
| Footer | `<footer>` | 665–668 |

#### JavaScript (lines 670–737)

Three behaviors:

1. **Mobile menu toggle** (lines 672–677) — Toggles `.open` class on nav for responsive hamburger menu.
2. **Typing effect** (lines 680–712) — Cycles through role descriptors. Edit the `words` array (lines 681–688) to change typed phrases.
3. **Scroll animations** (lines 715–727) — `IntersectionObserver` adds `.visible` class to trigger CSS transitions. Adjust `threshold` and `rootMargin` on line 721 to change when animations fire.

---

## Add a New Project Card

1. Copy a `.project-card` div block (lines 500–509).
2. Update the `h3` title, `p` description, `.tags`, and `.card-links`.
3. Paste it inside `.projects-grid` (between lines 498 and 590).

---

## Update the Experience Timeline

Edit the `.timeline-item` block (lines 477–488). Currently shows the ITOTCloud role. To add more entries, duplicate the `.timeline-item` block and place it in chronological order. The `::before` pseudo-element draws the vertical line automatically.

---

## Deployment

The site is deployed via GitHub Pages.

1. Push changes to the `main` branch of `github.com/harshvardhankulkarni/harshvardhankulkarni`.
2. GitHub Pages is configured to serve from `main` branch, root folder.
3. The README updates automatically on profile visits.
4. The portfolio site updates at `https://harshvardhankulkarni.github.io/harshvardhankulkarni/` within minutes.

No manual deployment step. No CI/CD pipeline required.
