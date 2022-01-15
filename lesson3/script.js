const goods = [
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
];

const renderGoodsItem = ({ title, price }, img = "https://via.placeholder.com/150x150") => `<div class="goods-item" data-id="${this.id}">
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
    const goodsBlock = document.querySelector('.goods-list');

    list.forEach(item => {
        goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem(item));
    });
};

renderGoodsList(goods);