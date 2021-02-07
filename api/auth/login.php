<?php
// headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/UserDAO.php';
$dao = new UserDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

$email = $postBody['email'];
$password = $postBody['password'];

$errors = [];
if ($email === '') {
    $errors[] = 'Please provide an email';
}
if ($password === '') {
    $errors[] = 'Please provide a password';
}

if (count($errors) !== 0) {
    http_response_code(400);
    echo json_encode(
        ['error' => $errors]
    );
} else {
    $password_arr = $dao->getPassword($email);
    $user_id = $password_arr['user_id'];
    $stored_password = $password_arr['stored_password'];

    $verified = password_verify($password, $stored_password);
    if ($verified) {
        $details = $dao->getUserDetails($user_id);

        http_response_code(200);
        echo json_encode($details); 
    } else {
        http_response_code(404);
        echo json_encode(
            ['error' => array('The Email and/or Password is incorrect.')]
        );
    }
}
?>