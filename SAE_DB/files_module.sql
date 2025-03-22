-- Files Module Schema
-- SAE_DB: Files Module Implementation

-- Create file_status table
CREATE TABLE file_status (
    file_status_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for file status',
    file_status_description VARCHAR(15) NOT NULL COMMENT 'Status description (AVAILABLE, DELETED, UNAVAILABLE, or NONEXISTENT)'
) COMMENT 'Defines possible states for files in the system';

-- Create file_type table
CREATE TABLE file_type (
    file_extension VARCHAR(10) NOT NULL PRIMARY KEY COMMENT 'File extension (pdf, jpg, mp4, etc.)'
) COMMENT 'Stores supported file types/extensions';

-- Create files table
CREATE TABLE files (
    file_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the file',
    file_name CHAR(11) NOT NULL UNIQUE COMMENT 'XYYYYMMDDII: X = G or I: unique identifier', 
    path VARCHAR(150) NOT NULL COMMENT 'File storage path',
    file_extension VARCHAR(10) NOT NULL COMMENT 'Reference to the file extension',
    size INT NOT NULL COMMENT 'File size in kB',
    file_status_id INT NOT NULL COMMENT 'Current status of the file',
    FOREIGN KEY (file_extension) REFERENCES file_type(file_extension),
    FOREIGN KEY (file_status_id) REFERENCES file_status(file_status_id)
) COMMENT 'Main table storing file metadata and attributes';

-- Create file_history table
CREATE TABLE file_history (
    file_history_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for history entry',
    file_id INT NOT NULL COMMENT 'Reference to the file',
    old_file_status_id INT NOT NULL COMMENT 'Previous status of the file',
    last_update_time DATETIME NOT NULL COMMENT 'When the status was changed',
    FOREIGN KEY (file_id) REFERENCES files(file_id),
    FOREIGN KEY (old_file_status_id) REFERENCES file_status(file_status_id)
) COMMENT 'Tracks file status changes over time';

-- Create guias table
CREATE TABLE guias (
    guia_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the guide entry',
    file_id INT NOT NULL COMMENT 'Reference to the associated file',
    fecha DATE NOT NULL COMMENT 'Date of the guide',
    numero VARCHAR(8) NOT NULL COMMENT 'Guide number',
    FOREIGN KEY (file_id) REFERENCES files(file_id)
) COMMENT 'Stores information about guides associated with files';

-- Create identificaciones table
CREATE TABLE identificaciones (
    identificacion_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the identification entry',
    file_id INT NOT NULL COMMENT 'Reference to the associated file',
    nombre_titular VARCHAR(150) NOT NULL UNIQUE COMMENT 'Name of the document holder',
    FOREIGN KEY (file_id) REFERENCES files(file_id)
) COMMENT 'Stores information about identification documents';

-- Indexes
CREATE INDEX idx_guias_fecha ON guias(fecha);
CREATE INDEX idx_guias_numero ON guias(numero);
CREATE INDEX idx_identificaciones_nombre_titular ON identificaciones(nombre_titular);
-- CREATE INDEX idx_files_orders_type_status  ON files(file_type, file_status_id);

-- File status change trigger
DELIMITER //

CREATE TRIGGER tr_file_status_change
AFTER UPDATE ON files
FOR EACH ROW
BEGIN
    -- Only record when file_status_id is changed
    IF OLD.file_status_id <> NEW.file_status_id THEN
        INSERT INTO file_history (
            file_id,
            old_file_status_id,
            last_update_time
        )
        VALUES (
            NEW.file_id,
            OLD.file_status_id,
            NOW()
        );
    END IF;
END//

DELIMITER ;