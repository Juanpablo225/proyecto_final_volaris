CREATE USER 'web_user'@'localhost' IDENTIFIED BY 'securePass';
GRANT SELECT, INSERT, UPDATE, DELETE ON SAE_DB_TEST.* TO 'web_user'@'localhost';
FLUSH PRIVILEGES;
