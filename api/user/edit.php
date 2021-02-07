<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

$user_id = $postBody['user_id'];
$fullname = $postBody['fullname'];
$email = $postBody['email'];

$result = $dao->updateDetails($user_id, $fullname, $email);

if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Details have been updated successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "An error has occurred :("]);
}
?>