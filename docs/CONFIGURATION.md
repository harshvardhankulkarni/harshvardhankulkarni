<!-- GSD -->
# Configuration

## No Configuration Files

This project has zero configuration files:
- No `package.json`
- No `tsconfig.json`
- No `.env`
- No build config
- No linter config

All customization is done directly in the source files.

---

## Google Fonts

The Inter typeface is loaded via Google Fonts CDN:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**To change the typeface:**
1. Replace the `href` with a different Google Fonts URL.
2. Update the `font-family` declaration in `body` (line 29 of `index.html`).

**Fallback stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

---

## Theme Customization

All theme values are controlled via CSS custom properties in `:root` (lines 11–26 of `index.html`):

```css
:root {
  --bg: #0a0a0f;             /* Page background */
  --bg-card: #12121a;        /* Card background */
  --bg-card-hover: #1a1a28;  /* Card hover state */
  --text: #e8e8f0;           /* Primary text */
  --text-muted: #8888a0;     /* Secondary text */
  --accent: #6c63ff;         /* Primary accent (purple) */
  --accent2: #00d4aa;        /* Secondary accent (teal) */
  --accent3: #ff6b6b;        /* Tertiary accent (coral) */
  --gradient: linear-gradient(135deg, #6c63ff, #00d4aa);
  --gradient2: linear-gradient(135deg, #ff6b6b, #6c63ff);
  --radius: 16px;            /* Card border radius */
  --radius-sm: 8px;          /* Small border radius */
  --shadow: 0 4px 30px rgba(0,0,0,0.3);
  --border: 1px solid rgba(255,255,255,0.06);
}
```

Edit any value to re-theme the entire site instantly.

---

## GitHub Pages Settings

The site is hosted on GitHub Pages with these settings:

| Setting | Value |
|---------|-------|
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/` (root) |
| Custom domain | None |

No `CNAME` file is used. The site is served at the default GitHub Pages URL:
`https://harshvardhankulkarni.github.io/harshvardhankulkarni/`

---

## Inline Content

All content — text, project data, skills, experience — is hardcoded in HTML.

**To add a project:** Duplicate a `.project-card` div (see DEVELOPMENT.md).

**To change the typing effect words:** Edit the `words` array in JavaScript (lines 681–688).

**To update stats:** Edit the `.stat-item` divs in the hero section (lines 363–368).

---

## Responsive Breakpoints

Defined in media queries (lines 311–330):

| Breakpoint | Target |
|------------|--------|
| `max-width: 768px` | Tablets, large phones |
| `max-width: 480px` | Small phones |

Adjust these to match the devices you target.
