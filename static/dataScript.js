import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://menswear-f6f75-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const usersListInDb = ref(database, "order");

const frm = document.querySelector("#form");
const nameEl = document.querySelector("#name");
const cityEl = document.querySelector("#city");
const phoneEl = document.querySelector("#phone");

frm.addEventListener("submit", function(e) {
    e.preventDefault();

    const order = JSON.parse(sessionStorage.getItem('cartData'));

    const newOrder = {
        orderId: Date.now().toString(),
        name: nameEl.value.trim(),
        city: cityEl.value.trim(),
        phone: phoneEl.value.trim(),
        orders: order
    };
    console.log(newOrder);

    push(usersListInDb, newOrder)
        .then(() => {
            alert("Order successfully placed!");
            sessionStorage.clear('cartData');
            frm.reset();
            window.location.href = "mens.html";
        })
        .catch((err) => {
            console.error("Error saving order:", err);
        });
});