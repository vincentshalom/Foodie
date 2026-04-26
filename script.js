import products from "./data/products.js";
console.log(products);

const mobileMenu = document.getElementById("mobileMenu");
const menuPanel = document.getElementById("menuPanel");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

const cart = document.getElementById("cart");
const cartPanel = document.getElementById("cartPanel");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("cartOverlay");
const cartList = document.querySelector(".cartList");

const tabContainer = document.querySelector(".tabContainer");
const tabBtns = document.querySelectorAll(".tabBtn");
const textTab = document.querySelectorAll(".textTab");

let productsList = document.querySelector(".productsList");
let totalItemsInCart = document.querySelector(".totalItemsInCart");

function generateHTML(product) {
  return `
   <li>
    <article class="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <a href="/product/${encodeURIComponent(product.name)}" class="block">
        <div class="aspect-square overflow-hidden relative">
          <img 
            src="${product.image}" 
            alt="${product.name}"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          >
          <span class="absolute top-6 right-6 w-fit font-semibold text-white uppercase bg-[#80b500] py-1 px-2 rounded-tl-[15px] rounded-br-[15px] text-sm">new</span>
        </div>

        <header class="p-2">
          <h3 class="font-semibold text-lg line-clamp-2">
            ${product.name}
          </h3>
        </header>
      </a>

      <!-- PRODUCT INFO -->
      <div class="px-3 pb-3 flex flex-col gap-2 grow">
        <p class="text-sm text-gray-600 line-clamp-2">
         ${product.description}
        </p>
        <div class="text-sm text-yellow-500">
          ${Array.from({ length: product.maxRating })
            .map((_, i) => (i < product.ratings ? "★" : "☆"))
            .join(
              "",
            )} <span class="text-gray-500">(${product.totalRated})</span>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <p class="text-[#80b500] font-semibold text-lg">
            <ins class="no-underline">$${product.price}</ins>
            <del class="ml-2 text-sm text-gray-400">$${product.initialPrice}</del>
          </p>
        </div>
        <!-- CTA -->
        <button data-id="${product.id}" class="addToCart mt-2 bg-[#80b500] text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer">
          Add to Cart
        </button>

      </div>
    </article>
  </li>
   `;
}
const items = products.slice(0, 8).map(generateHTML);
productsList.innerHTML = items.join("");

// const productsList = document.querySelector(".productsList");

/* TAB COMPONENT SECTION */
function activeTab(e) {
  e.stopPropagation();
  if (e.target.tagName !== "BUTTON") return;
  const currId = Number(e.target.dataset.id);
  tabBtns.forEach((btn) =>
    btn.classList.remove("border-b", "active:border-red-500"),
  );
  textTab.forEach((text) => text.classList.add("hidden"));

  document
    .querySelector(`.tab--${currId}`)
    .classList.add("border-b", "active:border-red-500");
  document.querySelector(`.text--${currId}`).classList.remove("hidden");
}

// tabContainer.addEventListener("click", activeTab);

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

//ITEMS IN CART
const cartItems = [];

productsList.addEventListener("click", (e) => {
  const btn = e.target.closest(".addToCart");
  if (!btn) return;

  const productId = btn.dataset.id;
  const product = products.find((p) => p.id == productId);

  if (!product) return;

  cartItems.push(product);
  totalItemsInCart.textContent = cartItems.length || 0;
  console.log(cartItems);
});

function loadCartProducts(item) {
  return `<li class="border-t border-slate-100 py-6 flex flex-col lg:flex-row" data-id="">
              <article class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                  <button class="flex items-center justify-center bg-transparent font-bold text-3xl cursor-pointer">
                  <ion-icon name="close-outline"></ion-icon>
              </button>
              <div class="h-24 w-24">
                  <img src="${item.image}" loading="lazy" alt="a fresh apple" class="w-full h-full block object-cover" />
              </div>
           
              <a href="ProductDetail.html" class="hover:text-[#80b500] text-[#1a1a1a] font-bold inline-block text-lg">Apple</a>
              <p class="">$${item.price}</p>
              <div class="border border-slate-200 flex items-center gap-2 p-1 w-fit">
                  <button class="border  border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
                      <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <p class="p-2">10</p>
                  <button class="border  border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
                      <ion-icon name="add-outline"></ion-icon>
                  </button>
              </div>

              <h3 class="font-bold text-lg">$${item.initialPrice}</h3>
              </article>
          </li>`;
}

const cartProducts = cartItems.map((item) => loadCartProducts);
cartList.innerHTML = cartProducts.join("");
// console.log(cartList);

openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);

//OUR PRODUCTS
