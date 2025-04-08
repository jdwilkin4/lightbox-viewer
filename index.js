// Cart functionality
const quantitySpan = document.getElementById("main-page-quantity-span");

let currQuantity = Number(quantitySpan.textContent);
let hasAddedItemsToCart = false;
let currTotal = 0;

const currQuantitySpans = document.querySelectorAll(".quantity");
const itemsInCartText = document.querySelector(".total-items-in-cart");
const currTotalEls = document.querySelectorAll(".total");

function updateTotal() {
  currTotal = currQuantity * 299.99;
}

function getFormattedTotal() {
  return `$${currTotal.toFixed(2)}`;
}

function decrementQuantity() {
  if (currQuantity === 1) return;

  currQuantity--;

  for (const span of currQuantitySpans) {
    span.textContent = currQuantity;
  }

  itemsInCartText.textContent = currQuantity;
  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = getFormattedTotal()));
}

const decrementBtns = document.querySelectorAll(".decrement-btn");
decrementBtns.forEach((btn) =>
  btn.addEventListener("click", decrementQuantity)
);

function incrementQuantity() {
  currQuantity++;

  for (const span of currQuantitySpans) {
    span.textContent = currQuantity;
  }

  itemsInCartText.textContent = currQuantity;
  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = getFormattedTotal()));
}

const incrementBtns = document.querySelectorAll(".increment-btn");
incrementBtns.forEach((btn) =>
  btn.addEventListener("click", incrementQuantity)
);

const cartContainer = document.querySelector(".cart-container");
const fillCartContainer = document.querySelector(".filled-cart-container");
const emptyCartContainer = document.querySelector(
  ".msg-and-continue-shopping-btn-container"
);

function showCartPanel() {
  cartContainer.style.display = "block";
  emptyCartContainer.style.display = "none";

  if (hasAddedItemsToCart) {
    itemsInCartText.style.display = "inline";
    itemsInCartText.textContent = currQuantity;
    fillCartContainer.style.display = "block";
  } else {
    emptyCartContainer.style.display = "block";
  }
}

const addToCartBtn = document.querySelector(".add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  if (!hasAddedItemsToCart) {
    hasAddedItemsToCart = true;
  } else {
    currQuantity += currQuantity;
  }

  for (const span of currQuantitySpans) {
    span.textContent = currQuantity;
  }

  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = getFormattedTotal()));

  showCartPanel();
});

const shoppingCartBtn = document.querySelector(".shopping-cart-btn");
shoppingCartBtn.addEventListener("click", showCartPanel);

function closeCartPanel() {
  cartContainer.style.display = "none";
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
  currTotal = 0;
  hasAddedItemsToCart = false;
  currQuantity = 1;
  itemsInCartText.style.display = "none";
  cartContainer.style.display = "none";
  emptyCartContainer.style.display = "block";
  fillCartContainer.style.display = "none";
  for (const span of currQuantitySpans) {
    span.textContent = currQuantity;
  }
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
