const API = 'https://raw.githubusercontent.com/Egomaniaca/JSDZv2/lesson3/lesson3'

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x400',
        imgCart: 'https://via.placeholder.com/50x100',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    created() {

    },
    beforeDestroy() {

    },
    beforeUpdate() {

    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});


// function getRequest(url, cb) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
//     xhr.send();
// }

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };
// class List {
//     constructor(url, container, list = listContext) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }


//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }


//     handleData(data) {
//         this.goods = data;
//         this.render();
//     }


//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum + item.price, 0);
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             console.log(this.constructor.name);

//             let productObj = null;
//             if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
//             if (this.constructor.name === 'Cart') productObj = new CartItem(product);
//             if (!productObj) return;

//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }


//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _init() {
//         return false
//     }
// }

// class Item {
//     constructor(el, img = 'https://via.placeholder.com/200x400') {
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render() {
//         return ``;
//     }
// }


// class ProductsList extends List {
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }

//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
//     }
// }

// class ProductItem extends Item {
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                   <img src="${this.img}" alt="Some img">
//                   <div class="desc">
//                       <h3>${this.product_name}</h3>
//                       <p>${this.price} ₽</p>
//                       <button class="buy-btn"
//                       data-id="${this.id_product}"
//                       data-name="${this.product_name}"
//                       data-price="${this.price}">Купить</button>
//                   </div>
//               </div>`;
//     }
// }

// class Cart extends List {
//     constructor(container = ".cart-block", url = "/getBasket.json") {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }


//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };

//                         this.goods = [product];

//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }


//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }


//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
//         block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
//     }
//     _init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target);
//             }
//         })
//     }

// }

// class CartItem extends Item {
//     constructor(el, img = 'https://via.placeholder.com/50x100') {
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render() {
//         return `<div class="cart-item" data-id="${this.id_product}">
//               <div class="product-bio">
//               <img src="${this.img}" alt="Some image">
//               <div class="product-desc">
//               <p class="product-title">${this.product_name}</p>
//               <p class="product-quantity">Количество: ${this.quantity}</p>
//           <p class="product-single-price">${this.price} за ед.</p>
//           </div>
//           </div>
//           <div class="right-block">
//               <p class="product-price">${this.quantity * this.price} ₽</p>
//               <button class="del-btn" data-id="${this.id_product}">&times;</button>
//           </div>
//           </div>`
//     }
// }

// const listContext = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };

// let cart = new Cart();
// let products = new ProductsList(cart);


// _fetchGoodsData() {
    //   getRequest(`${API}/catalogData.json`, (response) => {
    //     console.log(response);
    //     this._goods = JSON.parse(response);
    //     console.log(this._goods);
    //     this._render();
    //   });
    // }

/*   getProducts() {
      return fetch(`${API}/catalogData.json`)
          .then(response => response.json())
          .catch(err => console.log(err));
  }

  sum() {
      return this._productObjects.reduce((sum, { price }) => sum + price, 0);
  }

  _render() {
      const catalogBlock = document.querySelector(this._container);

      for (let product of this._goods) {
          const productObject = new ProductItem(product);
          console.log(productObject)
          this._productObjects.push(productObject);
          catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
      }
  }
} */



/* const goods = [
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
];

const renderGoodsItem = ({ title, price }, img = "https://via.placeholder.com/150x150") =>

    `<div class="goods-item" data-id="${this.id}">
        <img src="${img}" alt="Photo">
        <div class="desc">
            <h3>${title}</h3 >
            <p>${price}</p>
            <button class="buy-btn">Купить</button>
        </div >
    </div >`;


const renderGoodsList = (list) => {
    /*    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
       console.log(goodsList);
       document.querySelector('.goods-list').innerHTML = goodsList;
    */
/*   const goodsBlock = document.querySelector('.goods-list');

   list.forEach(item => {
       goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem(item));
   });
};

renderGoodsList(goods); */
