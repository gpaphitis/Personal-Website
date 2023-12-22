document.addEventListener("DOMContentLoaded", function () {
  loadHomePage().then(function () {
    document.getElementById("nav-logo").addEventListener("click", loadHomePage);
    document
      .getElementById("nav-menu")
      .addEventListener("click", navMenuToggle);
    resize();
    document
      .getElementById("form-submit")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let sender = document.getElementById("sender-name").value;
        let msg = document.getElementById("sender-msg").value;
        if (!isFormValid(sender, msg)) return;
        sendEmail(sender, msg);
      });
  });
});

//* Loads main page contents
async function loadHomePage() {
  let header = await getTextResponse(
    "https://giorgospaphitis.com/resources/html/header.html"
  );
  let personalInfo = await getTextResponse(
    "https://giorgospaphitis.com/resources/html/personal-info.html"
  );
  let contactMe = await getTextResponse(
    "https://giorgospaphitis.com/resources/html/contact-me.html"
  );
  document.querySelector("#page-content-wrapper").innerHTML =
    header + personalInfo + contactMe;
}

//* Loads certifications page contents
async function loadCertificationsPage() {
  let certifications = await getTextResponse(
    "https://giorgospaphitis.com/resources/html/certifications.html"
  );
  document.querySelector("#page-content-wrapper").innerHTML = certifications;
}

//* Returns text response of GET request to given URL
async function getTextResponse(url) {
  let response = await fetch(url);
  let data = await response.text();
  return data;
}

//* Sends email to me using EmailJS API
async function sendEmail(sender, msg) {
  let props = await getAPIProperties();
  let url = "https://api.emailjs.com/api/v1.0/email/send";
  const API_KEY = props["api-key"];
  const TEMPLATE_ID = props["template-id"];
  const SERVICE_ID = props["service-id"];
  let request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: API_KEY,
      template_params: {
        from_name: sender,
        message: msg,
      },
    }),
  });
  let response = await fetch(request);
  alert("Message sent successfully!");
}

//* Fetches EmailJS API properties from local json file
async function getAPIProperties() {
  let response = await fetch(
    "https://giorgospaphitis.com/resources/api-properties.json"
  );
  let data = await response.json();
  return data;
}

//* Switches current state of nav menu
function navMenuToggle() {
  if (isNavMenuActive()) {
    toggleOffNavMenu();
  } else {
    toggleOnNavMenu();
  }
}

//* Checks if nav menu is active
function isNavMenuActive() {
  return document
    .getElementById("nav-menu-options")
    .classList.contains("menu-active");
}

//* Toggles nav menu off
function toggleOffNavMenu() {
  document.getElementById("nav-menu-options").classList.remove("menu-active");
  document.getElementById("nav-menu-options").classList.add("menu-inactive");
  document.getElementById("nav-container").classList.remove("height-auto");
}

//* Toggles nav menu on
function toggleOnNavMenu() {
  document.getElementById("nav-menu-options").classList.remove("menu-inactive");
  document.getElementById("nav-menu-options").classList.add("menu-active");
  document.getElementById("nav-container").classList.add("height-auto");
}

//* Checks if form fields for email are empty
function isFormValid(sender, msg) {
  if (sender == "") {
    alert("No name was entered.");
    return false;
  } else if (msg == "") {
    alert("No message was entered.");
    return false;
  }
  return true;
}

//* Changes personal info's block heights based on windows current width
function resize() {
  let docWidth = document.querySelector("body").offsetWidth;
  // 975 and 752 are the values of the body width when window is at 992px and 768px respectively
  if (docWidth >= 975) {
    if (isNavMenuActive()) {
      toggleOffNavMenu();
    }
    changeHeightSiblings(3);
  } else if (docWidth >= 752) {
    if (isNavMenuActive()) {
      toggleOffNavMenu();
    }
    changeHeightSiblings(2);
  } else {
    deletePreviousStyles();
  }
}

// If window is resized then this event will trigger to fix the view
window.addEventListener("resize", resize);

//* Changes height of personal info's block based on given row length(n)
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
