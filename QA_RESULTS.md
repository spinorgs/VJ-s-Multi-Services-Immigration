# QA results — October 26, 2026

- `npm run build`: passed JS syntax checks and generated 17 pages into dist/.
- `npm run verify`: passed 393 local links/assets and anchor checks across all 17 pages; verified service boundaries and inactive bail noindex page and internal-file exclusions.
- Local Chrome via existing Playwright installation: all 17 pages at 320, 375, 768, 1024 and 1440 CSS pixels (85 layout checks). No horizontal overflow or JavaScript page errors.
- Mobile menu opens, reports expanded state, closes on Escape and returns focus.
- Required form fields block empty submissions. Available tax service handoff selects correctly; inactive bail bond handoff is rejected.
- Completed unconfigured form explicitly reports information was not sent or saved.
- Reduced motion disables smooth scrolling. Native controls retain keyboard operation and labels; visible focus styles provided.
- Desktop screenshot reviewed. Mobile viewport/contact screenshots reviewed separately because a full-page mobile screenshot showed a browser capture artifact.

Limits: Chrome coverage only; no assertion of WCAG conformance, screen-reader certification or legal compliance. No production submission backend, delivery, server rate limiting, live deployment, Safari/Firefox testing or Lighthouse report. Public original site could not be retrieved through the research tool; audit clearly identifies local evidence. Live Scan/notary availability uses owner-reported completed reviews; no independent verification of specific credential identifiers. Shared-history scope applied to all six active categories.

## Espresso & Sand palette correction
- Applied requested six global color variables; all active CSS and SVG color literals use Espresso #352820 or Sand #E9D5BB, including opacity variants. Retained legacy styles recolored; historical original/ evidence remains excluded from production. No Tailwind or third-party UI configuration exists in this static stack.
- Rendered color inspection across 17 pages at 375, 768 and 1440 pixels plus hover, keyboard focus and expanded mobile menu: 54 palette checks passed. No overflow.
- Espresso/Sand primary text contrast: 9.96:1. Focus indicators use Espresso on Sand and Sand on dark sections.
- Desktop full-page and mobile homepage/menu/footer screenshots inspected. Native select, checkbox, date icon and autofill surfaces styled for the palette. Stylesheet URL versioned to refresh cached CSS.
- Existing layout, service scope and contact behavior preserved. Production build and 393 local links/assets passed.

## Complete layout redesign — latest validation
- Rebuilt homepage structure and shared styling, rather than appending hero overrides. The former hero illustration and its markup/styles are removed from active source. Added a compact photo-led hero, three service shortcuts, six distinctive cards, photographic About, three-step process, homepage FAQs, and redesigned contact panel.
- `npm run build` and `npm run verify`: 17 pages generated, 393 local links/assets/anchors resolved. Internal review files and archived source excluded.
- Chrome: all 17 pages at 320, 375, 768, 1024 and 1440 pixels; 85 layout checks passed without horizontal overflow or JavaScript errors.
- 54 computed-style palette checks across desktop, tablet, mobile, hover, focus and expanded navigation passed. Espresso/Sand text contrast remains 9.96:1. Photographs use a monochrome treatment over Sand.
- Mobile menu/Escape/focus return, service handoff, required form fields, unavailable-service rejection and explicit no-backend feedback passed. Reduced motion honored.
- Desktop full-page and mobile viewport screenshots reviewed. Image decoding and native FAQ keyboard toggles checked separately.
- Business details, service availability configuration and legal boundaries retained. No new service activated. No production deployment. Existing backend and cross-browser/manual assistive-technology limitations remain.

## Image and related-content enhancement — latest validation
- Added coordinated illustrative scanner/notary desk photographs, image-led cards for all six active services, expanded photographic service pages, preparation/expectation panels, related links and three homepage visit guides. No service status changes.
- Production build and static verification pass: 17 pages, 432 local links/assets/anchors.
- All 85 Chrome responsive layout checks pass (17 pages at 320, 375, 768, 1024 and 1440px), with no horizontal overflow or page errors.
- 54 palette/state checks pass; menu, Escape/focus, reduced motion, form validation, service handoff, no-backend feedback and inactive bail safeguards remain intact.
- Image decoding/alt text checked across eight image-bearing pages. Desktop detail page and mobile card screenshots inspected. Illustrative images are disclosed without staff, premises, equipment ownership or government endorsement claims.
- No deployment performed.

## Reference palette update — latest validation
Retrieved reference HTML/style.css/appearance.css and resolved the current palette in Chrome. Applied verified burgundy/cream/gold colors, related card/section tones, hover states, form and navigation colors; retained content, service controls and imagery. 14 exact component mappings plus hero hover/mobile navigation checked. All 85 responsive checks passed with no overflow or JavaScript errors. Build and 432 local link/asset checks passed. See REFERENCE_PALETTE.md for sources and contrast decisions. Earlier two-color palette results above are historical. No deployment.

## Secure appointment inquiry backend — latest validation
- Added Firebase v2 function, same-origin Hosting rewrite, Resend delivery with customer Reply-To, server-side field/service validation, consent enforcement, Cloudflare Turnstile hostname/action validation, honeypot, Firestore transactional rate limits/content deduplication and provider idempotency. No secrets or business recipient configured in public source.
- 27 backend tests passed on Node 22 (the configured deployment runtime) and local Node 24. Cases cover accepted sends, failures, sensitive/invalid/extra fields, consent, forbidden origins, duplicate/concurrent requests, persistent limits, provider payload and captcha checks. Test doubles are confined to tests; they do not prove live inbox delivery. Firebase SDK function entry point imports successfully. Dependency install reports zero known vulnerabilities.
- Browser tests passed for required fields/consent, retaining input on provider rejection, refusing malformed success JSON, duplicate submission lock, success wording, and widths 320/375/768/1440. API and security-widget responses were intercepted only in the browser test.
- `npm run build`, backend syntax checks and `npm run verify` pass; 17 pages and 432 local links/assets resolve. Server functions/environment paths are absent from dist/. Local preview now serves only dist/: website returns 200, backend source and environment paths return 404.
- No real Resend/Cloudflare secrets, sender domain or recipient supplied. No actual email sent, no deployment performed. Full Firebase/Firestore emulator verification awaits a Java runtime and reviewed configuration. Follow APPOINTMENT_SETUP.md for the complete real-delivery acceptance test.

## Production Hosting release — October 26, 2026
User authorized Git push and deployment. Hosting release succeeded on `vjs-nationwide-services`, the existing project serving vjsmultiservices.com and www.vjsmultiservices.com. Both domain responses match dist/index.html byte for byte. The original-color image CSS is live. The previous preview project `vj-s-multiservices` was also updated before its missing custom-domain mapping was identified. No backend, secrets or Firestore resources were deployed; email sending remains explicitly unavailable. Build, static verification and all 27 backend tests passed before release.
