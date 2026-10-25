/** Public business details and approved service scope. Images are illustrative. No secrets. */
window.SITE_CONFIG = {
  "businessName": "VJ’s Multi-Services Center",
  "legalBusinessName": "",
  "address": {
    "street": "2620 Gateway Oaks Dr, #100B",
    "city": "Sacramento",
    "region": "CA",
    "postalCode": "95833"
  },
  "phones": [
    {
      "display": "916-914-0096",
      "href": "+19169140096"
    },
    {
      "display": "469-866-5757",
      "href": "+14698665757"
    }
  ],
  "email": "",
  "formEndpoint": "/api/appointment",
  "turnstileSiteKey": "", // Public Cloudflare site key only; no secrets here.
  "website": "https://vjsmultiservices.com",
  "businessHours": [],
  "appointmentSlots": [],
  "ownerReviewReportedComplete": true,
  "services": [
    {
      "id": "live-scan",
      "name": "Live Scan Fingerprinting",
      "status": "available",
      "icon": "fingerprint",
      "description": "Electronic fingerprinting for authorized California DOJ and FBI background-check requests.",
      "details": [
        "Bring your completed Request for Live Scan Service form and acceptable current identification.",
        "Follow your requesting agency’s instructions for the required submission and level of service.",
        "Call before visiting to confirm availability, requirements, and charges."
      ],
      "disclosure": "The fingerprint rolling fee and applicable government processing fees are explained before service. Reviewing agencies control processing times, results, and eligibility decisions. No agency endorsement or approval is implied.",
      "image": "fingerprint-desk.jpg",
      "imageAlt": "Illustrative unbranded electronic fingerprint scanner beside appointment paperwork",
      "context": "For employment, licensing, volunteering, and other authorized requests, start with the instructions from your requesting agency.",
      "preparationTitle": "Start with your requesting agency",
      "preparation": [
        "Confirm which background check and level of service your agency requires.",
        "Bring its completed Live Scan request form and acceptable current identification."
      ],
      "expectation": "Government processing fees are separate from the rolling fee. Reviewing agencies control processing and results."
    },
    {
      "id": "notary",
      "name": "Notary Services",
      "status": "available",
      "icon": "notary",
      "description": "Personal and business notarial services from a commissioned California notary public.",
      "details": [
        "Call to confirm notary availability, identification requirements, and fees.",
        "Bring the document and acceptable identification; personal appearance requirements apply.",
        "Wait to sign until instructed by the notary."
      ],
      "disclosure": "A notary performs the requested notarial act; notarization does not establish the truth or legal validity of document contents. The notary cannot choose legal documents or provide legal advice.",
      "image": "notary-desk.jpg",
      "imageAlt": "Illustrative document desk with a notarial embosser, stamp, folder, and pen",
      "context": "A little preparation helps your visit go smoothly. Discuss the requested notarial act and document requirements before coming in.",
      "preparationTitle": "Prepare for your notary visit",
      "preparation": [
        "Call first to confirm availability, identification requirements, and fees.",
        "Bring the document and wait to sign until the notary instructs you."
      ],
      "expectation": "The notary cannot choose legal documents or provide legal advice. Notarization does not establish legal validity or truth of document contents."
    },
    {
      "id": "administrative-support",
      "name": "Administrative Support",
      "status": "available",
      "icon": "document",
      "description": "Practical help organizing everyday records, correspondence, and appointment paperwork.",
      "details": [
        "Scanning, copying, and printing everyday documents.",
        "Organizing files and records according to your instructions.",
        "Scheduling appointments and preparing routine correspondence.",
        "Organizing materials for a professional you have selected."
      ],
      "disclosure": "Administrative support excludes legal document selection or drafting, legal interpretation, tax advice, and recommendations about legal rights.",
      "image": "documents.jpg",
      "imageAlt": "Close-up of paperwork being organized and completed at a desk",
      "context": "Get practical help with the everyday tasks around your documents, from scanning and copying to keeping appointment materials together.",
      "preparationTitle": "Bring a clear set of instructions",
      "preparation": [
        "Make a short list of the copying, scanning, correspondence, or organization tasks you need.",
        "If preparing for a professional, bring that professional’s checklist or your own instructions."
      ],
      "expectation": "You or your selected professional provide the instructions. Administrative help does not include legal interpretation, form selection, or tax advice."
    },
    {
      "id": "immigration",
      "name": "Immigration Resources & Appointment Support",
      "status": "available",
      "icon": "globe",
      "description": "Find public professional resources and organize appointments with the professional you choose.",
      "details": [
        "Use public directories and certified referral resources to find professional assistance.",
        "Select and engage your professional directly.",
        "Ask for help scheduling an appointment and organizing records using your instructions or the selected professional’s checklist."
      ],
      "disclosure": "No immigration consultation or form preparation is offered. We do not assess eligibility, select forms or benefits, recommend case strategies, or provide legal advice or representation.",
      "resources": [
        {
          "label": "Find an attorney — State Bar directory",
          "url": "https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch"
        },
        {
          "label": "Find a DOJ-recognized organization or accredited representative",
          "url": "https://www.justice.gov/eoir/recognition-accreditation-roster-reports"
        }
      ],
      "image": "immigration-journey.jpg",
      "imageAlt": "View above the clouds from an airplane window",
      "context": "Begin with public professional directories. You choose the professional; we can help with the practical organization around your appointment.",
      "preparationTitle": "Choose your professional first",
      "preparation": [
        "Use the official directories below to explore professional assistance.",
        "Once you select a professional, ask for their appointment requirements and document checklist."
      ],
      "expectation": "Appointment support does not include immigration consultation, form preparation, eligibility assessment, or case strategy."
    },
    {
      "id": "legal-coordination",
      "name": "Legal Resources",
      "status": "available",
      "icon": "resources",
      "description": "Access public attorney directories and certified lawyer referral resources.",
      "details": [
        "Browse official resources to locate professional legal assistance.",
        "Choose and engage your attorney directly.",
        "Agree legal services and fees separately with the attorney or law firm."
      ],
      "disclosure": "VJ’s is not a law firm or a certified lawyer referral service. We do not match customers to particular attorneys or collect a legal consultation or referral fee through this website.",
      "resources": [
        {
          "label": "Search the State Bar attorney directory",
          "url": "https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch"
        },
        {
          "label": "Find a certified lawyer referral service",
          "url": "https://www.calbar.ca.gov/public/find-legal-professionals/find-lawyer-referral-service"
        }
      ],
      "image": "notary.jpg",
      "imageAlt": "Reference books arranged on library shelves",
      "context": "Public directories can be a starting point when you need professional legal help. Review the resources and choose who you want to contact.",
      "preparationTitle": "Ask the professional directly",
      "preparation": [
        "Check the attorney’s public profile using the official State Bar directory.",
        "Discuss scope, acceptance of your matter, and fees with the attorney before engaging them."
      ],
      "expectation": "You select and engage your attorney directly. We do not provide attorney matching, legal advice, or representation."
    },
    {
      "id": "tax",
      "name": "Tax Professional Referrals",
      "status": "available",
      "icon": "calculator",
      "description": "Connect with independent tax professionals for your tax-related needs.",
      "details": [
        "Ask about a connection to an independent tax professional.",
        "Discuss scope, credentials, pricing, and engagement directly with that professional.",
        "Keep sensitive tax records out of website inquiries."
      ],
      "disclosure": "Referral and administrative assistance only. The independent provider handles tax advice, preparation, filing, fees, and any representation under a separate agreement.",
      "image": "tax.jpg",
      "imageAlt": "Tax reference materials and a calculator arranged on a desk",
      "context": "Connect with an independent professional for personal or business tax needs, then discuss your engagement directly with that provider.",
      "preparationTitle": "Before sharing tax records",
      "preparation": [
        "Confirm the provider’s credentials, services, and pricing directly.",
        "Ask that provider how to share documents securely; keep tax records out of general website inquiries."
      ],
      "expectation": "The independent provider handles advice, preparation, filing, fees, and any representation. VJ’s service is referral and administrative assistance only."
    },
    {
      "id": "bail-bond",
      "name": "Bail Bonds",
      "status": "coming-soon",
      "icon": "document",
      "description": "Coming soon. This service is not available. No applications, bookings, or payments are accepted.",
      "details": [],
      "disclosure": ""
    }
  ]
};
