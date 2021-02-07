DROP DATABASE IF EXISTS shopping_club_db;
CREATE DATABASE shopping_club_db;

USE shopping_club_db;

CREATE TABLE users (
    user_id CHAR(13) NOT NULL,
    email VARCHAR(320) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE user_credit_cards (
    user_id CHAR(13) NOT NULL,
    card_number CHAR(12) NOT NULL,
    cardholder_name VARCHAR(100) NOT NULL,
    expiry VARCHAR(5) NOT NULL,
    cvv_number INT NOT NULL,
    PRIMARY KEY (card_number, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_addresses (
    user_id CHAR(13) NOT NULL,
    postal_code INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    user_address VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, postal_code, city),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_transactions (
    transaction_id CHAR(13) NOT NULL,
    user_id CHAR(13) NOT NULL,
    PRIMARY KEY (transaction_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE items (
    item_id VARCHAR(20) NOT NULL,
    expiry date NOT NULL,
    total_required INT NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE transaction_items (
    transaction_id CHAR(13) NOT NULL,
    item_id VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (transaction_id, item_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

INSERT INTO users VALUES ('5fa40d29e57d4', 'jonathan@mail.com', '$2y$10$s9Ct7uZgLolsvyXXef7dw.VtL9PYi3PNM89DME.jwoBV/ZsgSVreu', '91234567', 'Jonathan Tan Jia Wei');
INSERT INTO user_credit_cards VALUES ('5fa40d29e57d4', '432188885581', 'Jonathan Tan', '01/22', '432');
INSERT INTO user_addresses VALUES ('5fa40d29e57d4', '612345', 'Singapore', '13 Mayflower Street #12-02', 'Singapore');