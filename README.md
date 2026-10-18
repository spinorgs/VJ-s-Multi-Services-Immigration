# VJ’s homepage visual review

Run `npm run dev` and visit http://127.0.0.1:5173. No installation or build required.

Only the homepage is redesigned. Service pages are preserved copies of the live site for navigation and content review. Original homepage, styling and JavaScript are archived in `original/`.

Source reviewed: https://vjsmultiservices.com/ (18 October 2026). All six active services and the coming-soon bail bond service are retained. Existing testimonials describe themselves as examples, so they are omitted as unverified reviews. Original branding artwork is retained in assets; the homepage uses a navy-and-white typographic brand treatment for review.

The original contact form opens a `mailto:` draft without a recipient; there is no submission endpoint or published contact email, phone or address in the homepage. This preview preserves the draft workflow and explicitly explains its limitation. Configure a verified recipient or backend before launch. The legal fee acknowledgement and preferred appointment fields are retained. No deployment has been performed.

## Revised visual direction
Full-width architectural photography, DM Serif Display headings, DM Sans body text, navy monochrome consultation/tax/document photos, and a more restrained editorial layout. Photos are stored locally in assets/ and sourced from Unsplash.

## Third visual direction
Bright boutique layout with DM Sans headings, asymmetric consultation photography, rounded navy controls and six image-led service cards. The current visual overrides are in direction.css.

## Client-reference visual direction
Inspired by the client-provided VJ’s Bar & Burger reference: forest green (#173C35), cream (#F8F5EB), terracotta (#B44B32), gold (#E6BE7A), bold condensed headings and natural-colour photography. Updated styles are in direction.css. Barlow Condensed and DM Sans font assets are hosted locally.

## Palette adjustment
Green removed at user request. Current palette: warm charcoal #302824, cream #F8F5EB, terracotta #B44B32, gold #E6BE7A.

## Selected direction refinements
Enhanced hero typography, photo treatments, service card hover interactions, clearer process milestones, refined contact form and mobile layouts. Three service shortcuts preselect the corresponding consultation service. Static links/assets, image accessibility attributes, shortcut values and JS syntax checked. Browser visual QA has not been run in this environment.

## Connected service pages
All seven local service pages now use the approved homepage visual system, matching header/footer and local navigation. Service request links preselect the homepage consultation form. Original service pages archived under original/services/. Validated links and anchor targets across all eight pages and checked both scripts.
