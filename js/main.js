'use strict';

const products = document.querySelector('.js-cart-items');

const cart = document.getElementById('js-cart');

products.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);

  console.log(e.target.id);
});
