'use strict';

// añadir valor al input

const containerInputs = document.querySelectorAll('.container__price');

for (let index = 0; index < containerInputs.length; index++) {
  const containerInput = containerInputs[index];
  const addValue = containerInput.querySelector('.js-inc');
  const removeValue = containerInput.querySelector('.js-dec');
  let total = 0;

  addValue.addEventListener('click', () => {
    if (total < 10) {
      let value = containerInput.querySelector('.quantity').value;
      total = Number(value) + 1;

      containerInput.querySelector('.quantity').value = total;
    }
  });

  removeValue.addEventListener('click', () => {
    if (total > 0) {
      let value = containerInput.querySelector('.quantity').value;
      total = Number(value) - 1;
      containerInput.querySelector('.quantity').value = total;
    }
  });
}

// dragg and drop events

const cart = document.querySelector('.js-cart');
const cartList = document.querySelector('.js-drag-list');
const totalProducts = document.querySelector('.js-total');
const price = document.querySelector('.js-price');
const products = document.querySelectorAll('.js-product');
const addCarts = document.querySelectorAll('.js-btn');

const dragStart = (event) => {
  event.dataTransfer.setData('Text', event.target.id);
};

for (let index = 0; index < products.length; index++) {
  const product = products[index];
  product.addEventListener('dragstart', dragStart);
}

const dragOver = (event) => {
  event.preventDefault();
};

const dropProducts = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text');
  const product = document.querySelector('#' + id);
  addToCart(product, id);
};

cart.addEventListener('drop', dropProducts);
cart.addEventListener('dragover', dragOver);

// add to cart

const addToCart = (id, product) => {
  let exists = document.querySelectorAll(".js-drag-list .js-product[data-id='" + id + "']");

  if (exists.length > 0) {
    updateProducts(exists[0]);
  } else {
    addCartProduct(product, id);
  }
  priceCart();
};

const addCartProduct = (id, product) => {
  const cloneProduct = product.cloneNode(true);
  let quantityValue = cloneProduct.querySelector('.quantity').value;
  cloneProduct.setAttribute('data-id', id);
  cloneProduct.setAttribute('class', 'article__add');
  cloneProduct.setAttribute('data-quantity', quantityValue);
  cloneProduct.removeAttribute('id');

  const removeDiv = cloneProduct.querySelector('.container__btn');
  removeDiv.parentNode.removeChild(removeDiv);
  const removeinfoProduct = cloneProduct.querySelector('.info-product');
  removeinfoProduct.parentNode.removeChild(removeinfoProduct);

  let articleAdd = document.createElement('span');
  articleAdd.setAttribute('class', 'quantity');
  articleAdd.innerHTML = ' x ' + quantityValue;
  cloneProduct.appendChild(articleAdd);
  articleAdd = document.createElement('span');
  articleAdd.setAttribute('class', 'sum');
  cloneProduct.appendChild(articleAdd);

  let deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class', 'fas fa-trash');
  cloneProduct.appendChild(deleteIcon);

  deleteIcon.addEventListener('click', function () {
    let itemToDelete = this.parentElement;
    itemToDelete.parentNode.removeChild(itemToDelete);
    priceCart();
  });

  cartList.appendChild(cloneProduct);
};

// modificar total cesta de la compra

const updateProducts = () => {
  let quantityProducts = item.getAttribute('data-quantity');
  let quantityInput = document.querySelector('.quantity').value;

  quantityProducts = parseInt(quantityProducts);
  quantityProducts = quantityProducts + quantityInput;
  let spanQuantity = item.querySelectorAll('.quantity');
  spanQuantity.innerHTML = ' x ' + quantityProducts;
};

const priceCart = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  let cartProducts = document.querySelectorAll('.article__add');

  for (let index = 0; index < cartProducts.length; index++) {
    let cartProduct = cartProducts[index];
    let quantity = cartProduct.getAttribute('data-quantity');
    let price = cartProduct.querySelector('.price').textContent;
    let totalCart = quantity * parseFloat(price);
    let infoCartProduct = cartProduct.querySelector('span.sum');
    infoCartProduct.innerHTML = ' =  ' + totalCart + '€';

    totalPrice += totalCart;

    let allProducts = cartProduct.getAttribute('data-quantity');
    totalQuantity += parseInt(allProducts);
  }

  let infoPrice = document.querySelector('.cart-price');
  let infoQuantity = document.querySelector('.js-total');

  infoPrice.innerHTML = `<p> Total a pagar: ${totalPrice}€</p>`;
  infoQuantity.innerHTML = `<p> Cantidad: ${totalQuantity} KG</p>`;
};
