// line animations

function initPage() { 
    const animStroke = document.querySelectorAll(".stroke");

    console.log(animStroke)

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

initPage();
