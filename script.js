const animStroke = document.querySelectorAll(".stroke");
const nav = document.getElementById("top-nav");
let windowHeight = window.innerHeight;
// console.log(windowHeight);
let lastScroll = 0;

// initialize page
function initPage() { 

  window.onscroll = function () {
    showNav();
  };

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
    // console.log(currentScroll);
  if (currentScroll <= 0) {
    nav.classList.remove("hide-nav-top");
    return;
  }
  if (
    currentScroll > lastScroll 
  ) {

    nav.classList.remove("hide-nav-top");
    nav.classList.add("display-nav-top");
    // console.log("down");
  } else if (
    currentScroll < lastScroll 
    && nav.classList.contains("display-nav-top")
  ) {
    //scroll up
    nav.classList.remove("display-nav-top");
    nav.classList.add("hide-nav-top");
    // console.log("up");
  }
  lastScroll = currentScroll;
}

initPage();
