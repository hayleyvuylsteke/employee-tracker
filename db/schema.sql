DROP DATABASE IF EXISTS directory_DB;
CREATE DATABASE directory_DB;
USE directory_DB;

CREATE TABLE departments (
    id int NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id);
);

CREATE TABLE employee (
    id int NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id);
    FOREIGN KEY (manager_id) REFERENCES employee(id);
);