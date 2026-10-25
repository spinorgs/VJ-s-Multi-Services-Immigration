# Appointment inquiry email setup

Implementation is complete in source. The public website has been deployed; the appointment backend has not been deployed and no live notification has been sent. Actual recipient/sender addresses, verified domains, and provider keys have not been supplied. Online sending fails closed until they are configured. The existing 5173 preview serves public files only; it does not execute Firebase Functions.

## Architecture

`Browser → POST /api/appointment → Firebase Hosting rewrite → appointmentInquiry (2nd gen, us-west1, Node 22) → Resend → business inbox`

Cloudflare Turnstile is verified server-side, including hostname and action. Firestore transactions enforce limits shared across function instances and deduplicate normalized identical inquiries. Customer email becomes `reply_to`; the sender and recipient come exclusively from server configuration. The provider request is plain text, contains the selected server-approved service label, and has no attachments or customer-supplied recipient/header values.

A successful response means Resend accepted the notification for email delivery and returned an email ID. It does not guarantee inbox placement or a booked appointment. Later bounces, suppression and spam filtering must be monitored in the Resend dashboard; a synchronous form response cannot detect future bounces. The form says “accepted for email delivery.” Immediate API failures/timeouts show an error and preserve customer entries.

## Required configuration

| Setting | Where | Purpose |
|---|---|---|
| `INQUIRY_TO_EMAIL` | `functions/.env.vjs-nationwide-services` | Business owner's receiving inbox; one address |
| `INQUIRY_FROM_EMAIL` | Same server environment file | Sender address on the verified Resend domain; one address, no display-name wrapper |
| `INQUIRY_ALLOWED_ORIGINS` | Same server environment file | Comma-separated exact HTTPS origins, without trailing slashes; include only domains actually serving the site |
| `RESEND_API_KEY` | Google Secret Manager | Resend sending-only API key restricted to the sending domain where possible |
| `TURNSTILE_SECRET_KEY` | Google Secret Manager | Cloudflare widget secret, never the public site key |
| `RATE_LIMIT_SALT` | Google Secret Manager | Stable random secret, at least 32 characters; used for keyed hashes, not encryption |
| `turnstileSiteKey` | Public `site-config.js` | Cloudflare public site key; safe to publish |
| `formEndpoint` | Public `site-config.js` | Keep `/api/appointment` for same-origin Hosting rewrite |

The email fields in public site-config.js do not configure delivery. Do not paste provider secrets into public JS, HTML, Firebase Hosting files, chat, or shell arguments. The committed `functions/.env.example` contains only examples. `.env*` and `.secret*` real files are gitignored and excluded from Hosting output. Development now serves `dist/`, not the repository root.

## Provider setup

1. In Resend, add a domain/subdomain you own, for example `notify.your-business-domain`. Add the exact SPF/DKIM DNS records provided by Resend and wait for verification. Configure DMARC according to your domain policy. Existing mailbox DNS must be preserved.
2. Choose a From address on that verified domain and a real business receiving inbox. Create a sending-only API key. Resend's default test sender is not a production configuration and can restrict recipients.
3. Create a Cloudflare Turnstile managed widget. Allow the actual production hostname(s), plus a controlled development/staging hostname when testing. Add its public key to `turnstileSiteKey`. The widget uses action `appointment`; the server rejects mismatched hostnames/actions and production test secrets. There is no captcha bypass in runtime code. The widget loads only when a visitor interacts with the configured form.
4. Approve privacy wording for Firebase, Resend, Cloudflare and the business mailbox. Review provider/mailbox retention and processor terms. Do not enable tracking or marketing with this inquiry consent.

## Firebase prerequisites

This checkout originally had **Firebase Hosting only**, project/site `vjs-nationwide-services`. Static Hosting cannot send mail. The added configuration creates a separate `appointments` Functions codebase, a single API rewrite, and private Firestore operational records.

- Production Cloud Functions deployment requires the **Blaze billing plan**. Functions, Firestore operations/TTL deletion, Secret Manager, artifact storage and email-service usage can incur charges. Set billing alerts and review provider quotas. Do not upgrade plans or create resources without configuration review.
- Enable a Firestore Native database and choose its location deliberately; the function uses `us-west1`. Verify required IAM/API access for Cloud Functions/Cloud Run, build/artifact storage, Firestore and Secret Manager.
- Review existing cloud Firestore rules before deploying. The supplied local rules deny browser access and assume no other app depends on this database. Merge them with existing application rules when needed; do not overwrite shared rules blindly.
- Enable TTL for `expiresAt` in `appointmentRequests` and `appointmentRateLimits` using the supplied field overrides. Confirm the policies are active. TTL deletion is asynchronous and may lag; it is not an exact deletion-time guarantee.
- Keep the HMAC salt stable. Changing it resets effective duplicate/rate-limit identities. Review/rotate keys deliberately.

Create server non-secret settings from `functions/.env.example`, then set the reviewed values. After review, set each secret interactively (commands shown, not run):

```sh
firebase functions:secrets:set RESEND_API_KEY --project vjs-nationwide-services
firebase functions:secrets:set TURNSTILE_SECRET_KEY --project vjs-nationwide-services
firebase functions:secrets:set RATE_LIMIT_SALT --project vjs-nationwide-services
```

Generate the salt locally with a cryptographically secure generator, for example `openssl rand -hex 32`, and enter it via the secure CLI prompt. Never commit actual secret files or put values in command history.

## Local testing without deployment

1. Use Node 22 for the Functions runtime/toolchain and install Java required by the current Firestore emulator (Java 21 recommended). This machine currently has Node 24 and no working Java runtime, so the complete Firebase emulator suite was not run during implementation.
2. Run `npm ci --prefix functions`, `npm run build`, `npm run test:backend`, and `npm run verify`.
3. Create gitignored `functions/.env.local` with a real controlled receiving inbox, verified sender, and `INQUIRY_ALLOWED_ORIGINS=http://127.0.0.1:5000,http://localhost:5000`.
4. Create gitignored `functions/.secret.local` with the three real development secrets. This prevents the emulator from attempting to read production secrets. Use a real Turnstile widget configured for the local hostname; the server checks the actual hostname/action. Do not use test captcha keys to send mail in production.
5. Set the corresponding public site key in site-config.js and rebuild. Run `npm run emulators`, then open **http://127.0.0.1:5000**. Hosting + Functions + Firestore emulators must all run; the static-only 5173 preview cannot send mail.
6. Submit only invented, non-sensitive test contact details to an inbox you control. This path calls the real Resend API and can send a real email; there is no runtime mock/simulated success switch. Confirm the email contains every field and that Reply addresses the test customer.
7. Submit an identical inquiry again and confirm only one email exists. Change details to test limits: 3 attempts/address/hour, 5/IP/15 minutes, and 100 total/day. Failed security/provider attempts count after validation. Identical accepted duplicates return a receipt without sending again. Shared-network users may hit the IP limit; tune constants only after review.
8. Test invalid fields, missing consent, unavailable service IDs, honeypot, expired/invalid captcha, forbidden origin, API rejection and network failure. Verify errors preserve entries; never use real sensitive data. For a provider-error test, use a deliberately invalid development API key, then restore it. Avoid repeated production tests that hit actual users or limits.

The in-repository unit tests use dependency-injected doubles only under `functions/test/`; browser QA also used test-only intercepted responses. These are not runtime mail delivery and do not prove inbox delivery. A live end-to-end email test remains a configuration acceptance step.

## Deployment after configuration approval only

No deployment commands have been executed. Review recipient/sender, DNS verification, public/secret keys, allowed origins, privacy wording, billing, Firestore rules/TTL and staging results first. Then:

```sh
npm ci --prefix functions
npm run build
npm --prefix functions run check
npm run test:backend
npm run verify
firebase deploy --only firestore,functions:appointments,hosting --project vjs-nationwide-services
```

The first release must deploy both function and Hosting rewrite. `npm run deploy` deploys Hosting only; do not use it for the first backend release. Its generated release config omits the API rewrite while the public Turnstile key is blank. Future changes to available service configuration require rebuilding and redeploying the function catalog as well as Hosting. The catalog is generated from the same public service configuration; pending/disabled/bail services are rejected server-side.

After deployment, submit one controlled request on each approved domain, inspect Resend's accepted/delivered status and the inbox, test Reply-To, and inspect redacted operational logs. Monitor subsequent bounces in Resend. Reassess mailbox retention and TTL policies routinely.

## Security/retention behavior

- Exact-origin POST JSON only; 8KB request cap, strict allowlisted fields, length limits and server-side validation; no file upload path.
- All visible fields and consent required; preferred dates use Sacramento's calendar and a one-year maximum. Service IDs are checked against a server-side generated available-service catalog.
- Honeypot, mandatory verified Turnstile and persistent per-IP/per-email/global limits; three maximum function instances. Application rate limits mitigate email abuse, not all infrastructure billing attacks.
- UI submission lock plus transactional leases/content deduplication and Resend idempotency. Resend keys last 24h; ambiguous retries older than 20h are refused for manual review. Hash records expire after 48h with asynchronous TTL cleanup. Identical inquiries may remain deduplicated until their records are deleted.
- Firestore records contain HMAC hashes, counts, statuses, provider ID and timestamps, not submitted messages/contact details or raw IPs. HMAC records are pseudonymous operational data, not an assertion of anonymity. No inquiry payload/provider error bodies are logged by application code.
- No attachments, sensitive-record fields, automatic customer email or marketing. The browser blocks common SSN/sensitive identifiers before submission and the backend rechecks. Free-text pattern checks are not comprehensive document/data-loss prevention; customers must keep all sensitive records out of this general inquiry form.

## Official implementation references

- Firebase Hosting rewrites: https://firebase.google.com/docs/hosting/full-config
- Functions runtime: https://firebase.google.com/docs/functions/manage-functions
- Secret Manager/environment/emulator setup: https://firebase.google.com/docs/functions/config-env
- Blaze requirement: https://firebase.google.com/docs/functions/get-started
- Resend send API/Reply-To: https://resend.com/docs/api-reference/emails/send-email
- Resend idempotency window: https://resend.com/docs/dashboard/emails/idempotency-keys
- Resend domain verification: https://resend.com/docs/dashboard/domains/introduction
- Turnstile verification: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## Production target verified October 26, 2026
The custom domain is attached to `vjs-nationwide-services`, not the earlier `vj-s-multiservices` preview project. Default project, Hosting site and documented server environment filename have been corrected. Only public Hosting files were released; no backend, secrets, billing, rules or database resources were changed.
