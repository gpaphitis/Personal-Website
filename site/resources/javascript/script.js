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
  // 975 and 752 are the values of the body width when window is at 992px and 768px respectively
  if (docWidth >= 975) {
    changeHeightSiblings(3);
  } else if (docWidth >= 752) changeHeightSiblings(2);
  else {
    deletePreviousStyles();
  }
};

// If window is resized then this event will trigger to fix the view
window.addEventListener("resize", resize);

function changeHeightSiblings(n) {
  deletePreviousStyles();
  let blocks = document.querySelectorAll(`.info-block`).length;
  let totalHeightRows = 0;

  // Move row by row(i+=n) and adjust height
  for (let i = 0; i < blocks; i += n) {
    let height = findBiggestRowHeight(i / n, n);
    totalHeightRows += height;

    // For each block of the row adjust height
    for (let j = 1; j <= n; j++) {
      //Element numbering starts from 1
      let heightCSS = `.info-block:nth-child(${i + j}) {height: ${height}px;}`;
      addStyle(heightCSS);
    }
  }
  totalHeightRows += 30;
  addStyle(`#personal-info{height:${totalHeightRows + 10}px;}`);
}
//* Finds block with biggest height of the given row
function findBiggestRowHeight(row, rowLength) {
  // Select first of row
  let max = document.querySelector(
    `.info-block:nth-child(${row * rowLength + 1})`
  ).offsetHeight;
  for (let i = 2; i <= rowLength; i++) {
    let currHeight = 0;
    // Row might not be full so check first
    if (
      document.querySelector(`.info-block:nth-child(${row * rowLength + i})`) !=
      null
    ) {
      currHeight = document.querySelector(
        `.info-block:nth-child(${row * rowLength + i})`
      ).offsetHeight;
    }
    if (max < currHeight) max = currHeight;
  }
  return max;
}
//* Deletes styles added from previous resizes
function deletePreviousStyles() {
  let previous = document.getElementsByClassName("added-style");
  // Length decreases by one so repeatedly remove first element
  while (previous.length > 0) {
    previous[0].remove();
  }
}

//* Injects given css string as style in head
function addStyle(css) {
  let element = document.createElement("style");
  element.classList.add("added-style");
  element.innerText = css;
  document.head.appendChild(element);
}
