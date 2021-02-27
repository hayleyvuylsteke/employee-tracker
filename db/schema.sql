DROP DATABASE IF EXISTS directory_DB;
CREATE DATABASE directory_DB;
USE directory_DB;

CREATE TABLE departments (
id INT NOT NULL,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id int NOT NULL,
title VARCHAR(100) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employee (
id int NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE manager (
id int NOT NULL,
manager_first_name VARCHAR(30) NOT NULL,
manager_last_name VARCHAR(30) NOT NULL,
employee_id int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (employee_id) REFERENCES employee(id)
);
