window.addEventListener("DOMContentLoaded", () => {
  // Works for groups of similar tablists
  const tabLists = Array.from(document.querySelectorAll('[role="tablist"]'));
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

  // Add navigation event handlers to each tab
  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabsMouse);
    tab.addEventListener('keydown', changeTabsKey);
  });
});

function changeTabsMouse(e) {
  const targetTab = e.target;
  const tabParent = targetTab.parentNode;
  const tabPanelGroup = tabParent.parentNode.children[1];

  // Remove all current selected tabs
  tabParent
    .querySelectorAll(':scope > [aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  for (const tab of tabParent.children) tab.setAttribute("tabindex", -1);
  targetTab.setAttribute("aria-selected", true);
  targetTab.setAttribute("tabindex", 0);
  targetTab.focus();

  // Hide all tab panels
  tabPanelGroup
    .querySelectorAll(':scope > [role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  // Show the selected panel
  tabPanelGroup
    .querySelector(`#${targetTab.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}

function changeTabsKey(e) {

  let targetTab = e.target;
  const tabParent = targetTab.parentNode;
  const tabPanelGroup = tabParent.parentNode.children[1];

switch (true) {
  case (e.key == 'ArrowLeft') || (e.shiftKey && e.key == 'Tab'):
    targetTab = targetTab.previousElementSibling || targetTab.parentNode.lastElementChild;
    break;
  case (e.key == 'ArrowRight') || (e.key == "Tab"):
    targetTab = targetTab.nextElementSibling || targetTab.parentNode.firstElementChild;
    break;
}

  // Remove all current selected tabs
  tabParent
    .querySelectorAll(':scope > [aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  for (const tab of tabParent.children) tab.setAttribute("tabindex", -1);
  targetTab.setAttribute("aria-selected", true);
  targetTab.setAttribute("tabindex", 0);
  targetTab.focus();

  // Hide all tab panels
  tabPanelGroup
    .querySelectorAll(':scope > [role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  // Show the selected panel
  tabPanelGroup
    .querySelector(`#${targetTab.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}
