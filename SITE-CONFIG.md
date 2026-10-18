# Homepage client details — Step 1

Edit `site-config.js` to supply the client details. All values in that file are public.

- `businessName` controls the browser title and the header logo's accessible name.
- `legalBusinessName` controls the footer copyright business name. Its default preserves the existing wording.
- `appointmentSlots` controls the preferred-time dropdown. Existing choices are retained pending confirmation. Set it to `[]` to remove unconfirmed choices.
- Replace bracketed placeholders for owner name, email, phone, WhatsApp, address, Maps link, hours, languages, service areas, and social URLs when verified details arrive.
- `formEndpoint` is reserved for Step 2. A provider form must be created/verified to route messages to the configured business email; changing a JavaScript email value alone cannot configure the provider's recipient.

Contact buttons, additional business details, owner information, and social links are reserved for subsequent steps. They are not added to the page in Step 1. The current mail-draft flow is unchanged until Step 2.

No styles or service pages are modified. The local dev command remains the existing Python server on http://localhost:5173; this project does not currently use Vite.

To review:

1. Open the homepage and confirm its appearance and existing wording are unchanged.
2. Inspect the preferred-time dropdown; its choices come from `appointmentSlots`.
3. Edit a slot or business name in `site-config.js` and reload to confirm the binding, then restore the intended values.
4. Run `npm run build`; it includes `site-config.js` in `dist/` without deploying.
