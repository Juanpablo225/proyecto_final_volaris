-- Users Module Schema
-- SAE_DB: Users Module basic table information

-- Insert default hashing algorithm
INSERT INTO hashing_algorithms (algorithm_name) 
VALUES 
    ('PBKDF2');

-- Insert the roles in the roles table
INSERT INTO roles (rol_description) 
VALUES 
    ('SuperUser'),
    ('BasicUser');

-- Insert the status in account_status table
INSERT INTO account_status (account_status_description) 
VALUES 
    ('ACTIVE'),
    ('SUSPENDED'),
    ('DELETED');

-- Insert the status in email_validation_status table
INSERT INTO email_validation_status (email_status_description) 
VALUES 
    ('EMAIL_CONFIRMED'),
    ('EMAIL_NON_CONFIRMED');

-- Insert the jobs names in the jobs table
INSERT INTO jobs (job_description) 
VALUES 
    ('Gerente'),
    ('Coordinador'),
    ('Supervisor'),
    ('Subdirectora'),
    ('Mostrador'),
    ('Excolaborador');