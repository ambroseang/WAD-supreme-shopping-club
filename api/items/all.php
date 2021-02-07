<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../DAO/ItemDAO.php';
$dao = new ItemDAO();

$transaction_item_arr = $dao->getAllItemCounts();
$item_arr = $dao->getAllItemDetails();

$output_json = [];

foreach ($transaction_item_arr as $transaction) {
    $item_id = $transaction['item_id'];
    $quantity = $transaction['quantity'];

    if (array_key_exists($item_id, $output_json)) {
        $output_json[$item_id]['current_orders'] += intval($quantity);
    } else {
        $output_json[$item_id] = [];
        $output_json[$item_id]['current_orders'] = intval($quantity);
    }
}

foreach ($item_arr as $item) {
    $item_id = $item['item_id'];
    $expiry = $item['expiry'];
    $total_required = $item['total_required'];

    $details = [];
    $details['total_required'] = intval($total_required);
    $details['expiry'] = $expiry;
    $output_json[$item_id] += $details;
}

http_response_code(200);
echo json_encode($output_json);
?>