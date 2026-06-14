<!-- GSD -->
# Testing

## Overview

This is a static HTML/CSS/JS project with no automated test framework. There are no unit tests, integration tests, or CI-based testing. All validation is performed manually.

---

## Manual Validation Checklist

Before deploying changes, verify the following:

### README.md (GitHub Profile)

| Check | How to Verify |
|-------|---------------|
| Markdown renders correctly | Push to GitHub, visit `github.com/harshvardhankulkarni`, confirm all sections display |
| Links work | Click every link — portfolio, LinkedIn, email |
| Table renders properly | Confirm the project table has correct column alignment and all rows display |
| No broken markdown | Check that `---` horizontal rules, headings, and bold text render correctly |

### index.html (Portfolio Site)

| Category | Check | How to Verify |
|----------|-------|---------------|
| **Load** | Page loads without errors | Open browser dev tools (F12), check Console for errors |
| **Animations** | Gradient orbs animate | Confirm 3 blur orbs float on the background |
| **Typing effect** | Text cycles through roles | Watch the hero section for 15+ seconds to see all 6 phrases |
| **Scroll animations** | Sections fade in on scroll | Scroll from top to bottom, confirm each section animates into view |
| **Navigation** | Nav links scroll to sections | Click each nav link, confirm smooth scroll to correct section |
| **Mobile menu** | Hamburger toggle works | Resize to <768px, tap hamburger, confirm nav links appear |
| **Responsive** | Layout adapts to screen sizes | Test at 1440px, 768px, and 375px widths |
| **Links** | All external links open | Click every repo, live, and contact link |
| **Contact** | Email link opens mail client | Click email link, confirm `mailto:` handler fires |
| **Fonts** | Inter font loads | Check Network tab for Google Fonts request, verify no 404 |

### Cross-Browser Testing

Test on at least:

- **Chrome** (primary target)
- **Firefox**
- **Edge**
- **Safari** (if available — WebKit rendering differences may affect `backdrop-filter` and `-webkit-text-fill-color`)

---

## Known Limitations

| Limitation | Reason |
|------------|--------|
| `backdrop-filter: blur()` not supported in some older browsers | Requires WebKit/Blink with compositor support. Falls back to solid background. |
| Google Fonts requires internet | Without internet, the site falls back to system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`). |
| No test automation | The site is intentionally dependency-free. Adding a test framework would contradict this goal. |

---

## When to Test

Test after any change to `index.html` or `README.md`. Since there is no build step, changes take effect immediately when opened locally or deployed to GitHub Pages.
