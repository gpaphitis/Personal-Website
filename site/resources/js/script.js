const page = {
  Main: "main",
  Certificates: "Certificates",
};
const rootUrl='https://giorgospaphitis.com';
// const rootUrl = 'http://localhost:5500';
let currentPage = null;

document.addEventListener("DOMContentLoaded", function ()
{
  document.getElementById("nav-logo").addEventListener("click", loadHomePage);
  document.getElementById("nav-menu").addEventListener("click", navMenuToggle);
  loadHomePage();
});

// If window is resized then this event will trigger to fix the view
window.addEventListener("resize", $resizer.resize);

//* Loads main page and scrolls to "About me" section
async function gotToAboutMe()
{
  goToElement('#personal-info');
}

//* Loads main page and scrolls to "Contact me" section
async function gotToContactMe()
{
  goToElement('#contact-me');
}
async function goToElement(selector)
{
  loadHomePage().then(() =>
  {
    window.scrollTo(0, findHeightOffset(selector));
  });
}

//* Finds offset from the top of the page
function findHeightOffset(selector)
{
  let height = 0;
  let element = document.querySelector(selector);
  return element.offsetTop;
}

//* Loads main page contents
async function loadHomePage()
{
  if (currentPage == page.Main) return;
  let header = await getTextResponse(
    `${rootUrl}/resources/html/header.html`
  );
  let personalInfo = await getTextResponse(
    `${rootUrl}/resources/html/personal-info.html`
  );
  let contactMe = await getTextResponse(
    `${rootUrl}/resources/html/contact-me.html`
  );
  document.querySelector("#page-content-wrapper").innerHTML =
    header + personalInfo + contactMe;
  $resizer.resize();

  // Add form listener
  document
    .getElementById("form-submit")
    .addEventListener("click", function (e)
    {
      e.preventDefault();
      $emailSender.sendEmail($formHandler.getFormValues()).then((sent) =>
      {
        if (sent == null)
          return;
        else if (sent)
          $formHandler.makeVisible(document.querySelector('#message-sent'));
        else
          $formHandler.makeVisible(document.querySelector('#message-error'));
      });
    });
  currentPage = page.Main;
}

//* Loads certifications page contents
async function loadCertificationsPage()
{
  if (currentPage == page.Certificates) return;
  let certificationTemplate = await getTextResponse(
    `${rootUrl}/resources/html/certifications.html`
  );
  document.querySelector("#page-content-wrapper").innerHTML =
    certificationTemplate;
  let certificates = await getJsonData(
    `${rootUrl}/resources/certificates.json`
  );
  injectCertificates(certificates);
  currentPage = page.Certificates;
}

//* Injects certificates to page with the appropriate structure
async function injectCertificates(certificates)
{
  let i = 1;
  // Iterate through json properties
  while (certificates.hasOwnProperty(`${i}`)) {
    let cert = certificates[`${i}`];
    let listItem = `<div class="cert-list-elem"><li class="cert-link-header">${cert["title"]}</li>`;
    // Some links do not have a url
    if (cert["url"] != "")
      listItem += `<a class="cert-link" href="${cert["url"]}" target="_blank">${cert["url"]}</a>`;
    listItem += "</div>";
    document.querySelector("#cert-list").innerHTML += listItem;
    i++;
  }
}

//* Returns text response of GET request to given URL
async function getTextResponse(url)
{
  let response = await fetch(url);
  let data = await response.text();
  return data;
}

//* Fetches EmailJS API properties from local json file
async function getJsonData(url)
{
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

//* Switches current state of nav menu
function navMenuToggle()
{
  if (isNavMenuActive()) {
    toggleOffNavMenu();
  } else {
    toggleOnNavMenu();
  }
}

//* Checks if nav menu is active
function isNavMenuActive()
{
  return document
    .getElementById("nav-menu-options")
    .classList.contains("menu-active");
}

//* Toggles nav menu off
function toggleOffNavMenu()
{
  document.getElementById("nav-menu-options").classList.remove("menu-active");
  document.getElementById("nav-menu-options").classList.add("menu-inactive");
  document.getElementById("nav-container").classList.remove("height-auto");
}

//* Toggles nav menu on
function toggleOnNavMenu()
{
  document.getElementById("nav-menu-options").classList.remove("menu-inactive");
  document.getElementById("nav-menu-options").classList.add("menu-active");
  document.getElementById("nav-container").classList.add("height-auto");
}