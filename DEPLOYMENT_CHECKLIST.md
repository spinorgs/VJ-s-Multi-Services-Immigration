# Deployment checklist

## Technical readiness
- [x] Existing static stack retained; no install needed.
- [x] Shared templates and centralized business/service configuration.
- [x] Build includes public files only; archives and internal review documents excluded.
- [x] Privacy, terms and service disclosure draft pages; metadata, sitemap, robots and structured data.
- [x] No false form success; unconfigured form validates only and directs visitors to call.
- [ ] Supply verified business email and configure/test secure backend recipient routing, server validation, rate limits and delivery before enabling sending.
- [ ] Confirm canonical domain, actual hosting logs and retention, and social preview behavior (SVG social cards are not supported by every platform).
- [ ] Manual screen-reader, Safari/Firefox, accessibility and production performance acceptance review.
- [ ] After explicit deployment authorization: build, inspect dist/, deploy existing Firebase project, smoke test URLs, form and headers. Never upload repository root.

## Legal/business approval — separate from technical checks
- [x] Owner reported verification checklist complete on October 26, 2026.
- [ ] Record exact legal entity and relevant credential details/approved copy in COMPLIANCE_REVIEW.md.
- [ ] Retain the owner-confirmed resolution of notary/immigration advertising review; website now offers resource-only immigration support.
- [ ] Retain owner-confirmed Live Scan authorization and notary credentials; publish any required identifiers after approved values are supplied. Legal pages remain public resources, without attorney matching or referral fees.
- [ ] Confirm tax referral relationships and required disclosures; no direct preparation advertised.
- [x] Bail bonds inactive; no intake, payments or booking.
- [ ] Approve final privacy, terms and disclosures against actual operations before publication.

Passing a build does not establish legal compliance. This work is local only; no deployment performed.

## Appointment backend release — additional gate
- [x] Firebase v2 endpoint, same-origin Hosting rewrite, server validation, Resend Reply-To notification, verified Turnstile, Firestore rate limits/deduplication, honest UI responses and test coverage implemented.
- [ ] Review recipient/sender, Resend domain DNS, secrets, public widget key, allowed origins and privacy/processor retention.
- [ ] Review Blaze billing and Firestore database location, existing rules/IAM and TTL configuration.
- [ ] Run complete emulator/live provider delivery test after Java and real development configuration are available.
- [ ] Deploy function, reviewed Firestore configuration and Hosting together only after approval. Existing hosting-only deployment script is insufficient for the first release.
- [ ] Verify inbox delivery and Reply-To and monitor later bounces in Resend.

See APPOINTMENT_SETUP.md. No deployment or real email delivery has been performed.
