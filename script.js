'use strict'
const burgers = [
    { id: 1, title: 'Small Burger', price: 50, calorie: 20 },
    { id: 2, title: 'Big Burger', price: 100, calorie: 40 },

];

const filling = [
    { id: 1, title: 'cheese', price: 10, calorie: 20 },
    { id: 2, title: 'salad', price: 20, calorie: 5 },
    { id: 3, title: 'patato', price: 15, calorie: 10 },
];

const seasoning = [
    { id: 1, title: 'flavoring', price: 15, calorie: 0 },
    { id: 2, title: 'mayonnaise', price: 20, calorie: 5 },
];

/* Создает блок */
const renderGoodsItem = (img = "https://klike.net/uploads/posts/2021-05/1622470433_1.jpg") =>
    `<div class="goods-item">
        <img src="${img}" width = "300" alt="Photo">
        <div class="desc">
            <h1>Ваш Бургер</h1 >
            <div class= "size">
                <h2>Размер булки</h2>
                <input type="radio" id="small" name="size" data-price="50" data-calorie="20"> 
                <lable for="small">Маленькая</lable>     
                <input type="radio" id="big" name="size" data-price="100" data-calorie="40"> 
                <lable for="big">Большая</lable> 
            </div >  
            <div class= "filling">
                <h2>Начинка</h2>
                <input type="checkbox" id="filling_1" data-price="10" data-calorie="20" > 
                <lable for="small">Сыр</lable>     
                <input type="checkbox" id="filling_2" data-price="20" data-calorie="5" > 
                <lable for="big">Салат</lable> 
                <input type="checkbox" id="filling_3" data-price="15" data-calorie="10" > 
                <lable for="big">Картофель</lable>
            </div >
            <div class= "seasoning">
                <h3>Дополнительно</h3>
                <input type="checkbox" id="seasoning_1" data-price="15" data-calorie="0" > 
                <lable for="small">Приправы</lable>     
                <input type="checkbox" id="seasoning_2" data-price="20" data-calorie="5" > 
                <lable for="big">Майонез</lable> 
            </div >           
        </div >
        <div class ="infowrp">
            <h2 class ="info">Выбери булку и начинку</h2>
            <div class ="price">Стоимость  <span class= "infoPrice">0 </span> Руб.</div>
            <div class ="calorie">Калории  <span class= "infoCalore">0 </span></div>
            
           
        </div>
    </div >`;

const renderGoodsList = () => {
    const goodsBlock = document.querySelector('.goods-list');
    goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem());
};
renderGoodsList();


// все инпуты
const allCheckBox = document.querySelectorAll('.desc input');
const info = document.querySelector('.info');


// элемент с прайсом и калориями
const infoCaloreEl = document.querySelector('.infoCalore');
const infoPriceEl = document.querySelector('.infoPrice');

document.addEventListener("DOMContentLoaded", () => {
    allCheckBox.forEach(function (checkbox) {
        checkbox.addEventListener('change', handleChange);
    });
});

function handleChange() {
    const burgerElChecked = document.querySelectorAll('input[type=radio]:checked');
    const fillingElChecked = document.querySelectorAll('div.filling input[type=checkbox]:checked');
    const finishData = {
        price: 0,
        calorie: 0
    }
    if (fillingElChecked.length && burgerElChecked.length) {
        allCheckBox.forEach(item => {
            if (item.checked) {
                finishData.price += Number(item.dataset.price)
                finishData.calorie += Number(item.dataset.calorie)
            }
        });
        info.innerHTML = "";

    } else {
        info.innerHTML = "Выбери булку и начинку";

    }
    infoCaloreEl.innerHTML = finishData.calorie
    infoPriceEl.innerHTML = finishData.price
}


/*  if (burgerElChecked.length) {
     const finishData = {
         price: 0,
         calorie: 0
     }
     allCheckBox.forEach(item => {
         if (item.checked) {
             finishData.price += Number(item.dataset.price)
             finishData.calorie += Number(item.dataset.calorie)
         }
     });
     infoBurger.innerHTML = "";
 } else {
     infoBurger.innerHTML = "Выбери булку";
 } */




/* находит активные чекбоксы  */


// list.forEach(item => {
//     goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem(item));
// });
// };

// renderGoodsItem() {
//     goodsBlock.insertAdjacentHTML('beforeend', renderGoodsItem(item));
// };


