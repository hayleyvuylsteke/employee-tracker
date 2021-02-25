DROP DATABASE IF EXISTS <DBNAME>;

CREATE DATABASE <DBNAME>;

USE <DBNAME>;

CREATE TABLE department (
    id INT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT PRIMARY KEY,
    manager_id INT,
);