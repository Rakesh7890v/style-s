import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://menswear-f6f75-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const usersListInDb = ref(database, "order");
const ClothesCont = document.querySelector(".clothes-container")


document.addEventListener("click", function(e) {
    if (e.target.classList.contains('delivered-btn')) {
        const id = e.target.getAttribute('data-id');
        console.log("Called: ", id);
        let data = ref(database, `order/${id}`);
        remove(data).then(() => {
            showPopup();
        });
    }
});

function showPopup() {
    const popup = document.getElementById('popup-message');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}


onValue(usersListInDb, function(snapshot){
    if(snapshot.exists()){
        let userArray = Object.entries(snapshot.val());
        console.log(userArray);
        ClothesCont.innerHTML = "";

        for(let i=0;i<userArray.length;i++){
            let currentUser = userArray[i];
            let userData = currentUser[1];
            let city = userData.city;
            let name = userData.name;
            let phone = userData.phone;
            let currentId = currentUser[0];
            let orders = userData.orders;


            ClothesCont.innerHTML += `
                <div class="clothes">
                    <table class="user">
                        <tr>
                            <th>Order ID</th>
                            <td class="order-id">${currentId}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td>${city}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${phone}</td>
                        </tr>
                    </table>
                    <div class="orders">
                        <h1>Orders</h1>
                        <button class="delivered-btn" data-id="${currentId}">Delivered</button>
                        <div class="order-list" id="order-list-${currentId}">
                        </div>
                    </div>
                </div>    
                <hr style="width=100%;" />
                `
                let orderListEl = document.querySelector(`#order-list-${currentId}`);
                for(let i=0;i<orders.length;i++){
                    let currentOrder = orders[i];
                    orderListEl.innerHTML += `
                        <div class="order-details">
                            <div class="left">
                                <img src="${currentOrder.image}" alt="">
                            </div>
                            <div class="right">
                                <p><strong>Name: </strong>${currentOrder.name}</p>
                                <p><strong>Quantity: </strong>${currentOrder.quant}</p>
                                <p><strong>Price: </strong>${currentOrder.price}</p>
                            </div>
                        </div>
                    ` 
                }
        }
    }else {
        ClothesCont.innerHTML = `
            <p style="text-align:center; color: tomato; margin-top: 50px">There is no Order</p>
        `
    }
})