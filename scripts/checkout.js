var cookie = document.cookie
cookie = JSON.parse(cookie)

// Variables from cooke
var user_id = cookie['user_details']['id']
var cart = cookie['cart']

// Page States


function initialLoad() {
    displayCart()
    displayAddresses()
}

function displayCart() {
    const cartElement = document.getElementById('cartItems')

    let count = 1
    let total = 0
    for (item of cart) {
        const item_id = item['product_id']
        const quantity = item['product_quantity']
        const name = item['product_name']
        const size = item['product_size']
        let price = item['product_price']
        price = parseInt(price.slice(1, price.length), 10)

        const str = `
            <div class='d-flex justify-content-between'>
                <div class='d-flex justify-content-around'>
                    <span class='font-weight-bold'>${count}.</span>
                    <span class='text-dark'>${name} <span class='text-muted'>(${size})</span></span>
                </div>
                <span>x${quantity}</span>
            </div>
        `

        cartElement.innerHTML += str
        count++
        total += price * quantity
    }

    const totalAmountElement = document.getElementById('totalAmount')
    totalAmountElement.innerHTML = 'SGD$ ' + total
}

function displayAddresses() {

    var addressArray
    fetch(`../api/user/address_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        addressArray = json

        const addressBoxArray = document.getElementById('addressBoxes')
        let count = 1
        for(anAddress of addressArray){ 
            const address = anAddress['user_address'];
            const postal_code = anAddress['postal_code'];
            const city = anAddress['city'];
            const country = anAddress['country'];

            const id = 'addressBox' + count
        
            const str = `
                <div class='addressBox' id='${id}' onclick="handleAddressBoxClick('${id}')">
                    <p>${address}</p>
                    <p>${city}, ${postal_code}</p>
                    <b>${country.toUpperCase()}</b>
                </div>
            `
            addressBoxArray.innerHTML += str
            count++
        }

        const detailsBoxElement = document.getElementById('detailsBox')
        const str = `
            <div>
                <p><b>${cookie['user_details']['fullname']}</b></p>
                <p>${cookie['user_details']['email']}</p>
                <p>${cookie['user_details']['phone']}</p>
            </div>
        `
        detailsBoxElement.innerHTML += str
    })

}

function displayCreditCards() {
    var cardArray
    fetch(`../api/user/credit_card_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        cardArray = json

        const creditCardBoxElement = document.getElementById('creditCardBox')
        let count = 1
        for (card of cardArray) {
            var card_number = card['card_number']
            var cardholder_name = card['cardholder_name']
            var expiry = card['expiry']

            const id = 'cardBox' + count
            const str = `
                <div class='addressBox' id='${id}' onclick="handleAddressBoxClick('${id}')">
                    <p><b>${card_number}</b></p>
                    <p>Name: ${cardholder_name}</p>
                    <p>Expiry: ${expiry}</p>
                </div>
            `
            creditCardBoxElement.innerHTML += str
            count++
        }
    })
}


function handleAddressBoxClick(id) {
    const addressBoxes = document.getElementsByClassName('addressBox')
    for (item of addressBoxes) {
        item.style = ''
    }

    const addressBoxElement = document.getElementById(id)
    addressBoxElement.style = 'background-color: #FED143;'
}

function handleFinishStep1() {
    // update tabs
    var actives = document.getElementsByClassName("active");
    actives[0].className = actives[0].className.replace("active", "disabled");

    var disabled = document.getElementsByClassName("disabled");
    disabled[1].className = disabled[1].className.replace("disabled", "active")

    // update page content
    const tabElement = document.getElementById('myTabContent')
    tabElement.innerHTML = `
        <div style='border: 1px lightgrey solid' class='mt-4 p-4' id='creditCardBox'>
            <b>CREDIT CARDS</b>
            <hr>

        </div>

        <div class='d-flex justify-content-end'>
            <button class="button mt-3" onclick="handleFinishStep2()">Place Order</button>
        </div>
    `

    displayCreditCards()
    clearCart()
}

function handleFinishStep2() {
    let formattedCart = []
    cart.forEach(item => {
        formattedCart.push({
            "item_id": item['product_id'],
            "quantity": item['product_quantity']
        })
    })

    // API call
    fetch("../api/items/order.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "user_id": user_id,
            "item_list": formattedCart
        })
    })
    .then((res) => {
        // update tabs
        var actives = document.getElementsByClassName("active");
        actives[0].className = actives[0].className.replace("active", "disabled");

        var disabled = document.getElementsByClassName("disabled");
        disabled[2].className = disabled[2].className.replace("disabled", "active")

        // update page content
        const tabElement = document.getElementById('myTabContent')
        tabElement.innerHTML = `
        <div class='mt-4 text-center'>
            <span class='font-weight-bold text-success'>Your order has been placed successfully</span>
        </div>
        <div class='d-flex justify-content-center'>
            <button class="button mt-3" onclick="handleFinishStep3()">Go Back to Home</button>
        </div>
        `

        displayCreditCards()
    })

}

function handleFinishStep3() {
    const tabElement = document.getElementById('myTabContent')
    tabElement.innerHTML = ``
    window.location.href = '../'
}

function clearCart() {
    var cookie = JSON.parse(document.cookie)
    cookie.cart = []
    document.cookie = JSON.stringify(cookie) + '; path=/'
}