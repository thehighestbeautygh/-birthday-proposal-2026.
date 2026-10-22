
document.addEventListener("DOMContentLoaded", function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const previousButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const currentSlide = document.getElementById("currentSlide");
  const totalSlides = document.getElementById("totalSlides");
  const currentTitle = document.getElementById("currentTitle");
  const progressFill = document.getElementById("progressFill");
  const menuToggle = document.getElementById("menuToggle");
  const slideMenu = document.getElementById("slideMenu");

  if (!slides.length) {
    console.error("After Years: no slides were found.");
    return;
  }

  let activeIndex = 0;

  if (totalSlides) {
    totalSlides.textContent = String(slides.length).padStart(2, "0");
  }

  function showSlide(index) {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === activeIndex);
      slide.setAttribute(
        "aria-hidden",
        i === activeIndex ? "false" : "true"
      );
    });

    if (currentSlide) {
      currentSlide.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    if (currentTitle) {
      currentTitle.textContent =
        slides[activeIndex].dataset.title || "";
    }

    if (progressFill) {
      progressFill.style.width =
        ((activeIndex + 1) / slides.length) * 100 + "%";
    }

    if (previousButton) {
      previousButton.disabled = activeIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = activeIndex === slides.length - 1;
    }

    if (slideMenu) {
      slideMenu.hidden = true;
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      showSlide(activeIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showSlide(activeIndex + 1);
    });
  }

  document.querySelectorAll(".next-button").forEach(function (button) {
    button.addEventListener("click", function () {
      showSlide(activeIndex + 1);
    });
  });

  if (menuToggle && slideMenu) {
    menuToggle.addEventListener("click", function () {
      slideMenu.hidden = !slideMenu.hidden;
      menuToggle.setAttribute(
        "aria-expanded",
        String(!slideMenu.hidden)
      );
    });

    slideMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        const target = link.getAttribute("href");
        const match = target && target.match(/^#slide-(\d+)$/);

        if (match) {
          showSlide(Number(match[1]));
        }
      });
    });
  }

  const homeLink = document.querySelector(".wordmark");

  if (homeLink) {
    homeLink.addEventListener("click", function (event) {
      event.preventDefault();
      showSlide(0);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      showSlide(activeIndex + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      showSlide(activeIndex - 1);
    }

    if (event.key === "Escape" && slideMenu && menuToggle) {
      slideMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  let startX = 0;
  let startY = 0;

  document.addEventListener("touchstart", function (event) {
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", function (event) {
    if (event.target.closest("button, a, video, .slide-menu")) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - startX;
    const deltaY = event.changedTouches[0].clientY - startY;

    if (
      Math.abs(deltaX) > 70 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
      showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });

  showSlide(0);
});
