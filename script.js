const mobileMenu = document.getElementById("mobileMenu");
const menuPanel = document.getElementById("menuPanel");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

/* OPEN MENU FUNCTION */
function openMenu() {
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  menuPanel.classList.remove("-translate-x-full");
}

/* CLOSE MENU FUNCTION */
function closeMenu() {
  mobileMenu.classList.add("opacity-0");
  menuPanel.classList.add("-translate-x-full");

  /* delay hiding clicks until animation finishes */
  setTimeout(() => {
    mobileMenu.classList.add("pointer-events-none");
  }, 300);
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// close when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});
