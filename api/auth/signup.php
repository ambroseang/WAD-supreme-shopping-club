<?php
// headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

function GetErrorMessages($postBody, $dao) {
    $msg = [];

    if (!array_key_exists('email', $postBody)) {
        $msg[] = 'Email is required';
    } else {
        $email = $postBody['email'];
        $isValidEmail = $dao->validateEmail($email);
        if (!$isValidEmail) { $msg[] = 'Email is already taken. Please use a different email address.'; }
    }
    if (!array_key_exists('password', $postBody)) {
        $msg[] = 'Password is required';
    }
    if (!array_key_exists('name', $postBody)) {
        $msg[] = 'Name is required';
    }
    if (!array_key_exists('postal_code', $postBody)) {
        $msg[] = 'Postal Code is required';
    }
    if (!array_key_exists('address', $postBody)) {
        $msg[] = 'Address is required';
    }
    if (!array_key_exists('city', $postBody)) {
        $msg[] = 'City is required';
    }
    if (!array_key_exists('country', $postBody)) {
        $msg[] = 'Country is required';
    }
    if (!array_key_exists('phone_number', $postBody)) {
        $msg[] = 'Phone Number is required';
    }

    return $msg;
}

$error_arr = GetErrorMessages($postBody, $dao);

if (count($error_arr) === 0 ) {
    $userDetails = [];

    $userDetails['email'] = $postBody['email'];
    $userDetails['password'] = password_hash($postBody['password'], PASSWORD_DEFAULT);
    $userDetails['fullname'] = $postBody['name'];
    $userDetails['postal_code'] = $postBody['postal_code'];
    $userDetails['user_address'] = $postBody['address'];
    $userDetails['city'] = $postBody['city'];
    $userDetails['country'] = $postBody['country'];
    $userDetails['phone_number'] = $postBody['phone_number'];
    $userDetails['user_id'] = uniqid();

    $result = $dao->signup($userDetails);

    if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Welcome to the club"]);
    } else {
        http_response_code(400);
    }

} else {
    http_response_code(400);
    echo json_encode($error_arr);
}




?>