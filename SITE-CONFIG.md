# Site configuration

Edit the public `site-config.js`, then run `npm run build`. The build reads the configuration to generate all pages consistently. Do not edit generated HTML to change business information.

`businessName` is the approved display name. `legalBusinessName` remains empty until exact registered identity is supplied. Address and two phone numbers come from the client brief. No unconfirmed hours, appointment times, email or social links are published.

Service states: `available` creates an active card, details and inquiry option; `pending` and `disabled` omit advertising and keep existing URLs as neutral noindex pages; `coming-soon` shows a status card without any intake action. Live Scan and notary availability relies on owner-reported completed checks. Immigration and legal pages offer public resources and client-selected professional appointment support, not consultation, form preparation, or attorney matching. Review compliance evidence before expanding those scopes. Add approved description/details/disclosure when activating.

`formEndpoint` is `/api/appointment`. Keep it same-origin. `turnstileSiteKey` is the public Cloudflare site key; it is empty until supplied. All email recipient/sender values and API credentials are configured only in server environment/Secret Manager. Public email values do not configure backend delivery. See APPOINTMENT_SETUP.md. Changing available services regenerates functions/service-catalog.json; deploy the function with the updated catalog when releasing those changes.

See COMPLIANCE_REVIEW.md for owner-reported completion and remaining public credential details.
