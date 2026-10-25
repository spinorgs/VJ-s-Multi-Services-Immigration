# Verified VJ’s Bar & Burger palette

Inspected October 26, 2026 at https://vjsgrill.bar/index.html.

## Evidence and cascade
Downloaded HTML and both linked stylesheets. Sources:
- https://vjsgrill.bar/style.css
- https://vjsgrill.bar/appearance.css?v=20261025-enhanced-hero

The web research reader could not access the page, but direct HTTPS retrieval succeeded. The CSS contains several historical palettes; values were selected from the final applicable cascade, then verified in Chrome at 1440px. Reference image/media requests were blocked for this color inspection. Restaurant assets, branding, copy, typography and layout were not imported. No palette values were guessed. Images are outside the extracted CSS palette.

## Exact reference values and local roles
| Reference value | Verified reference selector | Applied local role |
|---|---|---|
| `#FFFAF2` | body background | Main page background |
| `#24231F` | body text | Primary text |
| `#FFF1D7` | .brand-row | Header |
| `#FFFDF8` | .navigation-row | Navigation and form surfaces |
| `#301B23` | .bar-hero and footer | Hero/footer background |
| `#FFF7DF` | .bar-hero h1 | Light hero headings |
| `#F8C94E` | .bar-hero .button, .bar-promise-strip | Primary hero CTA, shortcuts and dark-section accents |
| `#FFE49B` | .bar-hero .button:hover | Golden CTA hover |
| `#EDB830` | .header-visit:hover | Call button hover |
| `#542332` | .local-introduction .button | Wine buttons, logo and featured card |
| `#FFF8EE` | .local-introduction .button text | Wine button text |
| `#3D1925` | .local-introduction .button:hover | Wine button hover |
| `#625A54` | .local-introduction-copy p | Secondary text |
| `#6B4C1B` | .local-introduction .text-link | Links and small labels on light surfaces |
| `#2D2623` | .local-introduction h2 | Section headings |
| `#6E3446` | .local-introduction h2 span | Optional heading accent token |
| `#FFF1D8` | .bar-discovery-card | Cream cards / photo tone |
| `#E9DBC2` | .bar-discovery-card border | Card borders |
| `#FFF0C1` | .promo:nth-child(2) | Notary/tax card surfaces |
| `#FFDFD5` | .promo:nth-child(1) | Administrative card surface |
| `#EEDEE1` | .promo:nth-child(3) | Legal resource card surface |
| `#2B1419` | .whiskey-feature | About/dark supporting sections |
| `#FFF4DC` | .whiskey-feature text | Light supporting-section text |
| `#EEE4E6` | .sports-section | Process / preparation panel surfaces |
| `#E8CD8A` | .visit-banner | Contact section |
| `#342313` | .visit-banner text | Contact body text |
| `#D7B86F` | .visit-banner border | Contact border |
| `#512633` | .visit-banner .button | Retained banner button token |
| `#F5EEE6` | footer text | Footer text |
| `#DCC08A` | .footer-grid h3 | Footer headings |
| `#D1C2C6` | .footer-grid p | Footer supporting text |
| `#EEE2E3` | .footer-grid a:not(:has(img)) | Footer links |
| `#F2D89F` | .footer-grid a:hover | Footer link hover |
| `#BFAEB4` | .footer-bottom | Footer bottom text |
| `#E8DFE1` | .bar-hero-content paragraph | Hero supporting text |
| `#C7B7BA` | .bar-hero-outline border | Secondary hero button border |
| `#F3EADB` | .local-welcome-photo figcaption | Subtle supporting surface |

All role tokens are centralized at the start of redesign.css. Shadows/overlays use alpha variants of the verified burgundy and warm light colors. The browser theme metadata, favicon, social SVG and retained legacy styles were updated. No Tailwind or third-party UI component theme is present.

## Accessibility choices
The reference’s brand label uses `#987827`; for small local branding/labels, the verified darker link color `#6B4C1B` is used for stronger contrast. Form borders use verified secondary text `#625A54` rather than a low-contrast decorative border. Focus rings use wine on light surfaces, yellow on dark surfaces, and wine on the yellow shortcut bar. The reference’s distinct cream, pale yellow, peach and rose surfaces are preserved rather than reduced to a two-color theme.

## Verification
- Production build and static verification: 17 pages and 432 local links/assets/anchors passed.
- Chrome: 85 responsive layout checks across 17 pages at 320, 375, 768, 1024 and 1440px; no overflow/page errors.
- Exact local computed values checked against the reference for 14 key component mappings, hero hover and expanded mobile navigation.
- Desktop/mobile screenshots reviewed. Service scope, availability, form limitations and business details unchanged. Nothing deployed.
