<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a User Id']);
}


$details = $dao->getUserDetails($user_id);

http_response_code(200);
echo json_encode($details);
?>