--- SEEDS FOR DEPARTMENT TABLE ---

INSERT INTO departments (id, department_name)
VALUES (1, "Business Operations");

INSERT INTO departments (id, department_name)
VALUES (2, "Customer Experience");

INSERT INTO departments (id, department_name)
VALUES (3, "Development");

INSERT INTO departments (id, department_name)
VALUES (4, "Finance");

INSERT INTO departments (id, department_name)
VALUES (5, "Human Resources");

INSERT INTO departments (id, department_name)
VALUES (6, "IT");

INSERT INTO departments (id, department_name)
VALUES (7, "Marketing");

INSERT INTO departments (id, department_name)
VALUES (8, "Sales");

--- SEEDS FOR ROLE TABLE ---
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Director of Business Operations", 100000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (2, "Marketing Operations Manager", 85000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (3, "Sales Operations Manager", 85000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (4, "Business Reporting Analyst", 70000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "Director of Customer Experience", 100000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (6, "Senior Customer Experience Manager", 90000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (7, "Customer Experience Manager", 85000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (8, "Customer Experience Analyst", 70000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (9, "Director of Development", 100000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (10, "Senior Clound Infrastructure Developer", 90000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (11, "Principal Software Developer", 85000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (12, "Software Developer", 70000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (13, "Director of Finance", 90000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (14, "Controller", 85000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (15, "Financial Analyst", 70000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (16, "Director of Human Resources", 100000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (17, "Talent Acquisition Manager", 90000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (18, "Human Resources Business Partner", 85000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (19, "Human Resources Co-ordinator", 60000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (20, "Director of IT", 100000, 6);

INSERT INTO roles (id, title, salary, department_id)
VALUES (21, "IT Business Analyst", 75000, 6);

INSERT INTO roles (id, title, salary, department_id)
VALUES (22, "IT Support Technician", 60000, 6);

INSERT INTO roles (id, title, salary, department_id)
VALUES (23, "Director of Marketing", 100000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (24, "Customer Marketing Manager", 80000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (25, "Demand Generation Manager", 80000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (26, "Event Marketing Manager", 80000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (27, "Digital Marketing Manager", 80000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (28, "Marketing Co-ordinator", 60000, 7);

INSERT INTO roles (id, title, salary, department_id)
VALUES (29, "Director of Sales", 100000, 8);

INSERT INTO roles (id, title, salary, department_id)
VALUES (30, "Inside Sales Manager", 80000, 8);

INSERT INTO roles (id, title, salary, department_id)
VALUES (31, "Business Opportunity Representative", 50000, 8);

--- SEEDS FOR EMPLOYEES TABLE ---
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jennifer", "Lawerie",1,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Michelle", "Donaldson",2,1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Sam", "Sampson",3,1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Ryan", "McCleud",4,1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Jackson", "Andrews",5,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Maliyah", "Jessip",6,5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Hayley", "Vuylsteke",6,5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Olivia", "Barclay",7,6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Chad", "Jones",7,6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Brynn", "Elaine",7,7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Charlie", "Jameson",7,7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Pierson", "Williamson",8,8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Rosie", "Cookiesteen",8,9);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (14, "Kyle", "Hollister",8,10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (15, "Janelle", "Evans",8,11);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (16, "Caily", "Keto",8,11);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (17, "Dawn", "Elliot",8,8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (18, "Natalie", "Nelson",9,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (19, "Kane", "Brown",10,18);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (20, "Luke", "Ryans",11,18);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (21, "Rachel", "Bilson",12,20);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (22, "Jenna", "Thompson",12,20);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (23, "Kinsley", "Holt",12,20);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (24, "Amanda", "Hollinshead",12,20);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (25, "Brock", "Sampson",12,20);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (26, "Hudson", "Hollister",13,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (27, "Mark", "Flarrety",14,26);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (28, "Christine", "Suttle",15,26);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (29, "Carol", "Clovermead",16,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (30, "Jaslyn", "Mcgruff",17,29);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (31, "Brian", "Williams",17,29);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (32, "Matt", "Murray",18,29);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (33, "Mark", "Nicholson",18,29);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (34, "Greggory", "Hester",19,32);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (35, "David", "Sosa",19,33);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (36, "Sarah", "Guerrero",20,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (37, "Susan", "Walton",21,36);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (38, "Denise", "Porter",22,36);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (39, "Bonnie", "Day",22,36);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (40, "Joe", "Blakenship",23,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (41, "Richele", "Huerta",24,40);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (42, "Blaire", "Robbins",25,40);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (43, "Zachary", "Knox",26,40);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (44, "Eileen", "Eaton",27,40);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (45, "Katelyn", "Hayes",28,41);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (46, "Lindsay", "Ali",28,42);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (47, "Janet", "Carpenter",28,43);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (48, "Jordan", "Frey",28,44);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (49, "Jacob", "Mccollough",29,NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (50, "Jack", "Taylor",30,49);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (51, "Edward", "Cain",30,49);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (52, "Kathy", "Gonzales",30,49);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (53, "Kingsley", "Chaney",30,49);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (54, "Roger", "Dunlap",31,50);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (55, "Jon", "Lyons",31,51);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (56, "Jessica", "Hester",31,52);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (57, "Maxine", "Gentry",31,53);





