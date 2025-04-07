let currQuantity = 1;
let hasAddedItemsToCart = false;
let currTotal = 0;

const currQuantitySpans = document.querySelectorAll(".quantity");
const itemsInCartText = document.querySelector(".total-items-in-cart");
const currTotalEls = document.querySelectorAll(".total");

function updateTotal() {
  currTotal = currQuantity * 299.99;
}

function decrementQuantity() {
  if (currQuantity === 1) return;

  currQuantity--;
  currQuantitySpans.forEach((span) => (span.textContent = currQuantity));
  itemsInCartText.textContent = currQuantity;
  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = `$${currTotal}`));
}

const decrementBtns = document.querySelectorAll(".decrement-btn");
decrementBtns.forEach((btn) =>
  btn.addEventListener("click", decrementQuantity)
);

function incrementQuantity() {
  currQuantity++;

  currQuantitySpans.forEach((span) => (span.textContent = currQuantity));
  itemsInCartText.textContent = currQuantity;
  updateTotal();
  currTotalEls.forEach((el) => (el.textContent = `$${currTotal}`));
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
  hasAddedItemsToCart = true;
  emptyCartContainer.style.display = "none";
  currQuantity++;
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
