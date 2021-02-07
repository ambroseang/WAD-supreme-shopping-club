<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

function GetErrorMessages($postBody) {
    $msg = [];

    if (!array_key_exists('user_id', $postBody)) {
        $msg[] = 'User ID is required';
    }
    if (!array_key_exists('card_number', $postBody)) {
        $msg[] = 'Card Number is required';
    }
    if (!array_key_exists('cardholder_name', $postBody)) {
        $msg[] = 'Cardholder Name is required';
    }
    if (!array_key_exists('expiry', $postBody)) {
        $msg[] = 'Expiry Date is required';
    }
    if (!array_key_exists('cvv_number', $postBody)) {
        $msg[] = 'CVV Number is required';
    }

    return $msg;
}

$error_arr = GetErrorMessages($postBody);

if (count($error_arr) === 0 ) {
    $userDetails = [];

    $userDetails['user_id'] = $postBody['user_id'];
    $userDetails['card_number'] = $postBody['card_number'];
    $userDetails['cardholder_name'] = $postBody['cardholder_name'];
    $userDetails['expiry'] = $postBody['expiry'];
    $userDetails['cvv_number'] = $postBody['cvv_number'];

    $result = $dao->setNewCreditCard($userDetails);

    if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "New credit card has been added successfully"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "An error has occurred :("]);
    }
} else {
    http_response_code(400);
    echo json_encode($error_arr);
}
?>