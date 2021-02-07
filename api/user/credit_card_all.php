<?php
// headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

// validation for user id
if (!isset($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a user id.']);
}
$user_id = $_GET['user_id'];

$addressArray = $dao->getAllCreditCards($user_id);

http_response_code(200);
echo json_encode($addressArray);
?>