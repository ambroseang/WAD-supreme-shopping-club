if (document.cookie === '') {
    let cookie = {
        "product_id": ""
    }
    document.cookie = JSON.stringify(cookie) + '; path=/'
}

var cookie = JSON.parse(document.cookie)
var cart = cookie.cart


function checkOut(){
    console.log('running checkout');
    window.location.href ='/pages/checkout.html';
}

function nav_call_api(item_p_id, item_name, item_quantity, item_size, item_price){
    //console.log('entering nav_api');
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            var response_json = JSON.parse(this.responseText);
            // console.log(response_json);
            
            //console.log(response_json);
            //console.log(response_json.alternateNames[0].title);

            var cart_items = document.getElementById('cart_items');
            var image = response_json.media.images[0].url; 
            var title = response_json.alternateNames[0].title;
            
            
            cart_items.innerHTML += `
                <div class ='row' style ='background-color: rgb(245, 244, 244); padding:10px 0;'>
                    <div class ='col-4'>
                        
                        <img src="http://${image}" style ='width:100%;' alt="..." >
                    </div>
                    <div class ='col'>
                        <p>${item_name}</p>
                        <p>Size: ${item_size}</p>
                        <p>Quantity: ${item_quantity}</p>
                        <p class='font-weight-bold'>${item_price}</p>
                    </div>
                
                </div>
            `;
         }
    });
    // remove HARD CODE!! to p_id in asos link!
    xhr.open("GET", `https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=${item_p_id}`);
    xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "0592359968mshc6e4654c81accf9p1a722fjsn56d295fe6ca6");
    
    xhr.send(data);
}


function nav_createProduct(){
    document.getElementById('cart_items').innerHTML = '';

    for (item of cart){
        item_p_id = item['product_id'];
        item_name = item['product_name'];
        item_quantity = item['product_quantity'];
        item_size = item['product_size'];
        item_price = item['product_price'];
        nav_call_api(item_p_id, item_name, item_quantity, item_size, item_price);
    }
}

function nav_displayAvatarDropdown() {
    const avatarDropdownElement = document.getElementById('avatarDropdown')

    if (cookie['user_details'] !== undefined) {
        const name = cookie['user_details']['fullname']

        avatarDropdownElement.innerHTML = `
            <div style=' height:80px;' class =' d-flex justify-content-center'>
                <img src="../images/logoBlack.svg" style='height:55px; margin-top:14px;'> 
            </div>
            <hr>
            <p class='text-center' id='card-text'>Welcome ${name}!</p>

            <button type="submit" class="btn nav_btn ml-4" onclick ='nav_redirect_profile()' style='height:40px; padding-top:5px; margin-top:20px;width: 250px;'>My Profile and Details</button>
        `
    } else {
        avatarDropdownElement.innerHTML = `
            <div style=' height:80px;' class =' d-flex justify-content-center'>
                <img src="../images/logoBlack.svg" style='height:55px; margin-top:14px;'> 
            </div>
            <hr>
            <p class='text-center' id='card-text'>Hello, join the club to start shopping!</p>

            <button type="submit" class="btn nav_btn ml-4" onclick ='nav_redirect_login()' style='height:40px; padding-top:5px; margin-top:20px;width: 250px;'>Login/ Sign Up</button>
        `
    }
}

function nav_redirect_profile() {
    window.location.href = '/pages/userprofile.html';
}

function nav_redirect_login() {
    window.location.href = '/pages/login.html';
}

// displayAvatarDropdown()