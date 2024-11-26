jQuery(document).ready(function () {
  console.log("rady");
  var header = jQuery("header"),
    burger = jQuery(".burger"),
    burgerSpan = jQuery(".burger span"),
    body = jQuery("body"),
    nav = jQuery(".header__nav"),
    mission = document.querySelector("#mission"),
    about = document.querySelector("#about"),
    contact = document.querySelector("#contact");
  burger.on("click", function () {
    burgerSpan.toggleClass("active");
    nav.toggleClass("active");
    body.toggleClass("fixed-page");
  });
  var wow = new WOW({
    boxClass: "wow",
    // animated element css class (default is wow)
    animateClass: "animated",
    // animation css class (default is animated)
    offset: 0,
    // distance to the element when triggering the animation (default is 0)
    mobile: false,
    // trigger animations on mobile devices (default is true)
    live: true,
    // act on asynchronously loaded content (default is true)
    callback: function callback(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,
    // optional scroll container selector, otherwise use window,
    resetAnimation: true // reset animation on end (default is true)
  });

  wow.init();
  body.addClass("fixed-page");
  window.addEventListener("load", function () {
    var timing = window.performance.timing;
    var contentLoadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    var preloader = document.getElementById("preloader");
    // Calculate the time it takes for content to load
    setTimeout(function () {
      body.removeClass("fixed-page");
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity .35s";
      preloader.style.display = "none";
    }, contentLoadTime);
  });
  jQuery(".tech-section__right").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    cssEase: "linear",
    arrows: false,
    autoplay: true,
    infinity: true,
    autoplaySpeed: 0,
    speed: 2300,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    }]
  });
  jQuery("a[href^='#']").on("click", function (e) {
    var target = jQuery(this).attr("href");
    jQuery("html, body").animate({
      scrollTop: jQuery(target).offset().top - 90
    }, 1000);
  });
  var options = {};
  function opt() {
    if (jQuery(window).width() > 1400) {
      options = {
        threshold: 0.92
      };
    }
    if (jQuery(window).width() < 1400) {
      options = {
        threshold: 0.8
      };
    }
    if (jQuery(window).width() < 1005) {
      options = {
        threshold: 0.3
      };
    }
  }
  opt();
  jQuery(window).resize(function () {
    opt();
  });
  var arr = [mission, about, contact];
  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      var isIntersecting = entry.isIntersecting,
        intersectionRatio = entry.intersectionRatio;
      if (isIntersecting) {
        // console.log(entry);
        jQuery("a[href^='#".concat(entry.target.id, "']")).addClass("active");
      } else {
        jQuery("a[href^='#".concat(entry.target.id, "']")).removeClass("active");
      }
    });
  };
  var observer = new IntersectionObserver(callback, options);
  arr.forEach(function (e) {
    if (e !== null) {
      observer.observe(e);
    }
  });

  //check to see if the submited cookie is set, if not check if the popup has been closed, if not then display the popup
  if (getCookie("popupCookie") != "submited") {
    jQuery(".cookies").css("display", "block").hide().fadeIn(2000);
  }
  jQuery("a.submit").click(function () {
    jQuery(".cookies").fadeOut();
    //sets the coookie to five minutes if the popup is submited (whole numbers = days)
    setCookie("popupCookie", "submited", 7);
  });
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  console.log(jQuery(".inp-req"));
  jQuery("form").on("submit", function (e) {
    if (jQuery('input[data-required="required"]').val() < 1) {
      jQuery(".inp-req").html("to pole jest wymagane");
      e.preventDefault();
    }
  });
});
