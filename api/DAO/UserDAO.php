<?php
require_once '../config/ConnectionManager.php';

class UserDAO {
    public function getPassword($email) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT user_id, user_password
            FROM users
            WHERE email = :email
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();
            $user_id = $row['user_id'];
            $password = $row['user_password'];
        }

        $stmt = null;
        $pdo = null;

        return [
            'user_id' => $user_id,
            'stored_password' => $password
        ];
    }

    public function getUserDetails($user_id) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM users
            WHERE user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();
            $email = $row['email'];
            $name = $row['fullname'];
            $phone = $row['phone_number'];

            return [
                'user_id' => $user_id,
                'email' => $email,
                'name' => $name,
                'phone' => $phone,
            ];
        }
    }

    public function getAllAddress($user_id) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
        SELECT *
        FROM user_addresses
        WHERE user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetchAll();
            return $row;
        }
    }

    public function getAllCreditCards($user_id) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM user_credit_cards
            WHERE user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetchAll();
            return $row;
        }
    }

    public function validateEmail($email) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = '
            SELECT *
            FROM users
            WHERE email = :email
        ';

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();

            if ($row) return FALSE;
            else return TRUE;
        }
    }

    public function signup($userDetails) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql_1 = "INSERT INTO users VALUES (:user_id, :email, :password, :phone_number, :fullname);";

        $stmt_1 = $pdo->prepare($sql_1);
        $stmt_1->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt_1->bindParam(':email', $userDetails['email'], PDO::PARAM_STR);
        $stmt_1->bindParam(':password', $userDetails['password'], PDO::PARAM_STR);
        $stmt_1->bindParam(':phone_number', $userDetails['phone_number'], PDO::PARAM_STR);
        $stmt_1->bindParam(':fullname', $userDetails['fullname'], PDO::PARAM_STR);

        $sql_2 = "INSERT INTO user_addresses VALUES (:user_id, :postal_code, :city, :user_address, :country);";
        $stmt_2 = $pdo->prepare($sql_2);
        $stmt_2->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt_2->bindParam(':postal_code', $userDetails['postal_code'], PDO::PARAM_STR);
        $stmt_2->bindParam(':city', $userDetails['city'], PDO::PARAM_STR);
        $stmt_2->bindParam(':user_address', $userDetails['user_address'], PDO::PARAM_STR);
        $stmt_2->bindParam(':country', $userDetails['country'], PDO::PARAM_STR);

        if ($stmt_1->execute() && $stmt_2->execute()) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function setNewAddress($userDetails) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "INSERT INTO user_addresses VALUES (:user_id, :postal_code, :city, :user_address, :country);";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt->bindParam(':postal_code', $userDetails['postal_code'], PDO::PARAM_STR);
        $stmt->bindParam(':city', $userDetails['city'], PDO::PARAM_STR);
        $stmt->bindParam(':user_address', $userDetails['user_address'], PDO::PARAM_STR);
        $stmt->bindParam(':country', $userDetails['country'], PDO::PARAM_STR);

        if ($stmt->execute()) {
            return TRUE;
        }
    }

    public function setNewCreditCard($userDetails) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "INSERT INTO user_credit_cards VALUES (:user_id, :card_number, :cardholder_name, :expiry, :cvv_number);";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt->bindParam(':card_number', $userDetails['card_number'], PDO::PARAM_STR);
        $stmt->bindParam(':cardholder_name', $userDetails['cardholder_name'], PDO::PARAM_STR);
        $stmt->bindParam(':expiry', $userDetails['expiry'], PDO::PARAM_STR);
        $stmt->bindParam(':cvv_number', $userDetails['cvv_number'], PDO::PARAM_STR);

        if ($stmt->execute()) {
            return TRUE;
        }
    }

    public function updateDetails($user_id, $fullname, $email) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            UPDATE users
            SET fullname = :fullname, email = :email
            WHERE user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':fullname', $fullname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return TRUE;
        }
    }

    public function deleteAddress($user_id, $postal_code, $city) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            DELETE FROM user_addresses
            WHERE user_id = :user_id AND postal_code = :postal_code AND city = :city
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
        $stmt->bindParam(':postal_code', $postal_code, PDO::PARAM_STR);
        $stmt->bindParam(':city', $city, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return TRUE;
        }
    }

    public function deleteCreditCard($user_id, $card_number) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            DELETE FROM user_credit_cards
            WHERE user_id = :user_id AND card_number = :card_number
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
        $stmt->bindParam(':card_number', $card_number, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return TRUE;
        }
    }
}
?>