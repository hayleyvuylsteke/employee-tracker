//Requirements for program to run
const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const cTable = require('console.table');
const { connect } = require('http2');
const mysqlPromise = require('mysql2/promise')

//connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'directory_db',
    password: 'Marketer101!',
});


//User prompt messages/functions
function welcomeMessage () {
 console.log('===== Welcome to the Employee database! ======')
  initiate();
}

function initiate () {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What can I help you with today?",
            choices: ["View all employees.", "View all roles.", "View all departments.", "Add a department.", "Add a role.","Add an employee.", "Update an employee role.", "Delete an employee.", "Quit."]
        }
    ])
    .then(option => {
        console.log(option)
        if (option.options === "View all employees.") {
            return viewAllEmployees();
        }
        else if (option.options === "View all roles."){
            return viewAllRoles();
        }
        else if (option.options === "View all departments."){
            return viewAllDepartments();
        }
        else if (option.options === "Add a department.") {
            return addDepartment();
        }
        else if (option.options === "Add a role.") {
            return addRole();
        }
        else if (option.options === "Add an employee.") {
            return addEmployee();
        }
        else if (option.options === "Update an employee role.") {
            return updateEmployee();
        }
        else if (option.options === "Delete an employee.") {
            return deleteEmployee();
        }
        else if (option.options === "Quit.") {
            return quit();
        }
})
}

//works
viewAllEmployees = () => {
    //shows a table that has EMPLOYEE: first names, last names, ROLES: job titles, DEPARTMENTS: departments, ROLES: salaries, and EMPLOYEE: managers that the employee reports to
    let managerName = []
    console.log('Viewing all employees.')
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name, roles.salary, manager.manager_first_name, manager.manager_last_name
    FROM employee 
    INNER JOIN roles on employee.role_id = roles.id
    INNER JOIN departments on roles.department_id = departments.id
    LEFT JOIN manager on employee.manager_id = manager.id
    `, function (err, res) {
        if (err) throw err; 
        console.table(res)
        
        initiate();
    })
}

//working as expected
viewAllDepartments = () => {
    //shows a table that has department name and department ID
    console.log('Viewing all departments.')
    connection.query('SELECT * from departments', function (err, res){
        if (err) throw err;
        console.table(res);
       // initiate();
    })
}

//working as expected
viewAllRoles = () => {
    //shows a table that has ROLES: job title, role id, salary AND the department the role belongs to
    console.log('Viewing all roles')
    connection.query('SELECT roles.title, roles.id, departments.department_name, roles.salary FROM roles INNER JOIN departments ON roles.department_id = departments.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        initiate();
    })
}

//WORKS!!
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the new department you would like to add?'
        }
    ]).then((response) => {
        connection.query(`INSERT INTO departments (department_name) VALUES ("${response.newDepartment}");`, (err, res) => {
            if (err) throw err;
            console.log('The department has been added')
            initiate();
        })
    })
}
//WORKS!!!
addRole = () => {
    const departmentOptions = [];
    let departmentID;
    connection.query('SELECT * from departments', function (err, res) {
        if (err) throw err;
        //console.log(res)

        for (x=0; x < res.length; x++) {
            let departmentName = res[x].department_name;
            departmentOptions.push(departmentName)
        }

       //console.log( departmentOptions)
       inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role you would like to add?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department is this role in?',
            choices: departmentOptions
        },
        {
            type:'input',
            name: 'roleSalary',
            message:'What is the salary for this role?'
        }]).then((response) => {
            //console.log(response)
            //get ID
            connection.query('SELECT * from departments', function (err, res) {
                if (err) throw err;
                //console.log(res)
        
                for (x=0; x < res.length; x++) {
                    if (response.roleDepartment === res[x].department_name){
                        departmentID = res[x].id
                    }
                }
            //insert into database
            //console.log("inside insert into database " + response.newRole, response.roleSalary, departmentID)
            connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.newRole}", ${response.roleSalary}, ${departmentID});`, (err,res) => {
                    if (err) throw err;
                    console.log('The role has been added')
                    initiate();
                })
            })
        })
    })
}

addEmployee = () => {
    //employees need an id, first_name, last_name, role_id and manager id

    //Defining variables we need later
    const roleNames = [];
    const roleOptions = [];

    const managerFirstnameOptions = [];
    const managerLastnameOptions = [];
    const managerNameOptions = [];
    const managerOptions = [];

    //grabbing role data
    connection.query('SELECT * from roles', function (err, res) {
            if (err) throw err;

            for(x=0; x < res.length; x++) {
                let roleTitle = res[x].title;
                let roleID = res[x].id;
                roleNames.push(roleTitle)
                roleOptions.push({roleTitle, roleID})
            }
        console.log(roleOptions)

        //grab manager data
        connection.query('SELECT * FROM manager', function (err, res) {
            if (err) throw err;
            
            for (x=0; x < res.length; x++) {
                let managerFirstName = res[x].manager_first_name 
                let managerLastName = res[x].manager_last_name
                let managerName = res[x].manager_first_name + " " + res[x].manager_last_name
                let managerID = res[x].id

                managerFirstnameOptions.push(managerFirstName)
                managerLastnameOptions.push(managerLastName)
                managerNameOptions.push(managerName)
                managerOptions.push({managerName, managerID})
            }

            console.log(managerOptions)
            promptNewEmployee(roleNames,managerNameOptions, roleOptions, managerOptions)
        })

    })

    //prompt needs to ask for role AND manager and then we have to go find their role_id and manager_ids
const promptNewEmployee = (roleNames, managerNameOptions) => {
    //managerOptions = [...result]

    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'newEmployeeLastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'newEmployeeRole',
            message: 'What role do they have?',
            choices: roleNames
        },
        {
            type:'list',
            name: 'newEmployeeManager',
            message:'Who is their manager?',
            choices: managerNameOptions
        }
    ]).then((response) => {
        getIDS(response)

        //get ID role id
        //console.log ("line 247 roleOptions: " + roleOptions)

        //get manager id
        //console.log("line 250 managerOptions: " + managerOptions)
   
            //Push new employee
            /*const sql = `INSERT INTO employee SET ? (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [employee.first_name, employee.last_name, roleID, managerID]

            connection.query(sql, params, function(err, res) {
                if (err) return err;
                console.log(employee.first_name + " " + employee.last_name + " has been successfully added");
        
            })

        initiate();*/
    }) 
/*const getIDS = (response, roleOptions,managerOptions) => {
            //get ID role id
            console.log ("line 247 roleOptions: " + roleOptions)

            //get manager id
            console.log("line 250 managerOptions: " + managerOptions)
    
}*/
}
console.log("line 265 managerOptions: " + managerOptions)
console.log ("line 266 roleOptions: " + roleOptions)
}



updateEmployee = () => {
//We need to grab a list of all employees, grab a list of all roles, prompt to ask which employee and which role, then grab employee ids and role ids
//and push the update to the employees table

    //Defining variables we need later
    const roleNames = [];
    const roleOptions = [];

    const employeeFirstnameOptions = [];
    const employeeLastnameOptions = [];
    const employeeNameOptions = [];
    const employeeOptions = [];

    //grabbing role data
    connection.query('SELECT * from roles', function (err, res) {
            if (err) throw err;

            for(x=0; x < res.length; x++) {
                let roleTitle = res[x].title;
                let roleID = res[x].id;
                roleNames.push(roleTitle)
                roleOptions.push({roleTitle, roleID})
            }
        console.log(roleOptions)

        //grab employee data
        connection.query('SELECT * FROM employee', function (err, res) {
            if (err) throw err;
            
            for (x=0; x < res.length; x++) {
                let employeeFirstName = res[x].first_name 
                let employeeLastName = res[x].last_name
                let employeeName = res[x].first_name + " " + res[x].last_name
                let employeeID = res[x].id

                employeeFirstnameOptions.push(employeeFirstName)
                employeeLastnameOptions.push(employeeLastName)
                employeeNameOptions.push(employeeName)
                employeeOptions.push({employeeName, employeeID})
            }

            console.log(employeeOptions)
            promptUpdateEmployee(roleNames,employeeNameOptions,)
        })
    })

    //prompt needs to ask for role AND manager and then we have to go find their role_id and manager_ids
    const promptUpdateEmployee = (roleNames, employeeNameOptions) => {
    //managerOptions = [...result]

        inquirer.prompt([
            {
            type: 'list',
            name: 'updateEmployeeName',
            message: 'What is the name of the employee?',
            choices: employeeNameOptions
            },
            {
            type: 'list',
            name: 'updateEmployeeRole',
            message: 'What is their new role?',
            choices: roleNames
            },
        ]).then((employee) => {
        /*//split employee.employee into first name and last name
        const [firstName,lastName] = employee.updateEmployeeName.split(" ")


        //map first name and last name to employeeOptions and when match grab the id
        const {employeeID:eID} = employeeOptions.find(employee => 
            (employee.employeeFirstName === firstName && employee.employeeLastName === lastName)    
        )
        console.log("line 421 employee id: " + eID)

        //run query to update the role 
    
            // Update employees role ID
            const sql = `UPDATE employee SET role_id = roleID WHERE id = employeeID`
            connection.query(sql, function(err, res) {
                if (err) return err;
    
                console.log(employee.employee + " role has been successfully updated");
            })
            
            initiate();
    })
    */
        })
    }
}

quit = () => {
    console.log("Goodbye!")
}

 welcomeMessage();