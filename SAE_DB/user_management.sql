-- User Management logic for SAE_DB
-- Contains code for handle the user module

DELIMITER //

-- Function to add a new user
-- Returns:
--   1: Success
--   0: Username already exists
--  -1: Invalid role ID
--  -2: Invalid job ID
--  -3: Invalid hashing algorithm
CREATE FUNCTION add_new_user(
    p_username VARCHAR(25),
    p_password_hash VARCHAR(250),
    p_password_salt VARCHAR(50),
    p_email VARCHAR(100),
    p_email_confirmation_token VARCHAR(250),
    p_name VARCHAR(50),
    p_paternal_surname VARCHAR(50),
    p_maternal_surname VARCHAR(50),
    p_job_id INT,
    p_rol_id INT
) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_user_exists INT DEFAULT 0;
    DECLARE v_role_exists INT DEFAULT 0;
    DECLARE v_job_exists INT DEFAULT 0;
    DECLARE v_hashing_algorithm_valid INT DEFAULT 0;
    DECLARE v_hashing_algorithm_id INT DEFAULT 1; -- Default to first algorithm
    DECLARE v_user_account_id INT;
    
    -- Check if username already exists
    SELECT COUNT(*) INTO v_user_exists 
    FROM user_login_data 
    WHERE user_name = p_username;
    
    IF v_user_exists > 0 THEN
        RETURN 0; -- Username already exists
    END IF;
    
    -- Check if role exists
    SELECT COUNT(*) INTO v_role_exists 
    FROM roles 
    WHERE rol_id = p_rol_id;
    
    IF v_role_exists = 0 THEN
        RETURN -1; -- Invalid role ID
    END IF;
    
    -- Check if job exists if provided
    IF p_job_id IS NOT NULL THEN
        SELECT COUNT(*) INTO v_job_exists 
        FROM jobs 
        WHERE job_id = p_job_id;
        
        IF v_job_exists = 0 THEN
            RETURN -2; -- Invalid job ID
        END IF;
    END IF;
    
    -- Check if hashing algorithm exists
    SELECT COUNT(*) INTO v_hashing_algorithm_valid 
    FROM hashing_algorithms 
    WHERE hashing_algorithm_id = v_hashing_algorithm_id;
    
    IF v_hashing_algorithm_valid = 0 THEN
        RETURN -3; -- Invalid hashing algorithm
    END IF;
    
   -- Insert into user_account (no transaction needed)
    INSERT INTO user_account (name, paternal_surname, maternal_surname, job_id)
    VALUES (p_name, p_paternal_surname, p_maternal_surname, p_job_id);
    
    -- Get the new user_account_id
    SET v_user_account_id = LAST_INSERT_ID();
    
    -- Insert into user_login_data
    INSERT INTO user_login_data (
        user_name,
        user_account_id,
        rol_id,
        account_status_id,
        hashing_algorithm_id,
        password_hash,
        password_salt,
        email_address,
        email_confirmation_token,
        registration_time,
        email_validation_status_id
    ) VALUES (
        p_username,
        v_user_account_id,
        p_rol_id,
        1, -- Default status (ACTIVE)
        v_hashing_algorithm_id,
        p_password_hash,
        p_password_salt,
        p_email,
        p_email_confirmation_token,
        NOW(),
        1  -- Default to EMAIL_NON_CONFIRMED
    );
    
    RETURN 1; -- Success
END //

DELIMITER ;

DELIMITER //

/*
 * Function: get_user_salt
 *
 * Description:
 *   This function retrieves the password salt for a specified username from the
 *   user_login_data table. If no user with the provided username exists, it returns
 *   a randomly generated string of the same format and length as a real salt.
 *
 * Parameters:
 *   p_username VARCHAR(25) - The username to look up
 *
 * Returns:
 *   CHAR(50) - Either the actual password salt if the user exists, or a randomly
 *              generated string if the user doesn't exist
 *
*/
CREATE FUNCTION get_user_salt(p_username VARCHAR(25))
RETURNS CHAR(50)
READS SQL DATA
BEGIN
    DECLARE v_salt CHAR(50);
    DECLARE v_user_exists INT DEFAULT 0;
    
    -- Check if the user exists
    SELECT COUNT(*)
    INTO v_user_exists
    FROM user_login_data
    WHERE user_name = p_username;
    
    -- If the user exists, get the salt
    IF v_user_exists > 0 THEN
        SELECT password_salt 
        INTO v_salt
        FROM user_login_data
        WHERE user_name = p_username;
    ELSE
        -- If it does not exist, we generate a random string
        SET v_salt = CONCAT(MD5(RAND()), MD5(NOW()));
    END IF;
    
    RETURN v_salt;
END //

DELIMITER ;


DELIMITER //

-- Function to authenticate a user login
-- Returns:
--     >= 0: login_data_id (Success)
--     < 0: Username does not exist, Password incorrect, Account not active, or Email not confirmed
CREATE FUNCTION user_login(
    p_username VARCHAR(25),
    p_password VARCHAR(250)
) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_login_data_id INT DEFAULT 0;
    DECLARE v_password_hash VARCHAR(250);
    DECLARE v_account_status_id INT;
    DECLARE v_email_validation_status_id INT;
    
    -- Check if username exists and get necessary data
    SELECT 
        login_data_id,
        password_hash,
        account_status_id,
        email_validation_status_id
    INTO 
        v_login_data_id,
        v_password_hash,
        v_account_status_id,
        v_email_validation_status_id
    FROM user_login_data
    WHERE user_name = p_username;
    
    -- Invalid login
    IF (v_login_data_id = 0) OR  
        (v_account_status_id != 1) OR 
        (v_email_validation_status_id != 2) OR 
        (p_password != v_password_hash) THEN
        RETURN -1;
    END IF;
    
    -- Record login in history
    INSERT INTO login_history (login_data_id, log_in_time)
    VALUES (v_login_data_id, NOW());
    
    RETURN v_login_data_id; -- Success, return the login_data_id
END //

DELIMITER ;

DELIMITER //

-- Function to log out a user
-- Returns:
--   1: Success
--   0: No active session found
CREATE FUNCTION user_logout(
    p_login_data_id INT
) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_session_id INT DEFAULT 0;
    DECLARE v_rows_affected INT DEFAULT 0;
    
    -- Find the most recent active session for this user
    SELECT session_id INTO v_session_id
    FROM login_history
    WHERE login_data_id = p_login_data_id
    AND log_out_time IS NULL
    ORDER BY log_in_time DESC
    LIMIT 1;
    
    -- No active session found
    IF v_session_id = 0 THEN
        RETURN 0;
    END IF;
    
    -- Update the session with the logout time
    UPDATE login_history
    SET log_out_time = NOW()
    WHERE session_id = v_session_id;
    
    SET v_rows_affected = ROW_COUNT();
    
    IF v_rows_affected > 0 THEN
        RETURN 1; -- Success
    ELSE
        RETURN 0; -- Failed to update
    END IF;
END //

DELIMITER ;
