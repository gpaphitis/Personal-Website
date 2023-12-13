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
      document
        .getElementById("nav-menu-options")
        .classList.add("menu-active");
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
});
