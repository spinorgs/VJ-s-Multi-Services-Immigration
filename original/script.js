const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const sliderButtons = document.querySelectorAll("[data-slide]");
let activeTestimonial = 0;

function showTestimonial(index) {
  if (!testimonials.length) return;
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((testimonial, itemIndex) => {
    testimonial.classList.toggle("active", itemIndex === activeTestimonial);
  });
}

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.slide === "next" ? 1 : -1;
    showTestimonial(activeTestimonial + direction);
  });
});

window.setInterval(() => {
  showTestimonial(activeTestimonial + 1);
}, 7000);

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".accordion details").forEach((otherDetail) => {
      if (otherDetail !== detail) {
        otherDetail.open = false;
      }
    });
    window.setTimeout(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
  });
});

const consultationForm = document.querySelector("#consultation-form");
const serviceSelect = consultationForm?.querySelector('select[name="service"]');
const feePanel = consultationForm?.querySelector("[data-fee-panel]");
const feeAck = consultationForm?.querySelector("[data-fee-ack]");

function syncFeePanel() {
  if (!serviceSelect || !feePanel || !feeAck) return;
  const requiresLegalFee = serviceSelect.value === "Legal Consultation Coordination";
  feePanel.classList.toggle("is-active", requiresLegalFee);
  feeAck.required = requiresLegalFee;
  if (!requiresLegalFee) {
    feeAck.checked = false;
  }
}

serviceSelect?.addEventListener("change", syncFeePanel);
syncFeePanel();

if (consultationForm) {
  consultationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    syncFeePanel();
    if (!consultationForm.reportValidity()) return;

    const formData = new FormData(consultationForm);
    const status = consultationForm.querySelector(".form-status");
    const subject = encodeURIComponent("Consultation Request - VJ's Immigration Consultant");
    const body = encodeURIComponent(
      [
        `First Name: ${formData.get("firstName") || ""}`,
        `Last Name: ${formData.get("lastName") || ""}`,
        `Phone: ${formData.get("phone") || ""}`,
        `Email: ${formData.get("email") || ""}`,
        `Service Needed: ${formData.get("service") || ""}`,
        `Legal Consultation Fee Acknowledged: ${formData.get("legalFeeAcknowledged") ? "Yes" : "Not applicable"}`,
        `Preferred Date: ${formData.get("date") || ""}`,
        `Preferred Time: ${formData.get("time") || ""}`,
        `Message: ${formData.get("message") || ""}`
      ].join("\n")
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = "Your email app should open with the consultation details ready to send. We will follow up with availability and next steps.";
    }
  });
}

const videoToggle = document.querySelector("[data-video-toggle]");
const storyVideo = document.querySelector(".video-frame video");

if (videoToggle && storyVideo) {
  videoToggle.addEventListener("click", () => {
    if (storyVideo.paused) {
      storyVideo.play();
      videoToggle.textContent = "Pause";
      videoToggle.setAttribute("aria-label", "Pause video");
    } else {
      storyVideo.pause();
      videoToggle.textContent = "Play";
      videoToggle.setAttribute("aria-label", "Play video");
    }
  });
}

const journeyItems = document.querySelectorAll(".journey-item");

journeyItems.forEach((item) => {
  item.addEventListener("click", () => {
    journeyItems.forEach((otherItem) => otherItem.classList.remove("active"));
    item.classList.add("active");
  });
});

const builderContent = {
  immigration: {
    title: "Immigration paperwork support",
    copy: "We help organize IDs, notices, forms, evidence, translations, and attorney consultation coordination when legal advice is required.",
    items: [
      "Confirm service goal and timeline",
      "Review required forms and document evidence",
      "Prepare appointment or filing checklist",
      "Coordinate attorney consultation when needed"
    ]
  },
  livescan: {
    title: "DOJ & FBI Live Scan appointment",
    copy: "We help clients book a preferred time, prepare required IDs, and complete fingerprinting for employment, licensing, and background checks.",
    items: [
      "Select preferred date and time slot",
      "Bring valid identification and agency request form",
      "Complete electronic fingerprinting",
      "Receive next-step confirmation after appointment"
    ]
  },
  tax: {
    title: "Tax, ITIN, and IRS notice support",
    copy: "We help organize records for individual returns, business returns, ITIN renewals, IRS letters, and bookkeeping coordination.",
    items: [
      "Collect income and expense records",
      "Review ITIN or taxpayer details",
      "Prepare tax or IRS notice checklist",
      "Coordinate bookkeeping or follow-up support"
    ]
  }
};

const builderButtons = document.querySelectorAll("[data-builder]");
const builderTitle = document.querySelector("[data-builder-title]");
const builderCopy = document.querySelector("[data-builder-copy]");
const builderList = document.querySelector("[data-builder-list]");

builderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = builderContent[button.dataset.builder];
    if (!content || !builderTitle || !builderCopy || !builderList) return;

    builderButtons.forEach((otherButton) => {
      otherButton.classList.remove("active");
      otherButton.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    builderTitle.textContent = content.title;
    builderCopy.textContent = content.copy;
    builderList.innerHTML = content.items.map((item) => `<li>${item}</li>`).join("");
  });
});
