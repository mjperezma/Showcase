'use strict';

let products = [];
let addProducts = [];
const productsElement = document.querySelector('.js-cart-items');
const cartElements = document.getElementById('js-cart');

// coger los datos que vamos a pintar

const getApiData = () => {
  fetch('../js/api/data.json')
    .then((response) => response.json())
    .then((data) => {
      products = data.products.items;
      paintProducts();
      paintCartElements();
    });
};

// pintar los productos en el HTML

const getProductsHtmlCode = (product) => {
  let htmlCode = '';
  htmlCode += `<div ondrop='drop(event) ondragover='allowDrop(event)>`;
  htmlCode += `<article onClick="productInfo()" ondragstart='dragStart(event)' draggable='true' ondragend='dragEnd(event)'  id="${product.id}" class='products__article js-product>'  draggable='true'>`;
  htmlCode += ` <img class='products__img' src="${product.image}"' alt='${product.name}' />`;
  htmlCode += `<div class='container__price'>`;
  htmlCode += ` <h3>${product.name}</h3>`;
  htmlCode += `<small>${product.price}€/K</small>`;
  htmlCode += `<button class='btn js-btn' id='${product.id}'>
      Añadir a la cesta
    </button>`;
  htmlCode += `</div>`;
  htmlCode += `</article>`;
  htmlCode += `</div>`;

  return htmlCode;
};

const paintProducts = () => {
  let productsCode = '';
  for (const product of products) {
    productsCode += getProductsHtmlCode(product);
  }

  productsElement.innerHTML = productsCode;
  listenAddProductsBtns();
};

// escuchar los productos clickados

const listenAddProductsBtns = () => {
  const btns = document.querySelectorAll('.js-btn');

  btns.forEach((btn) => {
    return btn.addEventListener('click', addProductQuantity);
  });
};

// obtener el producto seleccionado

const addProductQuantity = (ev) => {
  let clickedId = ev.target.id;
  let foundItem;
  // comprobamos si el producto está en la cesta
  for (let item of addProducts) {
    if (item.id === clickedId) {
      foundItem = item;
    }
  }
  //   si no está en la cesta
  if (foundItem === undefined) {
    let foundProduct;
    //   buscamos el elemento clickado
    for (let product of products) {
      if (product.id === clickedId) {
        foundProduct = product;
      }
    }

    // añado el producto a la cesta
    addProducts.push({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      image: foundProduct.image,
      quantity: 1,
    });
  } else {
    foundItem.quantity += 1;
  }

  paintCartElements();
};

//  eliminar productos de la cesta

const decProductQuantity = (ev) => {
  let clickedId = ev.target.id;
  let foundItem;
  for (const item of addProducts) {
    if (item.id === clickedId) {
      foundItem = item;
    }
  }
  if (foundItem.quantity > 1) {
    foundItem.quantity -= 1;
  } else {
    let foundIndex;
    for (let index = 0; index < addProducts.length; index += 1) {
      if (addProducts[index.id === clickedId]) {
        foundIndex = index;
      }
    }
    addProducts.splice(foundIndex, 1);
  }
  paintCartElements();
};

// pintar la cesta

const getCartHtmlCode = (item) => {
  let htmlCodeAdd = '';
  htmlCodeAdd += `<article class='article__add'>`;
  htmlCodeAdd += `<h3>${item.name}</h3>`;
  htmlCodeAdd += `<img class='article__add--img' src=${item.image} alt=${item.name}>`;
  htmlCodeAdd += `    <button class="article__btn js-dec-item " id=${item.id}>-</button>`;
  htmlCodeAdd += `    ${item.quantity}`;
  htmlCodeAdd += `    <button class="article__btn js-add-item" id=${item.id}>+</button>`;
  htmlCodeAdd += `<span> Total : ${item.price * item.quantity}€ </span>`;
  htmlCodeAdd += `<button class='btn__delete js-delete' id=${item.id}><i class="fa fa-trash" aria-hidden="true"></i></button>`;
  htmlCodeAdd += `</article>`;

  return htmlCodeAdd;
};

// pintar el total de la cesta

const getTotalPriceHtml = () => {
  let htmlCodeTotal = '';
  htmlCodeTotal += `<div>`;
  htmlCodeTotal += `<span class='total__price'>Total: ${getTotalPrice()} €</span>`;
  htmlCodeTotal += `</div>`;
  return htmlCodeTotal;
};

// conseguir el total de la cesta

const getTotalPrice = () => {
  let total = 0;
  for (const item of addProducts) {
    total += item.price * item.quantity;
  }

  return total;
};

const paintCartElements = () => {
  cartElements.innerHTML = '';
  for (const item of addProducts) {
    cartElements.innerHTML += getCartHtmlCode(item);
  }
  cartElements.innerHTML += getTotalPriceHtml();
  listenItemBtns();
  listenerDelete();
};

// escuchar los eventos de la cesta
const listenItemBtns = () => {
  const itemAddBtns = document.querySelectorAll('.js-add-item');
  for (const itemAddBtn of itemAddBtns) {
    itemAddBtn.addEventListener('click', addProductQuantity);
  }

  const itemDecBtns = document.querySelectorAll('.js-dec-item');

  for (const itemDecBtn of itemDecBtns) {
    itemDecBtn.addEventListener('click', decProductQuantity);
  }
};

// eliminar elementos de la lista
const listenerDelete = () => {
  const deleteBtns = document.querySelectorAll('.js-delete');

  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', deleteProduct);
  }
};

const deleteProduct = (ev) => {
  let clickedDeleted = ev.target.id;
  let foundIndex;
  for (let index = 0; index < addProducts.length; index++) {
    if (clickedDeleted === addProducts[index].id) {
      foundIndex = index;
    }
    addProducts.splice(foundIndex, 1);
  }
  paintCartElements();
};

// iniciar app

paintCartElements();
getApiData();

// drag and drop events

const productInfo = () => {
  console.log('hola', addProducts);
  for (let addProduct of addProducts) {
    console.log(addProduct.quantity, addProduct.id);
  }
  paintCartElements();
};

productInfo();

const dragCart = document.querySelector('.js-drag-cart');
let Id = document.getElementById('js-cart');
let idDrag = document.getElementById('id.product');

function dragStart(event) {
  event.dataTransfer.setData('Text/plain', event.target.id);
  console.log(event.target.id);
}

function dragEnd(event) {
  dragCart.classList.add('active');
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData('Text');

  event.target.appendChild(document.getElementById(data));
}
