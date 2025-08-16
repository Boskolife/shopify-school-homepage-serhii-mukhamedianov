import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { Accordion } from './components/accordion';

changeProductSize();
emulateFormSend();

setTimeout(() => {
  showOfferPopup();
}, 1000);

new Accordion('.faq', '');
if (window.innerWidth < 768) new Accordion('.footer', '');

new Swiper('.hero_swiper', {
  slidesPerView: 1,
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
  },
});

new Swiper('.featured-collection_swiper', {
  slidesPerView: 'auto',
  modules: [Navigation, Autoplay],
  navigation: {
    nextEl: '.featured-collection .swiper-button-next',
    prevEl: '.featured-collection .swiper-button-prev',
  },
  breakpoints: {
    320: {
      spaceBetween: 16,
    },
    768: {
      spaceBetween: 24,
    },
  },
});

function initProductGallery(productImages) {
  const productWrapper = document.querySelectorAll('.product');
  const swiperMainContainer = document.querySelector('.product-swiper-main');
  const swiperThumbsContainer = document.querySelector(
    '.product-swiper-thumbs',
  );

  const swiperThumbs = new Swiper('.product-swiper-thumbs', {
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
    },
  });

  const swiperMain = new Swiper(swiperMainContainer, {
    modules: [Thumbs],
    slidesPerView: 1,
    thumbs: {
      swiper: swiperThumbs,
    },
    breakpoints: {
      320: {
        spaceBetween: 0,
      },
      1280: {
        spaceBetween: 0,
      },
    },
  });

  function updateSliders(colorKey) {
    const images = productImages[colorKey];

    swiperMainContainer.classList.add('fade-out');
    swiperThumbsContainer.classList.add('fade-out');

    setTimeout(() => {
      if (typeof swiperMain.removeAllSlides === 'function') {
        swiperMain.removeAllSlides();
        swiperThumbs.removeAllSlides();
      } else {
        swiperMainContainer.querySelector('.swiper-wrapper').innerHTML = '';
        document.querySelector(
          '.product-swiper-thumbs .swiper-wrapper',
        ).innerHTML = '';
      }

      images.forEach((src, i) => {
        const mainSlide = `
          <div class="swiper-slide">
            <div class="main-slide">
              <img src="${src}" alt="Nike Air Max Plus ${colorKey} ${i + 1}">
            </div>
          </div>
        `;
        const thumbSlide = `
          <div class="swiper-slide">
            <div class="thumb-slide">
              <img src="${src}" alt="Nike Air Max Plus ${colorKey} preview ${
                i + 1
              }">
            </div>
          </div>
        `;

        if (typeof swiperMain.appendSlide === 'function') {
          swiperMain.appendSlide(mainSlide);
          swiperThumbs.appendSlide(thumbSlide);
        } else {
          swiperMainContainer.querySelector('.swiper-wrapper').innerHTML +=
            mainSlide;
          document.querySelector(
            '.product-swiper-thumbs .swiper-wrapper',
          ).innerHTML += thumbSlide;
        }
      });

      swiperMain.update();
      swiperThumbs.update();
      swiperMain.slideTo(0);
      swiperMainContainer.classList.remove('fade-out');
      swiperThumbsContainer.classList.remove('fade-out');
    }, 300);
  }

  productWrapper.forEach((wrapper) => {
    const colorBtn = wrapper.querySelectorAll('.color-btn');

    const defaultColor = 'color1';
    colorBtn.forEach((btn) => {
      if (btn.dataset.color === defaultColor) {
        btn.classList.add('selected');
      }
    });

    colorBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        colorBtn.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        const color = btn.dataset.color;
        updateSliders(color);
      });
    });
  });

  updateSliders('color1');
}

initProductGallery({
  color1: [
    './images/product/image_1.png',
    './images/product/image_2.png',
    './images/product/image_3.png',
    './images/product/image_4.png',
    './images/product/image_5.png',
  ],
  color2: [
    './images/product/image_6.png',
    './images/product/image_7.png',
    './images/product/image_8.png',
    './images/product/image_9.png',
    './images/product/image_10.png',
  ],
  color3: [
    './images/product/image_11.png',
    './images/product/image_12.png',
    './images/product/image_13.png',
    './images/product/image_14.png',
    './images/product/image_15.png',
  ],
});

function changeProductSize() {
  const productWrapper = document.querySelectorAll('.product');

  productWrapper.forEach((wrapper) => {
    const sizeBtns = wrapper.querySelectorAll('.size-btn');

    if (sizeBtns.length > 0) {
      sizeBtns[0].classList.add('selected');
    }

    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });
}

function emulateFormSend() {
  const contactForm = document.querySelectorAll('.contact_form');

  contactForm.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you!');
      this.reset();
    });
  });
}

function showOfferPopup() {
  const popup = document.getElementById('offerPopup');
  const closeBtn = document.getElementById('closeOfferPopup');

  document.body.classList.add('lock');
  popup.classList.add('show');
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
    document.body.classList.remove('lock');
  });

  const contactForm = document.querySelector('.offer-popup_form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.reset();
    popup.classList.remove('show');
    document.body.classList.remove('lock');
  });
}
