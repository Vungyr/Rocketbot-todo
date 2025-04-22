-- Wait for MySQL to be ready
DO SLEEP(10);

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;
-- Create the user if it doesn't exist
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON todo_db.* TO 'user'@'%';
FLUSH PRIVILEGES;
