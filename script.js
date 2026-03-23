const mobileMenu = document.getElementById("mobileMenu");
const menuPanel = document.getElementById("menuPanel");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

const cart = document.getElementById("cart");
const cartPanel = document.getElementById("cartPanel");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("cartOverlay");

// MOBILE MENU SECTION STARTS
function openMenu() {
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  menuPanel.classList.remove("-translate-x-full");
}

function closeMenu() {
  mobileMenu.classList.add("opacity-0");
  menuPanel.classList.add("-translate-x-full");

  setTimeout(() => {
    mobileMenu.classList.add("pointer-events-none");
  }, 300);
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

//MOBILE MENU SECTION ENDS

//CART SECTION STARTS
function openCartFunc() {
  cart.classList.remove("hidden");
  setTimeout(() => {
    cartPanel.classList.remove("translate-x-full");
  }, 10);
}

function closeCartFunc() {
  cartPanel.classList.add("translate-x-full");
  setTimeout(() => {
    cart.classList.add("hidden");
  }, 300);
}

openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);
