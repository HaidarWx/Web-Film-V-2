export function initSlider(selector, options = {}) {
  return new Swiper(selector, {
    slidesPerView: 7,
    slidesPerGroup: 1,
    spaceBetween: 15,
    resistanceRatio: 0,
    watchOverflow: true,
    slidesOffsetAfter: 0,

    navigation: {
      nextEl: `${selector} .swiper-button-next`,
      prevEl: `${selector} .swiper-button-prev`,
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1024: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
    },

    ...options,
  });
}

export function heroSlider() {
  return new Swiper(".swiper-hero", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: ".swiper-hero .swiper-button-next",
      prevEl: ".swiper-hero .swiper-button-prev",
    },
  });
}
