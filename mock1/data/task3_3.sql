-- TODO Task 3
-- Drop database if it exists
DROP DATABASE IF EXISTS mock1;

-- Create the database
CREATE DATABASE mock1;

-- Select the database
USE mock1;

-- Create the attendees table
SELECT "ORDER TABLE";
CREATE TABLE orders (
    
    -- acc_id VARCHAR(10),
    -- vacancy INT,
    -- constraint pk_acc_id primary key(acc_id),
    -- CONSTRAINT chk_vacancy CHECK (vacancy >= 0)
--     private final String orderId;
--   private Date date = new Date();
--   private String name;
--   private String address;
--   private boolean priority;
--   private String comments;
--   private Cart cart = new Cart();

    order_id char(26),
    orderDate date,
    name varchar(64),
    address varchar(256),
    priority boolean,
    comments text,
    constraint pk_order_id primary key(order_id)


);
SELECT "CART TABLE";
CREATE TABLE cart (

    -- private String productId;
    -- private String name;
    -- private int quantity;
    -- private float price;
        
    -- product_id char(8),
    -- name varchar(128),
    -- email varchar(128),
    -- acc_id VARCHAR(10),
    -- arrival_date date,
    -- duration int,
    -- constraint pk_resv_id primary key(resv_id),
    -- constraint fk_acc_id foreign key(acc_id) references acc_occupancy(acc_id)

    product_id char(24),
    name varchar(256),
    quantity int,
    price float,
    order_id char(26),
    
    constraint pk_product_id primary key(product_id),
    constraint fk_order_id foreign key(order_id) references orders(order_id)


);

-- Grant fred access to the database
GRANT ALL PRIVILEGES ON mock1.* TO 'fred'@'%';

-- Apply changes to privileges
FLUSH PRIVILEGES;