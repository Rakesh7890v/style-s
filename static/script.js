let originalShirts = [
    { "image": "../static/images/shirt1.jpg", "name": "Cosmic Jam", "price": 350 },
    { "image": "../static/images/shirt2.jpg", "name": "Neon Vibes", "price": 500 },
    { "image": "../static/images/shirt3.png", "name": "Funky Fever", "price": 450 },
    { "image": "../static/images/shirt4.png", "name": "Groove Pulse", "price": 500 },
    { "image": "../static/images/shirt5.png", "name": "Pixel Drip", "price": 480 },
    { "image": "../static/images/shirt6.png", "name": "Zebra Wave", "price": 500 },
    { "image": "../static/images/shirt7.png", "name": "Retro Bloom", "price": 320 },
    { "image": "../static/images/shirt8.png", "name": "Acid Twist", "price": 330 },
    { "image": "../static/images/shirt9.png", "name": "Disco Hype", "price": 340 },
    { "image": "../static/images/shirt10.png", "name": "Trippy Threads", "price": 360 },
    { "image": "../static/images/shirt11.png", "name": "Lava Crush", "price": 470 },
    { "image": "../static/images/shirt12.png", "name": "Sassy Loop", "price": 470 },
    { "image": "../static/images/shirt13.jpg", "name": "Voodoo Pop", "price": 330 },
    { "image": "../static/images/shirt14.png", "name": "Galaxy Funk", "price": 470 },
    { "image": "../static/images/shirt15.jpg", "name": "Turbo Swag", "price": 350 },
    { "image": "../static/images/shirt16.png", "name": "Electric Splash", "price": 350 },
]  

window.addEventListener('DOMContentLoaded', () => {
    cartAmountInc(totalCost, false);
    filterShirts();
});

const cartContainer = document.querySelector(".cart-container");
const plus = document.querySelector(".fa-plus");
let prevData = JSON.parse(sessionStorage.getItem('cartData')) || [];
const cartCost = document.querySelector('.order-details p').innerText.replace('₹','').trim();
console.log(cartCost);
let totalCost = sessionStorage.getItem('cost') || 0;
updateItems();

function updateItems(){
    cartContainer.innerHTML = `
        <i class="fas fa-times" onclick="cartClose()"></i>
        <div class="order-details">
            <p style="font-family:'Courier New', Courier, monospace">Total Cost: ₹0</p>
            <p onclick="orderNow()" class="order-now">Order Now</p>
        </div>
    `;
    if(prevData.length > 0){
        prevData.forEach((element, index) => {
            cartContainer.innerHTML += `
            <div class="dress-cart" data-index="${index}">
                <div class="dress-img">
                    <img src="${element.image}" alt="" id="image">
                </div>
                <div class="cart-description">
                    <div class="dress-details">
                        <h5 id="name">${element.name}</h5>
                        <p id="price"><span style="font-family: Arial, Helvetica, sans-serif;">₹</span> ${element.price}</p>
                        <div class="quantity-change">
                            <i class="fas fa-plus" onclick=increQuant(event)></i>
                            <i class="fas fa-minus" onclick=decreQuant(event)></i>
                        </div>
                    </div>
                    <div class="quantity-state">
                        <p id="quantity">${element.quant}</p>
                        <i class="fas fa-trash" onclick=deleteItem(event)></i>
                    </div>
                </div>
            </div>
            `
    
        });
    }else{
        cartContainer.innerHTML += `<p style="margin-top:50px; text-align:center; color: rgb(205, 61, 28);" class="cart-empty">Cart is Empty</p>`
    }
    cartUpdate(prevData.length, false);
}

function increQuant(event){
    const btn = event.target;
    const dressCart = btn.closest('.dress-cart');
    const curQuantt = dressCart.querySelector('.quantity-state p')
    const name = dressCart.querySelector('h5').innerText;
    const price = dressCart.querySelector('.dress-details p').innerText.replace('₹','').trim();
    const quantValue = parseInt(curQuantt.innerText);
    curQuantt.innerText = quantValue+1;
    cartAmountInc(parseInt(price), true);

    let cartData = JSON.parse(sessionStorage.getItem('cartData'));
    cartData = cartData.map(data => {
        if(data.name == name){
            return {...data, quant : quantValue + 1};
        }
        return data;
    })
    prevData = cartData;
    sessionStorage.setItem('cartData', JSON.stringify(cartData));
}


function decreQuant(event){
    const btn = event.target;
    const dressCart = btn.closest('.dress-cart');
    const curQuantt = dressCart.querySelector('.quantity-state p')
    const name = dressCart.querySelector('h5').innerText;
    const price = dressCart.querySelector('.dress-details p').innerText.replace('₹','').trim();
    const quantValue = parseInt(curQuantt.innerText);
    if(quantValue > 1){
        curQuantt.innerText = quantValue - 1;
        cartAmountDec(price);
    } 

    let cartData = JSON.parse(sessionStorage.getItem('cartData'));
    cartData = cartData.map(data => {
        if(data.name == name && data.quant > 1){
            return {...data, quant : quantValue - 1};
        }
        return data;
    })
    prevData = cartData;
    sessionStorage.setItem('cartData', JSON.stringify(cartData));
}

function deleteItem(event){
    const btn = event.target;
    const parentDiv = btn.closest('.dress-cart');
    const name = parentDiv.querySelector('h5').innerText;
    const price = parseInt(parentDiv.querySelector('.dress-details p').innerText.replace('₹','').trim());
    const quant = parseInt(parentDiv.querySelector('.quantity-state p').innerText);
    const cartData = JSON.parse(sessionStorage.getItem('cartData')) || [];
    const newData = cartData.filter(item => item.name !== name);
    prevData = newData
    console.log(price * quant);
    sessionStorage.setItem('cartData', JSON.stringify(newData));
    updateItems();
    cartAmountDec(price * quant);
}

function cartShow(){
    console.log("Clicked");
    cartContainer.style.display = 'block';
}
function cartClose(){
    cartContainer.style.display = "none";
}

function cartUpdate(val, isNew){
    const cartCount = document.querySelector('#cart-counter');
    const currentCount = parseInt(cartCount.innerText);
    if(isNew) cartCount.innerText = currentCount + val;
    else cartCount.innerText = val;
    const cartEmpty = document.querySelector('.cart-empty');

    if(val >= 1 && cartEmpty){
        cartEmpty.style.display = 'none';   
    }
    console.log(cartCount.innerText, cartCount);
}

function cartAmountInc(price, isNew){
    const cartamt = document.querySelector('.order-details p');
    let currCost = parseInt(sessionStorage.getItem('cost')) || 0;
    if(isNew) currCost += parseInt(price);

    sessionStorage.setItem('cost', currCost);
    cartamt.innerText = `Total Cost: ₹ ${currCost}`;
}

function cartAmountDec(price){
    const cartamt = document.querySelector('.order-details p');
    let currCost = parseInt(sessionStorage.getItem('cost')) || 0;
    currCost -= parseInt(price);

    sessionStorage.setItem('cost', currCost);
    cartamt.innerText = `Total Cost: ₹ ${currCost}`;
}

function addCart(event){
    const btn = event.target;
    console.log(btn);


    const parentDiv = btn.closest('.dress');
    const image = parentDiv.querySelector('img').src;
    const name = parentDiv.querySelector('h5').innerText;
    const price = parentDiv.querySelector('p').innerText.replace('₹', '').trim();

    let prevData = JSON.parse(sessionStorage.getItem('cartData')) || [];
    const newData = {
        image: image,
        name: name,
        price: price,
        quant: 1
    }

    const isDuplicate = prevData.some(data => data.image === newData.image);

    if(!isDuplicate){
        cartAmountInc(price, true);
        cartContainer.innerHTML += `
        <div class="dress-cart" >
            <div class="dress-img">
                <img src="${image}" alt="" id="image">
            </div>
            <div class="cart-description">
                <div class="dress-details">
                    <h5 id="name">${name}</h5>
                    <p id="price"><span style="font-family: Arial, Helvetica, sans-serif;">₹</span> ${price}</p>
                    <div class="quantity-change">
                        <i class="fas fa-plus" onclick=increQuant(event)></i>
                        <i class="fas fa-minus" onclick=decreQuant(event)></i>
                    </div>
                </div>
                <div class="quantity-state">
                    <p id="quantity">${1}</p>
                    <i class="fas fa-trash" onclick=deleteItem(event)></i>
                </div>
            </div>
        </div>
        `
        cartUpdate(1, true);
        prevData.push(newData);
        sessionStorage.setItem('cartData', JSON.stringify(prevData));
        console.log("Shown");
        notification("The Item is added to the cart", true);
    }else{
        notification("The Item is already added to the cart", false);
    }
}

function notification(msg, pass){
    const not = document.querySelector('.notifications');
    console.log(msg);
    not.style.display = "block";
    not.innerHTML = ""
    not.innerHTML += `<p>${msg}</p>`
    if(pass) not.style.background = "rgb(35, 191, 35)";
    else not.style.background = "rgb(231, 187, 58)"
    setTimeout(() => {
        not.style.display = "none";
    }, 1500);
}

function orderNow(){
    if(prevData.length == 0){
        window.location.href = "mens.html";
    }else{
        window.location.href = "login.html";
    }
}

const priceRange = document.querySelector("#prices");
function displayShirts(filtered){
    const dressCont = document.querySelector('.wears');
    dressCont.innerHTML = "";
    filtered.forEach(dress => {
        dressCont.innerHTML += `
            <div class="dress">
                <div class="dress-img">
                    <img src="${dress.image}">
                </div>
                <div class="dress-details">
                    <h5>${dress.name}</h5>
                    <p><span style="font-family: Arial, Helvetica, sans-serif;">₹</span> ${dress.price}</p>
                </div>
                <button onclick="addCart(event)">Add to Cart</button>
            </div>
        `
    })
}

function filterShirts(){
    const value = priceRange.value;

    const [min, max] = value.split("-").map(Number);
    const filtered = originalShirts.filter(s=> s.price >= min && s.price <= max);
    displayShirts(filtered);

    console.log(filtered);
}

priceRange.addEventListener("change", filterShirts);