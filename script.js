const burgerBtn = document.getElementById("burgerBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("active");
  burgerBtn.setAttribute("aria-expanded", "true");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("active");
  burgerBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

burgerBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// ESC buat nutup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

const dropdownToggle = document.querySelector(".dropdown > a");

dropdownToggle.addEventListener("click", (e)=>{
  e.preventDefault();
  e.stopPropagation();
  dropdownToggle.parentElement.classList.toggle("open");
});


document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.mission-container', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },

    breakpoints: {

      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  })

  var swiper = new Swiper('.cardtegory-container', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },

    breakpoints: {

      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  })

  var swiper = new Swiper('.news-container', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },

    breakpoints: {

      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 200,
      },
    },
  })

    var swiper = new Swiper('.testimonial-container', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },

    breakpoints: {

      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 200,
      },
    },
  })
})





