<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

$user_id = $postBody['user_id'];
$card_number = $postBody['card_number'];

$result = $dao->deleteCreditCard($user_id, $card_number);

if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Credit Card has been deleted successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "An error has occurred :("]);
}
?>