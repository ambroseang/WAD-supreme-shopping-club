var cookie = JSON.parse(document.cookie)
var user_id = cookie['user_details']['id']
console.log(user_id)

function display_default(){
    var sidebarContainer = document.getElementsByClassName("sidebar");
    var sidebarItems = document.getElementsByClassName("link"); 

    // console.log(sidebarContainer);
    // console.log(sidebarItems);
    
    for(var i=0; i<sidebarItems.length; i++){
        sidebarItems[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }

    retrieve_my_details();
}

//CALL details FROM DB AND DISPLAY details
function retrieve_my_details(){
    // console.log("inside retrieve_my_details function");

    fetch(`../api/user/details.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
            var my_details_name = json['name'];
            var my_details_email = json['email'];
            var my_details_phone = json['phone'];
            
            document.getElementById("my_details_fullname").setAttribute("value", my_details_name);
            document.getElementById("my_details_fullname").setAttribute("placeholder", my_details_name);
            document.getElementById("my_details_email").setAttribute("value", my_details_email);
            document.getElementById("my_details_email").setAttribute("placeholder", my_details_email);
            document.getElementById("my_details_mobile_number").setAttribute("value", my_details_phone);
            document.getElementById("my_details_mobile_number").setAttribute("placeholder", my_details_phone);
            
    })
}

function redirect()
{
    window.location.href="userprofile.html";
}

function new_password_page(){
    document.getElementById("main-content").innerHTML = `
        
            <div class="change-password-header">
                <svg width="30" height="30" viewBox="0 0 20 20" class="bi bi-lock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                </svg>
            <header>CHANGE PASSWORD</header>
            </div>

            <div id="password-content">
            <form>
                <br>
                <div class="form-group">
                <label for="current_password">CURRENT PASSWORD</label> 
                <span class="input-group">
                    <input id="current_password" v-model="current_password" name="current_password" type="password" class="form-control password col-md-5"> 
                    <span class="input-group-append">
                    <span class="input-group-text">
                        <a href="#" class="text-dark" id="icon-click1">
                            <i class="fas fa-eye-slash" id="icon1" v-on:click="change_icon1()"></i>
                        </a>
                    </span>
                    </span>
                </span>

                <br>

                <label for="new_password">NEW PASSWORD</label> 
                <span class="input-group">
                    <input id="new_password" v-model="new_password" name="new_password" type="password" class="form-control password col-md-5"> 
                    <span class="input-group-append">
                    <span class="input-group-text">
                        <a href="#" class="text-dark" id="icon-click2">
                            <i class="fas fa-eye-slash" id="icon2" v-on:click="change_icon2()"></i>
                        </a>
                    </span>
                    </span>
                </span>

                <br>

                <label for="confirm_password">CONFIRM PASSWORD</label> 
                <span class="input-group">
                    <input id="confirm_password" name="confirm_password" type="password" class="form-control password col-md-5" v-model="confirm_password"> 
                    <span class="input-group-append">
                    <span class="input-group-text">
                        <a href="#" class="text-dark" id="icon-click3">
                            <i class="fas fa-eye-slash" id="icon3" v-on:click="change_icon3()"></i>
                        </a>
                    </span>
                    </span>
                </span>
                </div>

                <br>

                <div class="form-group">
                    <button type="submit" class="btn shadow-none" v-bind:disabled="new_password === '' && confirm_password === '' ">SAVE PASSWORD</button>
                </div>
            </form>
        </div>
    `;
    
    function change_icon(){
        // console.log('inside change_icon')
        var input1 = $('#current_password');
        var icon1 = $('#icon1');

        if (input1.attr("type")==="password"){
            input1.attr("type", "text");
            icon1.attr("class", "fas fa-eye");
        }
        else {
            input1.attr("type", "password");
            icon1.attr("class", "fas fa-eye-slash");
        }
    }

    new Vue({
        el: '#password-content',
        data: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        methods:{
            change_icon1: function(){
                // console.log('changeicon1');
                var input1 = $('#current_password');
                var icon1 = $('#icon1');

                if (input1.attr("type")==="password"){
                    input1.attr("type", "text");
                    icon1.attr("class", "fas fa-eye");
                }
                else {
                    input1.attr("type", "password");
                    icon1.attr("class", "fas fa-eye-slash");
                }
            },

            change_icon2: function(){
                // console.log("changeicon2");
                var input2 = $('#new_password');
                var icon2 = $('#icon2');

                if (input2.attr("type")==="password"){
                    input2.attr("type", "text");
                    icon2.attr("class", "fas fa-eye");
                }
                else {
                    input2.attr("type", "password");
                    icon2.attr("class", "fas fa-eye-slash");
                }
            },

            change_icon3: function(){
                // console.log("changeicon3");
                var input3 = $('#confirm_password');
                var icon3 = $('#icon3');

                if (input3.attr("type")==="password"){
                    input3.attr("type", "text");
                    icon3.attr("class", "fas fa-eye");
                }
                else {
                    input3.attr("type", "password");
                    icon3.attr("class", "fas fa-eye-slash");
                }
            }
        }
    })
}

//CALL current password FROM DB AND DISPLAY current password
function retrieve_current_password(){
    console.log("inside retrieve_current_password function");

    fetch(`../api/user/details.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        // console.log(json);
            var user_id = json.user_id;
            var current_password = json.password;
            
            document.getElementById("current_password").setAttribute("value", current_password);
    })
}

function display_address_page(){
    document.getElementById("main-content").innerHTML = `
            <div class="my-address-header">
            <svg width="30" height="30" viewBox="0 0 20 20" class="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/>
                <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            </svg>
            <header>MY ADDRESSES</header>
            <br>
            <button id="add-new-address-button" onclick="display_add_address_div()">ADD NEW ADDRESS</button><br><br>
            </div>

            <div id="no_address_yet">
                
            </div>    
    `;
    display_saved_address();
}

function display_add_address_div(){
    document.getElementById("no_address_yet").innerHTML = `
        <div class="form-group">
        <header>ADD NEW ADDRESS</header>
        <span id="small_text">Please enter an address you would like to save and deliver your items to.</span>
        <br><br>

        <form class="needs-validation" no-validate>
           
            <label>ADDRESS FINDER<span id="star">*</span></label><br>
            <input type="text" class="form-control col-md-6" id="search_input" placeholder="Start typing the first line of your address" required>
            <input type="hidden" id="loc_lat">
            <input type="hidden" id="loc_long">

            <br>
        
            <label>POSTAL CODE<span id="star">*</span></label>
            <input type="text" class="form-control col-md-4" id="postal_code" value="">
        
            <br>
            <label>CITY</label>
            <input type="text" class="form-control col-md-4" id="city" value="Singapore" readonly>
            
            <br>

            <label>COUNTRY</label><br>
            <input type="text" class="form-control col-md-4" id="country" value="Singapore" readonly>
          
            <br><br>
          
            <button class="btn btn-sm shadow-none" type="submit" onclick="post_add_address()">ADD ADDRESS</button>

        </form>
        </div>

    `;

    var searchInput = 'search_input';

            $(document).ready(function () {
                var autocomplete;
                autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: "SG"
                    }
                });
                
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var near_place = autocomplete.getPlace();
                    document.getElementById('loc_lat').value = near_place.geometry.location.lat();
                    document.getElementById('loc_long').value = near_place.geometry.location.lng();

                    call_google_maps_api(near_place.geometry.location.lat(), near_place.geometry.location.lng());
                });
            });

            $(document).on('change', '#'+searchInput, function () {
                document.getElementById('latitude_input').value = '';
                document.getElementById('longitude_input').value = '';
    
            });

            function call_google_maps_api(lat, long) {

            var api_key = "AIzaSyCnWT0uuPRQdwiqKkzVAP8D7Xld69vwGuk";
            var base_url = "https://maps.googleapis.com/maps/api/geocode/json";
            var final_url = base_url + "?key=" + api_key + "&address=" + lat + "," + long;

            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if( request.readyState == 4 && request.status == 200 ) {
                    //console.log(request.responseText);
                    var json_obj = JSON.parse(request.responseText);
                    var postal_code = getPostCode(json_obj);
                    // console.log("[call_google_maps_api] " + postal_code);
                    display_postal_code(postal_code);
                }
            }
            request.open("GET", final_url, true); 
            request.send();
            }

        function display_postal_code(postal_code) {
            // console.log(postal_code);
            document.getElementById("postal_code").setAttribute("value", postal_code);
        }

        function getPostCode(data) {
            // console.log('in getPostCode')
            var addrcomponents = data["results"][0]["address_components"];
            var postcode = addrcomponents.filter(postcodeHelper);
            // console.log(postcode)
            return postcode[0]["long_name"];
        }

        function postcodeHelper(addr) {  
            return addr["types"][0] == "postal_code" ;
        }

        (function() {
            'use strict';
            window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
            });
            }, false);
        })();
}

//POST ADDRESS TO DB 
function post_add_address(){
    
    // console.log("inside post_add_address function");

    var address = document.getElementById("search_input").value;
    var postal_code = document.getElementById("postal_code").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;

    fetch("../api/user/add_address.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
        body:JSON.stringify({
            "user_id" : user_id,
            "postal_code" : postal_code,
            "address" :address,
            "city": city,
            "country": country
        }) 
    })
    
    .then(response => {
        if(response.status == '200'){
            display_saved_address();
        }
    }
    
    );
}

//CALL ADDRESS FROM DB AND DISPLAY ALL ADDRESS
function display_saved_address(){
    // console.log("inside display_saved_address function");

    fetch(`../api/user/address_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        if (json.length === 0){
            document.getElementById("no_address_yet").innerHTML = `
            <br>
                No address yet, add new address!
            <br><br>
            `;
        } else {
            // console.log("inside else function");
            document.getElementById("no_address_yet").innerHTML = "";
            for(each_address of json){
                var user_id = each_address.user_id;
                var address = each_address.user_address;
                var postal_code = each_address.postal_code;
                var city = each_address.city;
                var country = each_address.country;

                document.getElementById("no_address_yet").innerHTML += `
                <div class="row">
                    <div class="column col-8">
                        ${address}
                        <br>
                        ${postal_code}
                        <br>
                        ${city}
                        <br>
                        ${country}
                        <br>
                    </div>
                    <div class="column col-2">
                        <button class="btn btn-sm shadow-none" type="submit" onclick="delete_saved_address('${postal_code}', '${city}', '${user_id}' )"><i class="fa fa-trash"></i> DELETE ADDRESS</button>
                        <br>
                    </div>
                </div>
                <hr>
                `;
            }
        }
    })
}

//DELE ADDRESS FROM DB
function delete_saved_address(postal_code, city, user_id){
    console.log("inside delete_saved_address function");

    fetch("../api/user/delete_address.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
        body:JSON.stringify({
            "user_id" : user_id,
            "postal_code" : postal_code,
            "city": city,
        }) 
    })

    .then(response =>response.json)
    .then(json => {
        display_saved_address();
        console.log((json));
        }  
    )
}

function display_cards_page(){
   
    document.getElementById("main-content").innerHTML = `
            <div class="my-cards-header">
            <svg width="30" height="30" viewBox="0 0 20 20" class="bi bi-credit-card" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
            </svg>
            <header>MY CARDS</header>
            <br><button class="shadow-none" onclick="display_add_card_div()">ADD NEW CARD</button><br><br>
            </div>

            <div id="no_cards_yet">

            </div>
    `;
    display_saved_card();
}

function display_add_card_div(){
    document.getElementById("no_cards_yet").innerHTML = `
        <div id="card_app" class="my-cards-content">
        <header>ADD CARD</header>
        <span id="small_text">Please enter your card details exactly as they are printed.</span>

        <br><br>

        <label>CARD NUMBER<span id="star">*</span></label>
        <span class="input-group">
            <input class="form-control col-md-6" type="text" id="add_card_number" required>
            <span class="input-group-append">
                    <span class="input-group-text">
                        <i class="fas fa-credit-card" id="card_icon"></i>
                    </span>
            </span>
        </span>
        <br>
        <span class="input-group">
            <span>
                <label>EXPIRY DATE (MM/YY)<span id="star">*</span></label>
                <input class="form-control" type="text" id="add_card_expiry_date" required>
            </span>
            <p style="margin-left:30px"></p> 
            <span>
                <label>CVV<span id="star">*</span></label>
                <input class="form-control" type="text" id="add_card_cvv" required>
            </span>
        </span>
        <br>
        <label>NAME ON CARD<span id="star">*</span></label>
        <input class="form-control col-md-6" type="text" id="add_card_name" required>
        
        <br>
        
        <button class="btn shadow-none" type="submit" onclick="post_add_card()">ADD CARD</button><br><br>
    `;
}

//POST card TO DB 
function post_add_card(){
    
    console.log("inside post_add_card function");

    var card_number = document.getElementById("add_card_number").value;
    var cardholder_name = document.getElementById("add_card_name").value;
    var expiry = document.getElementById("add_card_expiry_date").value;
    var cvv_number = document.getElementById("add_card_cvv").value;

    fetch("../api/user/add_credit_card.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
        body:JSON.stringify({
            "user_id" : user_id,
            "card_number" : card_number,
            "cardholder_name" :cardholder_name,
            "expiry": expiry,
            "cvv_number": cvv_number
        }) 
    })
    
    .then(response => {
        if(response.status == '200'){
            display_saved_card();
        }
    }
    
    );
}

//CALL card FROM DB AND DISPLAY ALL cards
function display_saved_card(){
    // console.log("inside display_saved_card function");

    fetch(`../api/user/credit_card_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        if (json.length === 0){
            document.getElementById("no_cards_yet").innerHTML = `
            <br>
                No cards yet, add new card!
            <br><br>
            `;
        } else {
            // console.log("inside else statement of display saved class");
            document.getElementById("no_cards_yet").innerHTML = "";
            for(each_card of json){
                var user_id = each_card['user_id'];
                var card_number = each_card['card_number'];
                var cardholder_name = each_card['cardholder_name'];
                var expiry = each_card['expiry'];
                var cvv_number = each_card['cvv_number'];
                
                document.getElementById("no_cards_yet").innerHTML += `
                <div class="row">
                    <div class="column col-8">
                        ${card_number}
                        <br>
                        ${cardholder_name}
                        <br>
                        ${expiry}
                        <br>
                        ${cvv_number}
                        <br>
                    </div>
                    <div class="column col-2">
                        <br>
                        <button class="btn btn-sm shadow-none" onclick="delete_saved_card('${card_number}','${user_id}')"><i class="fa fa-trash" )"></i> DELETE CARD</button>
                        <br>
                    </div>
                </div>
                <hr>
                `;
            }
        }
    })
}

//DELE card FROM DB
function delete_saved_card(card_number){
    console.log(card_number, user_id);
    console.log("inside delete_credit_card function");

    fetch("../api/user/delete_credit_card.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
        body:JSON.stringify({
            "card_number" : card_number,
            "user_id" : user_id,
        }) 
    })

    .then(() => {
        display_saved_card();
        console.log("deleted card");
        }  
    )
}

function display_orders_page(){
    document.getElementById("main-content").innerHTML = `
        <div class="my-orders-header">
        <svg width="30" height="30" viewBox="0 0 20 20" class="bi bi-bag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
        </svg>
        <header>MY ORDERS</header>
    </div>
    <div id="my-orders-content">
 
        <div class="text-center">
            <img src="https://img.icons8.com/windows/96/000000/hanger.png"/>
            <h5>You currently have no orders</h5>
            Start Shopping at Supreme Shopping Club!
            <br><br>
            <button class="shadow-none" onclick="redirect_to_home_page()">START SHOPPING</button>
            <br><br>
    

    </div>
    `;
}

function redirect_to_home_page(){
    window.location.href="../pages/homepage.html";
}

function display_no_orders(){
    document.getElementById("my-orders-content").innerHTML = `
        <div class="text-center">
            <img src="https://img.icons8.com/windows/96/000000/hanger.png"/>
            <h5>You currently have no orders</h5>
            Start Shopping at Supreme Shopping Club!
            <br><br>
            <button class="shadow-none" onclick="redirect_to_home_page()">START SHOPPING</button>
            <br><br>
        </div>
    `;
}

function display_have_orders(){
    document.getElementById("my-orders-content").innerHTML = `
    <div class="row">
            <div class="column col-4" id="sent-it-display">
                <h1>WE'VE SENT IT! <br></h1>
                <span>Estimated delivery <br> 10 Oct, 2020</span>
            </div>

            <div class="column col-4" id="order-no-display">
                ORDER NO.:
                <br>12822674
            </div>

            <div class="column col-4" id="shipping-date-display">
                SHIPPED DATE
                <br>6 Oct, 2020
            </div>
            
        </div>
        <hr>
        
        <div class="row">
            <div class="column col-3">
                Image
            </div>
            <div class="column col-5">
                Product name<br>
                Size: S<br>
                Quantity: 1
                SGD244.62
            </div>
            <div class="column col-4">
                <br><button class="shadow-none">VIEW ORDER</button><br>
                <br><button class="shadow-none">TRACK ORDER</button><br><br>
            </div>
        </div>
    `;
}

//EDIT MY DETAILS
function edit_my_details(){
    console.log("inside edit_my_details function");

    var new_fullname = document.getElementById("my_details_fullname").value;
    var new_email = document.getElementById("my_details_email").value;
    var new_mobile_number = document.getElementById("my_details_mobile_number").value;
 
     fetch("../api/user/edit.php", {
         method:'POST',
         headers: {
             'Accept': 'application/json',
             'Content-type':'application/json'
             },
         body:JSON.stringify({
             "user_id" : user_id,
             "fullname" : new_fullname,
             "email" :new_email,
             "mobile_number" :new_mobile_number
         }) 
     })
     
    .then(response => response.json())
    .then(json => {
         
     console.log(json);
     })
 }
