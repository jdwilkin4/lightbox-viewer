// Cart functionality
const mainPageQuantitySpan = document.getElementById("main-page-quantity-span");

let mainPageQuantity = Number(mainPageQuantitySpan.textContent);
let cartQuantity = 0;
let hasAddedItemsToCart = false;
let currTotal = 0;

const cartQuantitySpan = document.getElementById("curr-quantity-cart-span");
const itemsInCartText = document.querySelectorAll(".total-items-in-cart");
const currTotalEls = document.querySelectorAll(".total");

function updateTotal() {
  currTotal = cartQuantity * 299.99;
}

function getFormattedTotal() {
  return `$${currTotal.toFixed(2)}`;
}

function updateQuantity(span, increment = true) {
  if (span.id === "main-page-quantity-span") {
    if (increment) {
      mainPageQuantity++;
    } else if (mainPageQuantity > 1) {
      mainPageQuantity--;
    }
    span.textContent = mainPageQuantity;
  } else if (span.id === "curr-quantity-cart-span") {
    if (increment) {
      cartQuantity++;
    } else if (cartQuantity > 1) {
      cartQuantity--;
    }
    span.textContent = cartQuantity;

    for (const cartItem of itemsInCartText) {
      cartItem.textContent = cartQuantity;
    }
    updateTotal();
    currTotalEls.forEach((el) => (el.textContent = getFormattedTotal()));
  }
}

const decrementBtns = document.querySelectorAll(".decrement-btn");
const incrementBtns = document.querySelectorAll(".increment-btn");

decrementBtns.forEach((btn) => {
  const quantitySpan = btn.parentElement.querySelector(".quantity");
  btn.addEventListener("click", () => updateQuantity(quantitySpan, false));
});

incrementBtns.forEach((btn) => {
  const quantitySpan = btn.parentElement.querySelector(".quantity");
  btn.addEventListener("click", () => updateQuantity(quantitySpan, true));
});

const cartContainer = document.querySelector(".cart-container");
const fillCartContainer = document.querySelector(".filled-cart-container");
const emptyCartContainer = document.querySelector(
  ".msg-and-continue-shopping-btn-container"
);

function showCartPanel() {
  cartContainer.style.display = "block";

  if (hasAddedItemsToCart && cartQuantity > 0) {
    for (const cartItem of itemsInCartText) {
      cartItem.style.display = "inline";
      cartItem.textContent = cartQuantity;
    }
    fillCartContainer.style.display = "block";
    emptyCartContainer.style.display = "none";
  } else {
    emptyCartContainer.style.display = "block";
    fillCartContainer.style.display = "none";
  }
}

const addToCartBtn = document.querySelector(".add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  hasAddedItemsToCart = true;
  cartQuantity += mainPageQuantity;

  cartQuantitySpan.textContent = cartQuantity;
  mainPageQuantitySpan.textContent = mainPageQuantity;

  for (const cartItem of itemsInCartText) {
    cartItem.textContent = cartQuantity;
  }

  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = getFormattedTotal()));

  showCartPanel();
});

const shoppingCartBtn = document.querySelector(".shopping-cart-btn");
shoppingCartBtn.addEventListener("click", showCartPanel);

function closeCartPanel() {
  cartContainer.style.display = "none";
  mainPageQuantitySpan.textContent = mainPageQuantity;
}

const closeCartBtn = document.querySelector(".cart-sidepanel .close-btn");
const continueShoppingBtns = document.querySelectorAll(
  ".continue-shopping-btn"
);

closeCartBtn.addEventListener("click", closeCartPanel);
continueShoppingBtns.forEach((btn) =>
  btn.addEventListener("click", closeCartPanel)
);

function resetCart() {
  cartQuantity = 0;
  mainPageQuantity = 1;
  currTotal = 0;
  hasAddedItemsToCart = false;

  mainPageQuantitySpan.textContent = mainPageQuantity;
  cartQuantitySpan.textContent = cartQuantity;

  itemsInCartText.forEach((el) => {
    el.style.display = "none";
    el.textContent = "0";
  });

  cartContainer.style.display = "block";
  emptyCartContainer.style.display = "block";
  fillCartContainer.style.display = "none";
  currTotalEls.forEach((el) => (el.textContent = "$0.00"));
}

const trashCanBtn = document.querySelector(".trash-can-btn");
trashCanBtn.addEventListener("click", resetCart);

// Add to wishlist functionality
function toggleSelectingWishlist() {
  const heartIcon = document.querySelector(".heart-icon");
  const currVal = heartIcon.getAttribute("fill");
  heartIcon.setAttribute("fill", currVal === "none" ? "#a40d0d" : "none");
}
const wishlistBtn = document.querySelector(".wishlist-btn");
wishlistBtn.addEventListener("click", toggleSelectingWishlist);

// Toggle between tabs functionality

function switchToTab(tab) {
  // reset all selected to false then select correct one
  tabs.forEach((tab) => tab.setAttribute("aria-selected", false));
  tab.setAttribute("aria-selected", true);

  // hide all content first then show correct one
  tabPanels.forEach((panel) => panel.setAttribute("hidden", "true"));
  const ariaControlsVal = tab.getAttribute("aria-controls");
  const panel = [...tabPanels].find((panel) => panel.id === ariaControlsVal);
  panel.removeAttribute("hidden");
}

const tabs = document.querySelectorAll("button[role='tab']");
const tabPanels = document.querySelectorAll("div[role='tabpanel']");
tabs.forEach((tab) => tab.addEventListener("click", () => switchToTab(tab)));

// lightbox functionality

const allImages = [...document.querySelectorAll(".thumbnail")].concat([
  ...document.querySelectorAll(".featured-img"),
]);

const lightboxEl = document.querySelector(".lightbox");
const featuredImgEls = document.querySelectorAll(".featured-img");
const thumbnails = document.querySelectorAll(".thumbnail");

function showLightBoxImg(currImg) {
  featuredImgEls.forEach((img) =>
    img.setAttribute("src", currImg.getAttribute("src"))
  );

  const selectedThumbnail = [...thumbnails].find(
    (el) => el.getAttribute("src") === currImg.getAttribute("src")
  );
  const prevSelectedThumbnail = [...thumbnails].find((el) =>
    el.classList.contains("highlighted")
  );

  if (!selectedThumbnail.classList.contains("highlighted")) {
    selectedThumbnail.classList.add("highlighted");
    prevSelectedThumbnail.classList.remove("highlighted");
  }
}

allImages.forEach((img) =>
  img.addEventListener("click", () => {
    lightboxEl.style.display = "block";
    showLightBoxImg(img);
  })
);

function closeLightBox() {
  lightboxEl.style.display = "none";
}

const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
lightboxCloseBtn.addEventListener("click", closeLightBox);

function goToNextImg() {
  let currIndex = [...thumbnails].findIndex((thumbnail) =>
    thumbnail.classList.contains("highlighted")
  );

  const nextImgEl = [...thumbnails][currIndex === 2 ? 0 : currIndex + 1];
  showLightBoxImg(nextImgEl);
}

const lightBoxNextImgBtn = document.querySelector(".right-arrow");
lightBoxNextImgBtn.addEventListener("click", goToNextImg);

function goToPrevImg() {
  let currIndex = [...thumbnails].findIndex((thumbnail) =>
    thumbnail.classList.contains("highlighted")
  );

  const prevImgEl = [...thumbnails][currIndex === 0 ? 2 : currIndex - 1];
  showLightBoxImg(prevImgEl);
}

const lightBoxPrevImgBtn = document.querySelector(".left-arrow");
lightBoxPrevImgBtn.addEventListener("click", goToPrevImg);

// Dialog functionality

const modal = document.querySelector(".popup-modal");
const checkoutBtn = document.querySelector(".checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

checkoutBtn.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
