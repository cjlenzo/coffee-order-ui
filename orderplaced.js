let host = getHost();

let orderDetailsString = getParameterByName('order');
let orderDetails = orderDetailsString ? JSON.parse(decodeURIComponent(orderDetailsString)): null;
let selectedBeverage = orderDetails ? orderDetails.selectedBeverage: null;
let selectedCondiments = orderDetails ? orderDetails.condiments: null;

let orderDetailsContainer = document.getElementById('orderDetails');

function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function updateOrderDetails() {
    let order = {beverage: selectedBeverage, condiments: selectedCondiments}
    request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${configuration.token()}`
        },
        body: JSON.stringify(order)
    };
    let response = await fetch(host + "/orders", request);
    returned_order_details = await response.json();
    message = "";
    if (response.ok) {
        message = "Order has been placed!"
        orderDetailsContainer.innerHTML = `<h1> Your Order Has Been Placed! </h1>
                                           <h2> Your Order ID: ${returned_order_details.id} </h2>
                                           <h2> Selected Beverage and Condiments: ${returned_order_details.description} </h2>
                                           <h2> Total: ${returned_order_details.cost} </h2>`;
    }
    else {
        message = "Order Failed"
    }
    alert(message)
}

document.addEventListener("DOMContentLoaded", updateOrderDetails)
