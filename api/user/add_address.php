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

    return $msg;
}

$error_arr = GetErrorMessages($postBody);

if (count($error_arr) === 0 ) {
    $userDetails = [];

    $userDetails['postal_code'] = $postBody['postal_code'];
    $userDetails['user_address'] = $postBody['address'];
    $userDetails['city'] = $postBody['city'];
    $userDetails['country'] = $postBody['country'];
    $userDetails['user_id'] = $postBody['user_id'];

    $result = $dao->setNewAddress($userDetails);

    if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "New address has been added successfully"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "An error has occurred :("]);
    }
} else {
    http_response_code(400);
    echo json_encode($error_arr);
}
?>