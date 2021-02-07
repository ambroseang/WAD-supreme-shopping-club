//submitting a post
    function submitPost(event){
        event.preventDefault()

        let user = document.getElementById('user').value; //username
        let password = document.getElementById('password').value; //password

        fetch("../api/auth/login.php", {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                "email" : user,
                "password" : password
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json["error"]) {
                alert(json["error"] );
            }
            else {
                var fullname = json["name"];
                var phone = json["phone"];
                var user_id = json["user_id"];
                var email = json["email"];

                document.cookie = '; path=/'
                document.cookie = JSON.stringify({
                    "user_details": {
                        "id": user_id,
                        "fullname": fullname,
                        "email": email,
                        "phone": phone
                    },
                    "cart": [],
                    "product_id": ""
                }) + '; path=/'

                window.location.href ='../';
            }
        })
    }

    function usersignup(event){
        event.preventDefault()

        let email_address = document.getElementById('email').value;
        let password = document.getElementById('password1').value;
        let name = document.getElementById('fname').value;
        let postal_code = document.getElementById('pcode').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let country = document.getElementById('country').value;
        let phone_number = document.getElementById('pnumber').value;

        fetch("../api/auth/signup.php", {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                "email" : email_address,
                "password" : password,
                "name" : name,
                "postal_code" : postal_code,
                "address" : address,
                "city" : city,
                "country" : country,
                "phone_number" : phone_number
            })
        })
        .then(response => response.json())
        .then(json => {
            alert('You have signed up! Log in now!');
        });
    }
