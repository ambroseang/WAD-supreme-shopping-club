<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/ItemDAO.php';
$dao = new ItemDAO();

$item_id = $_GET['item_id'];

$transaction_item_arr = $dao->getAllItemCounts();
$item_arr = $dao->getAllItemDetails();

$output_json = [];

$currentOrders = 0;
foreach ($transaction_item_arr as $transaction) {
    $quantity = $transaction['quantity'];

    if ($transaction['item_id'] === $item_id) {
        $currentOrders += $quantity;
    }
}
$output_json['current_orders'] = intval($currentOrders);

foreach ($item_arr as $item) {
    if ($item['item_id'] === $item_id) {
        $expiry = $item['expiry'];
        $total_required = $item['total_required'];

        $output_json['total_required'] = intval($total_required);
        $output_json['expiry'] = $expiry;
    }
}

http_response_code(200);
echo json_encode($output_json);
?>