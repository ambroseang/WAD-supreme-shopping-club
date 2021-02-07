<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

$user_id = $postBody['user_id'];
$postal_code = $postBody['postal_code'];
$city = $postBody['city'];

$result = $dao->deleteAddress($user_id, $postal_code, $city);

if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Address has been deleted successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "An error has occurred :("]);
}
?>