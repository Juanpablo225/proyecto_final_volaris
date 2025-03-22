-- Users Module Schema
-- SAE_DB: Users Module Implementation

-- Create hashing_algorithms table
CREATE TABLE hashing_algorithms (
    hashing_algorithm_id INT AUTO_INCREMENT PRIMARY KEY,
    algorithm_name VARCHAR(10) NOT NULL
) COMMENT 'Stores supported password hashing algorithms like PBKDF2';

-- Create roles table
CREATE TABLE roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_description VARCHAR(15) NOT NULL COMMENT 'Role name (SuperUser, BasicUser)'
) COMMENT 'Contains user role definitions for access control';


-- Create account_status table
CREATE TABLE account_status (
    account_status_id INT AUTO_INCREMENT PRIMARY KEY,
    account_status_description VARCHAR(10) NOT NULL COMMENT 'Status description (ACTIVE, SUSPENDED, or DELETED)'
) COMMENT 'Defines possible states for user accounts';

-- Create email_validation_status table
CREATE TABLE email_validation_status (
    email_validation_status_id INT AUTO_INCREMENT PRIMARY KEY,
    email_status_description VARCHAR(20) NOT NULL COMMENT 'Email verification status (EMAIL_CONFIRMED, or EMAIL_NON_CONFIRMED)'
) COMMENT 'Tracks the email verification status for user accounts';

-- Create jobs table
CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    job_description VARCHAR(20) NOT NULL
) COMMENT 'Contains available job positions in the organization';

-- Create user_account table
CREATE TABLE user_account (
    user_account_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    paternal_surname VARCHAR(50) NOT NULL,
    maternal_surname VARCHAR(50) NOT NULL,
    job_id INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
) COMMENT 'Stores personal information about users';

-- Create user_login_data table
CREATE TABLE user_login_data (
    login_data_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL UNIQUE,
    user_account_id INT NOT NULL,
    rol_id INT NOT NULL,
    account_status_id INT NOT NULL,
    hashing_algorithm_id INT NOT NULL,
    password_hash VARCHAR(250) NOT NULL,
    password_salt CHAR(50) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    email_confirmation_token VARCHAR(250),
    registration_time TIMESTAMP,
    email_validation_status_id INT NOT NULL,
    password_recovery_token VARCHAR(250),
    recovery_token_time TIMESTAMP,
    FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id),
    FOREIGN KEY (account_status_id) REFERENCES account_status(account_status_id),
    FOREIGN KEY (hashing_algorithm_id) REFERENCES hashing_algorithms(hashing_algorithm_id),
    FOREIGN KEY (email_validation_status_id) REFERENCES email_validation_status(email_validation_status_id)
) COMMENT 'Stores authentication and account management data for users';

-- Create login_history table
CREATE TABLE login_history (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    login_data_id INT NOT NULL,
    log_in_time DATETIME NOT NULL COMMENT 'When the user logged in',
    log_out_time DATETIME COMMENT 'When the user logged out (null if still logged in)',
    FOREIGN KEY (login_data_id) REFERENCES user_login_data(login_data_id)
) COMMENT 'Tracks user login and logout activity';

-- Indexes
CREATE INDEX idx_user_login_data_user_name ON user_login_data(user_name);
CREATE INDEX idx_user_login_data_email_address ON user_login_data(email_address);