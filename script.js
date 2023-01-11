const animStroke = document.querySelectorAll(".stroke");
const nav = document.getElementById("top-nav");
const hamburgerElems = document.getElementsByClassName("burger-line");
const menuNav = document.getElementById("mobile-nav");
let windowWidth = window.innerWidth;
// console.log(windowHeight);
let lastScroll = 0;

// initialize page
function initPage() { 

  window.onscroll = function () {
    showNav();
  };

  window.onload = function () {
    menuNav.classList.add("loaded");
  }

  window.onresize = function () {
    windowWidth = window.innerWidth;

    //get rid of menu and allow scroll when the screen is resized
    if (windowWidth > 882) {
      if (menuNav.classList.contains("active") || nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuNav.classList.remove("active");

        document.body.classList.remove("no-scroll");
        Array.prototype.forEach.call(hamburgerElems, function (elem) {
          elem.classList.remove("active");
        });
      }
    }
  }

  // line animations
    const observer = new IntersectionObserver(
        function addScrollClass(entries) {
          for (i = 0; i < entries.length; i++) {
            let elem = entries[i].target;
            if (entries[i].isIntersecting) {
                elem.classList.add("scrolled");
            }
          }
        },
        {
          threshold: [0.15, 0.35, 0.55, 0.75, 0.95],
        }
    );

    // initialize stroke animations
    for (i = 0; i < animStroke.length; i++) {
        const strk = animStroke[i];

    // set observer on stroke
    !strk.classList.contains("scrolled")
      ? observer.observe(strk)
      : observer.unobserve(strk);
  }

}


function showNav() {
  const currentScroll = window.pageYOffset;
  if (
    currentScroll > lastScroll 
    && nav.classList.contains("hide-nav-top")
  ) {
    console.log("second conditional " + nav.classList);
    //scroll down
    nav.classList.remove("hide-nav-top");
    nav.classList.add("display-nav-top");
    console.log("second conditional " + nav.classList);
  } 
  else if (
    currentScroll < lastScroll 
  ) {
    //scroll up
    nav.classList.remove("display-nav-top");
    nav.classList.add("hide-nav-top");
    console.log("third conditional " + nav.classList);
    if (currentScroll <= 0) {
      nav.classList.remove("hide-nav-top");
    }
  }
  lastScroll = currentScroll;
}

function toggleNav() {
  if (!menuNav.classList.contains("active")) {
    nav.classList.add("active");
    menuNav.classList.add("active");

    //iterate through node list as if it was an array
    Array.prototype.forEach.call(hamburgerElems, function (elem) {
      elem.classList.add("active");
      if (elem.classList.contains("inactive")) {
        elem.classList.remove("inactive");
      }
    });

    document.body.classList.add("no-scroll");
  } else {
    menuNav.classList.remove("active");
    nav.classList.remove("active");

    Array.prototype.forEach.call(hamburgerElems, function (elem) {
      elem.classList.remove("active");
      elem.classList.add("inactive");
    });

    document.body.classList.remove("no-scroll");
  }
}

initPage();
