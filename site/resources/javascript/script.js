document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("nav-menu").addEventListener("click", function () {
    if (
      document
        .getElementById("nav-menu-options")
        .classList.contains("menu-inactive")
    ) {
      document
        .getElementById("nav-menu-options")
        .classList.remove("menu-inactive");
      document.getElementById("nav-menu-options").classList.add("menu-active");
      document.getElementById("nav-container").classList.add("height-auto");
    } else {
      document
        .getElementById("nav-menu-options")
        .classList.remove("menu-active");
      document
        .getElementById("nav-menu-options")
        .classList.add("menu-inactive");
      document.getElementById("nav-container").classList.remove("height-auto");
    }
  });
  resize();
});

let resize = () => {
  let docWidth = document.querySelector("body").offsetWidth;
  console.log(docWidth);
  // 975 and 752 are the values of the body width when window is at 992px and 768px respectively
  if (docWidth >= 975) {
    changeHeightSiblings(3);
  } else if (docWidth >= 752) changeHeightSiblings(2);
};

// If window is resized then this event will trigger to fix the view
window.addEventListener("resize", resize);

function changeHeightSiblings(n) {
  let heads = document.querySelectorAll(`.info-block.col-${n}-head`);
  for (let i = 0; i < heads.length; i++) {
    for (let j = 2; j <= n; j++) {
      let height = `.info-block:nth-child(${i * n + j}) {height: ${
        //0.5 is very important. We want it to be slightly bigger because if it is a bit smaller then next element
        // will clip the edge of the previous one since they are floated i.e. _- next element clips at the underscore
        heads[i].offsetHeight + 0.5
      }px;}`;
      addStyle(height);
    }
  }
}

function addStyle(css) {
  let el = document.createElement("style");
  el.innerText = css;
  document.head.appendChild(el);
}
