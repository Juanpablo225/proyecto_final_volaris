-- Files Module Schema
-- SAE_DB: Files Module basic table information

-- Insert the status in file_status table
INSERT INTO file_status (file_status_description) 
VALUES 
    ('AVAILABLE'),
    ('DELETED'),
    ('UNAVAILABLE'),
    ('NONEXISTENT');

-- Insert the basic extensions in the file_type table
INSERT INTO file_type (file_extension)
VALUES
    ('pdf'),
    ('jpg');