const urlParameters = new URLSearchParams(window.location.search);
const selectedBeverage = urlParameters.get('beverage');

const selectedBeverageButton = document.getElementById('selectedBeverageHeading');
selectedBeverageButton.textContent = selectedBeverage;

selectedBeverageButton.addEventListener('click', function() {
    selectedBeverageButton.textContent = '';
    window.location.href = "startorder.html";
});

selectedBeverageButton

function updateCondiment(condimentName) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = condimentName;
    button.classList.add("condiment-button");
    li.appendChild(button);
    condimentsList.appendChild(li);
}

function removeCondiment(event) {
    if (event.target.tagName === "BUTTON") {
        event.target.remove();
    }
}

function placeOrder() {
    const condiments =  Array.from(condimentsList.children)
                        .map(li => li.textContent.trim())
                        .filter(condiment => condiment !== '');
    const orderDetails = {
        selectedBeverage,
        condiments
    };
    const orderDetailsString = encodeURIComponent(JSON.stringify(orderDetails));
    console.log('Redirecting to:', `orderplaced.html?order=${encodeURIComponent(orderDetailsString)}`)
    window.location.href = `orderplaced.html?order=${encodeURIComponent(orderDetailsString)}`;
}
