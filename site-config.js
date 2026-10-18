/**
 * VJ's Multi Services — homepage client details.
 * Edit this file when the client supplies verified information.
 * This file is public: never put passwords, API secrets, or private keys here.
 * Bracketed values are unfinished placeholders, not real business details.
 */
window.SITE_CONFIG = {
  // Existing business wording, retained from the current homepage.
  businessName: "VJ’s Multi Services",
  legalBusinessName: "VJ’s Immigration Consultant",
  ownerName: "[ADD_OWNER_NAME]",

  email: "[ADD_EMAIL]",
  phone: "[ADD_PHONE]", // Include the country code when supplied.
  whatsapp: "[ADD_WHATSAPP]", // Country code and digits only when supplied.
  address: "[ADD_ADDRESS]",
  googleMapsLink: "[ADD_GOOGLE_MAPS_LINK]",
  businessHours: ["[ADD_BUSINESS_HOURS]"],
  languagesSpoken: ["[ADD_LANGUAGE]"],
  serviceAreas: ["[ADD_SERVICE_AREA]"],

  // Existing time choices are preserved, not a claim of confirmed availability.
  // TODO: Replace these with the client's confirmed appointment slots.
  // Use [] to show only "Select a time slot" until availability is supplied.
  appointmentSlots: [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ],

  socialLinks: {
    facebook: "[ADD_FACEBOOK_LINK]",
    instagram: "[ADD_INSTAGRAM_LINK]",
    linkedin: "[ADD_LINKEDIN_LINK]"
  },

  // Reserved for Step 2. No external submission is enabled in Step 1.
  // Create a Formspree form routed to the verified email above, then paste
  // its public submission URL here. Never paste a Formspree account secret.
  formEndpoint: "[ADD_FORMSPREE_ENDPOINT]"
};
