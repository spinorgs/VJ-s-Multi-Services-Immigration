# VJ’s Multi-Services Center

Photo-led redesign using the verified VJ’s Bar & Burger burgundy, cream and gold palette using the existing dependency-free HTML/CSS/JavaScript stack. The website is live at https://vjsmultiservices.com; appointment email sending is not yet configured or deployed.

## Run locally

`npm run build` generates source HTML and the allowlisted production `dist/` directory. `npm run dev` serves the workspace at http://127.0.0.1:5173. No package installation is needed. The development server serves only dist/ so backend configuration is not publicly served. Production hosting also serves dist/.

## Edit

- `site-config.js`: public business details, phone numbers, service states and form configuration. No secrets. Rebuild after edits.
- `scripts/build.mjs`: reusable header/footer, service cards, inquiry form, page templates and metadata. Generated HTML files are replaced on rebuild; edit templates instead.
- `redesign.css`: responsive verified reference palette and responsive design system.
- `redesign.js`: accessible navigation, optional motion, service handoff and validated inquiry behavior.
- `original/pre-navy-redesign/`: preserved prior pages/styles/scripts. Excluded from production.

Services support `available`, `pending`, `disabled`, and `coming-soon`. Pending/disabled services are omitted from public cards/form choices/sitemap; existing paths receive neutral noindex pages. Available services receive detail pages generated from configuration. Bail bonds stay coming soon without an action. The shared reference chat establishes six available categories: Live Scan, notary, administrative support, immigration resources and appointment support, legal resources, and tax professional referrals. Live Scan and notary availability uses the owner’s completed review confirmation; no independent credential verification is claimed. Direct immigration consultation/form preparation and attorney matching are not offered. Legal resource pages link to official directories. Bail bonds remain inactive.

## Contact form

The appointment form now posts JSON to `/api/appointment`, a Firebase Hosting rewrite to a 2nd-generation Cloud Function. The backend uses Resend, server-side validation, verified Cloudflare Turnstile, and Firestore-backed rate limits/idempotency. Credentials and recipient/sender configuration stay server-side. The browser requires all contact fields and privacy consent, locks duplicate submissions, preserves values on failure, and shows acceptance only after a confirmed backend response. This is an inquiry, not an appointment confirmation.

Sending is not configured or deployed yet. Supply the actual recipient, verified sender/domain, public Turnstile site key and server secrets. See **APPOINTMENT_SETUP.md** for setup, provider DNS verification, billing, privacy, emulators, delivery testing and reviewed deployment. `npm run dev` at 5173 is static preview only. `npm run emulators` at 5000 runs the full local flow after configuration; actual Resend credentials send actual emails. No mailto submission or runtime fake success is used.

## Validation and release

Run `npm run build` and `npm run verify` for syntax/build and generated-page checks. See `QA_RESULTS.md` for actual browser validation and limits. Read `WEBSITE_AUDIT.md`, `COMPLIANCE_REVIEW.md`, and `DEPLOYMENT_CHECKLIST.md` before publication. Legal pages are drafts and are not a finding of legal compliance. The existing Firebase project remains configured; deployment requires separate authorization.

## Current visual direction
A new compact editorial layout replaces the former oversized hero and abstract graphic. The homepage includes a document photograph, three popular-service shortcuts, six icon-led service cards, an alternating photographic About section, a three-step process, keyboard-operable FAQs, and a two-column contact panel. Shared navigation, branding, footer and internal pages use the new design system. Photos are existing local reference imagery, not staff portraits or pictures of the business premises; photographs display in their original colors. Only used service/section photographs are copied to production, with explicit dimensions and lazy loading below the fold.

## Service imagery and preparation guidance
Every available service now has an image-led card, a photographic detail page, a preparation panel, scope/expectation copy, and related-service links. The homepage includes three practical preparation guides. Image metadata, preparation and context copy live beside each service in `site-config.js`. Service statuses and approved descriptions are preserved. New fingerprint-scanner and notary-desk illustrations are optimized local JPEGs generated with the built-in image tool; exact prompts, saved paths and illustration disclosures are in `IMAGE_ASSETS.md`.

## Current colors
The latest color-only update uses the exact verified palette from vjsgrill.bar, including final CSS overrides, rather than the previous two-color themes. See `REFERENCE_PALETTE.md` for source URLs, selectors, HEX values, component mapping and contrast choices. Variables live at the top of `redesign.css`. No restaurant content or assets were imported. Earlier image-generation prompt notes describe the original creation palette, not the current UI theme.

## Current production deployment
Verified October 26, 2026: both `vjsmultiservices.com` and `www.vjsmultiservices.com` serve this build from Firebase project/site `vjs-nationwide-services` (https://vjs-nationwide-services.web.app). The earlier checkout targeted `vj-s-multiservices`; that is a different preview site with no custom domains. The default project and deployment script now target the actual business domain.

`npm run deploy` publishes Hosting only. The release preparation omits the appointment API rewrite while the public Turnstile site key is unconfigured. Once the backend is configured, reviewed and initially deployed using APPOINTMENT_SETUP.md, the Hosting-only release retains the configured rewrite. Backend secrets, Firestore rules and function resources were not deployed in the current release.
