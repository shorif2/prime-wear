// Banner slider logic for Astro
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.getElementById("sliderTrack");
    const dotsContainer = document.getElementById("dotsContainer");
    const slides = sliderTrack ? sliderTrack.querySelectorAll(".slide") : [];
    const slidesLength = slides.length;
    let currentSlide = 0;
    let autoSlideInterval = null;

    if (!sliderTrack || !dotsContainer || slidesLength === 0) return;

    // Create dots
    function createDots() {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < slidesLength; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Update slider position
    function updateSlider() {
      const translateX = -currentSlide * 100;
      sliderTrack.style.transform = `translateX(${translateX}%)`;
      // Update dots
      dotsContainer.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateSlider();
      resetAutoSlide();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slidesLength;
      updateSlider();
      resetAutoSlide();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slidesLength) % slidesLength;
      updateSlider();
      resetAutoSlide();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    sliderTrack.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    sliderTrack.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector(".slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoSlide);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }

    // Navigation buttons
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    // Initialize
    createDots();
    updateSlider();
    startAutoSlide();
  });
})();
