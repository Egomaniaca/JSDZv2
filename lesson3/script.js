// const goods = [
//     { id: 1, title: 'Shirt', price: 150 },
//     { id: 2, title: 'Socks', price: 50 },
//     { id: 3, title: 'Jacket', price: 350 },
//     { id: 4, title: 'Shoes', price: 250 },
// ];

// const renderGoodsItem = ({ title, price }, img = "https://via.placeholder.com/150x150") => `<div class="goods-item" data-id="${this.id}">
//         <img src="${img}" alt="Photo">
//         <div class="desc">
//             <h3>${title}</h3 >
//             <p>${price}</p>
//             <button class="buy-btn">Купить</button>
//         </div >
//     </div >`;


// const renderGoodsList = (list) => {
//     /*    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
//        console.log(goodsList);
//        document.querySelector('.goods-list').innerHTML = goodsList;
//     */
//     const goodsBlock = document.querySelector('.goods-list');

//     list.forEach(item => {
//         goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem(item));
//     });
// };

// renderGoodsList(goods);


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function getRequest(url) {
    return new Promise(function (resolve, reject) {

    })
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status !== 200) {
    //             console.log('ОШИБКА!');
    //         } else {
    //             cb(xhr.responseText);
    //         }
    //     }
    // }
    // xhr.send();
}

class ProductList {
    constructor(container = '.goods-list') {
        this._container = container;
        this._goods = [];
        this._productObject = [];
        this.getProducts().then((data) => {
            this._goods = data;
            this._render();
        });

    }



    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    sum() {
        return this._productObject.reduce((sum, { price }) => sum + price, 0);
    }

    _render() {
        const catalogBlock = document.querySelector(this._container);
        for (let product of this._goods) {
            const productObject = new ProductTItem(product);
            this._productObject.push(productObject);
            catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductTItem {
    constructor(product, img = "https://via.placeholder.com/150x150") {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="goods-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Photo">
                    <div class="desc">
                        <h3>${this.title}</h3 >
                        <p>${this.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div >
                </div >`;
    }
}

new ProductList