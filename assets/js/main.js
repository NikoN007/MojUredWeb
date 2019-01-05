$(document).ready(function () {
  const navbar = $('.navbar-main');
  const navbarLogo = $('.navbar-brand img');
  let offsetTop = $(window).scrollTop();

  // Initialize selectpicker
  $('.selectpicker').selectpicker();

  // Fixed navbar on scroll
  const onScroll = () => {
    offsetTop = $(window).scrollTop();

    if ($(window).width() < 559) {
      if (offsetTop > 50) {
        navbar.addClass('navbar-scrolled');
        $('#logo-white').removeClass('logo-visible');
        $('#logo-dark').addClass('logo-visible');

        if (offsetTop > 380) {
          $('#upute-main .bootstrap-select').addClass('fixed-select');
        } else {
          $('#upute-main .bootstrap-select').removeClass('fixed-select');
        }
      } else {
        navbar.removeClass('navbar-scrolled');
        $('#logo-dark').removeClass('logo-visible');
        $('#logo-white').addClass('logo-visible');
      }
    } else {
      if (offsetTop > 100) {
        navbar.addClass('navbar-scrolled');
        $('#logo-white').removeClass('logo-visible');
        $('#logo-dark').addClass('logo-visible');

        if (offsetTop > 380) {
          $('#upute-main .bootstrap-select').addClass('fixed-select');
        } else {
          $('#upute-main .bootstrap-select').removeClass('fixed-select');
        }
      } else {
        navbar.removeClass('navbar-scrolled');
        $('#logo-dark').removeClass('logo-visible');
        $('#logo-white').addClass('logo-visible');
      }
    }
  };


  // Select
  $('#functionalitySelect').on('change', function (e) {
    $('#pills-tab li a').eq($(this).val()).tab('show');
  });
  $('#uputeSelect').on('change', function (e) {
    $('#pills-upute a').eq($(this).val()).tab('show');
  });

  const blur = () => {
    if ($(window).width() < 768) {
      $('#pills-tabContent').toggleClass('blur');
      $('#pills-uputeContent').toggleClass('blur');
    }
  };

  $('#functionalitySelect').on('shown.bs.select', blur);
  $('#functionalitySelect').on('hidden.bs.select', blur);
  $('#uputeSelect').on('shown.bs.select', blur);
  $('#uputeSelect').on('hidden.bs.select', blur);
  $('#uputeSelect').on('changed.bs.select', () => {
    let targetOffset = document.querySelector('#upute-main').offsetTop;
    $('html, body').animate({scrollTop: targetOffset}, 400);
    return false;
  });

  // Active class on navbar
  switch ($('body').data('title')) {
    case 'pocetna':
      $('.navbar-main .nav-item:nth-of-type(1)').addClass('active');
      break;
    case 'upute':
      $('.navbar-main .nav-item:nth-of-type(2)').addClass('active');
      break;
    case 'kontakt':
      $('.navbar-main .nav-item:nth-of-type(3)').addClass('active');
      break;
  }


  // Calling functions
  onScroll();

  // Calling functions on scroll
  $(window).scroll(() => {
    onScroll();
  });

    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": { "background": "#22b6e7", "text": "#ffffff" },
                "button": { "background": "#fff", "text": "#3f427f" }
            },
            "theme": "classic",
            "content": {
                "message": "Na ovoj web stranici se koriste kolačići kako bi vam omogućili najbolje korisničko iskustvo. " +
                    "Pregledavanjem web stranice slažete se s korištenjem kolačića.",
                "dismiss": "PRIHVATI", "link": "<a aria-label='learn more about cookies' tabindex='0' class='cc-link'" +
                  " href='cookies.html' target='_self'>Saznajte više</a>"
            }
        })
    });
});

// Custom form validation
// (function () {
//   'use strict';
//
//   window.addEventListener('load', function () {
//     if ($('body').data('title') === 'kontakt') {
//       var form = document.getElementById('needs-validation');
//       form.addEventListener('submit', function (event) {
//         if (form.checkValidity() === false) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     }
//   }, false);
// })();