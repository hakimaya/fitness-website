document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // 1. RESPONSIVE NAVIGATION
  // ========================================

  const menuButton = document.querySelector(
    ".siteheader .menu-toggle"
  );

  const mainNav = document.querySelector(
    ".siteheader .main-nav"
  );

  if (menuButton && mainNav) {

    function closeMenu() {
      mainNav.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.textContent = "☰";
    }

    menuButton.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

  }

  // ========================================
  // 2. GALLERY CAROUSEL
  // ========================================

  const carousel = document.querySelector(".gallery-carousel");

  if (carousel) {

    const slides = Array.from(
      carousel.querySelectorAll(".transformation-card")
    );

    const dots = Array.from(
      carousel.querySelectorAll(".carousel-dot")
    );

    const previousButton = carousel.querySelector(
      ".carousel-prev"
    );

    const nextButton = carousel.querySelector(
      ".carousel-next"
    );

    let currentSlide = 0;

    function showSlide(index) {

      currentSlide = (
        index + slides.length
      ) % slides.length;

      slides.forEach(function (slide, i) {
        const active = i === currentSlide;

        slide.hidden = !active;
        slide.classList.toggle("is-active", active);
      });

      dots.forEach(function (dot, i) {
        const active = i === currentSlide;

        dot.classList.toggle("active", active);

        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

    }

    if (slides.length > 0) {

      previousButton.addEventListener("click", function () {
        showSlide(currentSlide - 1);
      });

      nextButton.addEventListener("click", function () {
        showSlide(currentSlide + 1);
      });

      dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          showSlide(index);
        });
      });

      showSlide(0);
    }

  }

  // ========================================
  // 3. MONTHLY / YEARLY PRICING
  // ========================================

  const billingButtons = document.querySelectorAll(
    ".billing-btn"
  );

  const priceElements = document.querySelectorAll(
    ".moneyAmount[data-monthly]"
  );

  billingButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const yearly = button.dataset.billing === "yearly";

      billingButtons.forEach(function (item) {
        const active = item === button;

        item.classList.toggle("active", active);

        item.setAttribute(
          "aria-pressed",
          String(active)
        );
      });

      priceElements.forEach(function (priceElement) {

        const monthlyPrice = Number(
          priceElement.dataset.monthly
        );

        const displayedPrice = yearly
          ? monthlyPrice * 12 * 0.8
          : monthlyPrice;

        priceElement.textContent = Number.isInteger(displayedPrice)
          ? String(displayedPrice)
          : displayedPrice.toFixed(2);

        const pricePeriod = priceElement.parentElement.querySelector(
          ".moneyInfos"
        );

        if (pricePeriod) {
          pricePeriod.textContent = yearly
            ? "/year"
            : "/month";
        }

      });

    });

  });

  // ========================================
  // 4. CONTACT FORM — DEMO ONLY
  // ========================================

  const contactForm = document.getElementById(
    "contact-form"
  );

  if (contactForm) {

    const feedback = document.getElementById(
      "contact-feedback"
    );

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      feedback.textContent =
        "Form validated successfully. This demo does not send messages.";

      contactForm.reset();

    });

  }

  // ========================================
  // 5. NEWSLETTER — DEMO ONLY
  // ========================================

  const newsletterForms = document.querySelectorAll(
    ".newsletter-form"
  );

  newsletterForms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      alert(
        "Email validated. Newsletter subscription is not connected yet."
      );

      form.reset();

    });

  });

});