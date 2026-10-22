const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
// ==================================
// EXPANDABLE EVENING PLAN
// ==================================

const planningToggle = document.querySelector("#planning-toggle");
const planningContent = document.querySelector("#planning-content");

if (planningToggle && planningContent) {

  planningToggle.addEventListener("click", () => {

    const isExpanded =
      planningToggle.getAttribute("aria-expanded") === "true";

    planningToggle.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    planningContent.hidden = isExpanded;

    planningToggle.innerHTML = isExpanded
      ? 'View the evening\'s plan <span aria-hidden="true">↗</span>'
      : 'Close the plan <span aria-hidden="true">↑</span>';

  });

}
