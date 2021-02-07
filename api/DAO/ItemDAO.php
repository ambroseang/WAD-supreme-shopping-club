<?php
require_once '../config/ConnectionManager.php';

class ItemDAO {

    public function getAllItemCounts() {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM transaction_items
        ";

        $stmt = $pdo->prepare($sql);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $stmt->fetchAll();

            return $rows;
        }
    }

    public function getAllItemDetails() {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM items
        ";

        $stmt = $pdo->prepare($sql);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $stmt->fetchAll();

            return $rows;
        }
    }
    
    public function setNewTransaction($transaction_id, $user_id) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "INSERT INTO user_transactions VALUES (:transaction_id, :user_id);";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':transaction_id', $transaction_id, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()){
            return TRUE;
        }
    }

    public function setNewItem($item_id, $expiry, $total_required) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "INSERT INTO items VALUES (:item_id, :expiry, :total_required);";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':item_id', $item_id, PDO::PARAM_STR);
        $stmt->bindParam(':expiry', $expiry, PDO::PARAM_STR);
        $stmt->bindParam(':total_required', $total_required, PDO::PARAM_INT);

        if ($stmt->execute()){
            return TRUE;
        }
    }

    public function setNewTransactionItem($transaction_id, $item_id, $quantity) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "INSERT INTO transaction_items VALUES (:transaction_id, :item_id, :quantity);";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':transaction_id', $transaction_id, PDO::PARAM_STR);
        $stmt->bindParam(':item_id', $item_id, PDO::PARAM_STR);
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);

        if ($stmt->execute()){
            return TRUE;
        }
    }
}
?>