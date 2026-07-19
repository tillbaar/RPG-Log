// Wrapping everything in this function keeps "open", "toggle", out of the
// global scope, so they cannot accidentally clash with variables from other
// script on the page. It runs immediately because of the () at the very end.
// This pattern is called an IIFE (Immediately Invoked Function Expression).

(function () {
  var STORAGE_KEY = "sidebar-open";

  var body = document.body;
  var toggle = document.getElementById("sidebar-toggle");
  var sidebar = document.getElementById("sidebar");
  var backdrop = document.getElementById("sidebar-backdrop");

  function setOpen(open) {
    body.classList.toggle("sidebar-open", open);

    // aria-expanded tells screen readers whether the thing this button
    // controls is currently open. Since the button is icon-only, aria-
    // label carries its accessible name, too.
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");

    // inert removes the sidebar's links from keyboard tab order and screen
    // readers while it's closed, since it's still sitting in the page, just
    // slid off-screen, rather than being removed entirely.
    sidebar.toggleAttribute("inert", !open);

    try {
      localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
    } catch (e) {
      // Some browsers block localStorage (e.g. private browsing) - if so,
      // the sidebar still works, it just cannot remember its state.
    }
  }

  var startOpen = false;
  try {
    startOpen = localStorage.getItem(STORAGE_KEY) === "1";
  } catch (e) {
    startOpen = false;
  }
  setOpen(startOpen);

  toggle.addEventListener("click", function () {
    setOpen(!body.classList.contains("sidebar-open"));
  });

  backdrop.addEventListener("click", function () {
    setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });
})();