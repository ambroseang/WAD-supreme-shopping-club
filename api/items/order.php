<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/ItemDAO.php';
$dao = new ItemDAO();

$postBody = file_get_contents("php://input");
$postBody = json_decode($postBody, TRUE);

$user_id = $postBody['user_id'];
$transaction_id = uniqid();
$cart_arr = $postBody['item_list'];

// Step 1: Transactions
$transactionSuccess = $dao->setNewTransaction($transaction_id, $user_id);

if ($transactionSuccess) {
    // Step 2: Get all items currently in DB
    $item_arr = $dao->getAllItemDetails();
    $formattedItemArray = [];
    foreach ($item_arr as $item) {
        $item_id = $item['item_id'];
        $formattedItemArray[] = $item_id;
    }

    foreach ($cart_arr as $cart_item) {
        $item_id = $cart_item['item_id'];
        $quantity = $cart_item['quantity'];

        if (!in_array($item_id, $formattedItemArray)) {
            // Step 3: Add each item to DB
            $date = date("Y-m-d");
            $expiry =  date('Y-m-d', strtotime($date. ' + 1 month'));
            $total_required = 10; // hardcoded

            $dao->setNewItem($item_id, $expiry, $total_required);
        }

        // Step 4: Add each cart item to TransactionItem Table
        $dao->setNewTransactionItem($transaction_id, $item_id, $quantity);
    }
} else{
    http_response_code(500);
    echo json_encode(["message" => "Something went wrong"]);
}
?>