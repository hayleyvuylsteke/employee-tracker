//Requirements for program to run
const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const cTable = require('console.table');
const { connect } = require('http2');

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
            choices: ["View all employees.", "View all roles.", "View all departments.", "Add a department.", "Add a role.","Add an employee.", "Update an employee role.", "Delete an employee."]
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

addEmployee = () => {
    //Grab role data from roles table
    let roleOptions = [];
    connection.query('SELECT roles.title,roles.id FROM roles'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            roleOptions.push(res[x].title)
            console.log(roleOptions)
        }

    }

    //Grab manager data from employees table
    let managerOptions = [];
    connection.query('SELECT first_name, last_name, id FROM employee'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            let managerName = res[x].first_name + " " + res[x].last_name
            managerOptions.push(managerName)
        }
    }


    //Prompt for employee info
     inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their name? (Required)',
            validate: first_name => {
              if (first_name) {
                return true;
              } else {
                console.log('Please enter their first name!');
                return false;
              }
            }
          },
          {
              type: 'input',
              name: 'last_name',
              message: 'What is their last name? (Required)',
              validate: last_name => {
                if (last_name) {
                  return true;
                } else {
                  console.log('Please enter their last name!');
                  return false;
                }
              }
          },
          {
              type: 'list',
              name: 'role',
              message: 'What is their role? (Required)',
              choices: roleOptions
          },
          {
              type: 'input',
              name: 'manager',
              message: 'Who is their manager? (Required)',
              choices: managerOptions
          }
        ]).then((employee) => {
            //Set Role ID
            let roleID;
            var x;
            for (x=0; x < roleOptions.length; x++) {
                if (employee.role === roleOptions[x].title) {
                    roleID = roleOptions[x].id
                }
            }

            //Set Manager ID
            let managerID;
            var x;
            for (x=0; x < managerOptions.length; x++) {
                if (employee.manager === managerOptions[x].managerName) {
                    managerID = managerOptions[x].id;
                }
            }

            //Push new employee
            const sql = `INSERT INTO employee SET ? (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [employee.first_name, employee.last_name, roleID, managerID]

            connection.query(sql, params, function(err, res) {
                if (err) return err;

                console.log(employee.first_name + " " + employee.last_name + " has been successfully added");
            
            })
            initiate();
        })

}

updateEmployee = () => {
    //get Employees
    let employeeOptions = []
    let employeeFullName = []
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        //console.table(res)

        for (x=0; x < res.length; x++) {
            let employeeFirstName = res[x].first_name 
            let employeeLastName = res[x].last_name
            let employeeID = res[x].id
            employeeOptions.push({employeeFirstName, employeeLastName, employeeID})
            employeeFullName.push(employeeFirstName + " " + employeeLastName)
        }
       // console.log(employeeOptions)
    })
   // console.log(employeeOptions)

    //Grab role data from roles table
    var roleOptions = [];

    const testFunction = (result) => {
        roleOptions = [...result]

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: 'Which employee would you like to edit?',
                choices: employeeFullName
    
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What is their new role?',
                choices: roleOptions,
            },
        ]).then((employee) => {
            console.log(employee)
            //split employee.employee into first name and last name
            const [firstName,lastName] = employee.employeeName.split(" ")
            console.log(firstName,lastName)

            //map first name and last name to employeeOptions and when match grab the id
            const {employeeID:eID} = employeeOptions.find(employee => 
                (employee.employeeFirstName === firstName && employee.employeeLastName === lastName) 
                    
                
            )
            console.log("line 275" + eID)
                //run query to update the role 

            //grab the employee we need to update's id
            let employeeID;
            for (x=0; x < employeeOptions.length; x++) {
                if (employee.employee === employeeOptions[x].employeeName) {
                    employeeID = employeeOptions[x].id
                }
            }
    
            //Get the updated role ID
            let roleID;
            var x;
            for (x=0, x < roleOptions.length; x++;) {
                if (employee.newRole === roleOptions[x].title) {
                    roleID = roleOptions[x].id
                }
            }
    
            // Update employees role ID
            const sql = `UPDATE employee SET role_id = roleID WHERE id = employeeID`
            connection.query(sql, function(err, res) {
                if (err) return err;
    
                console.log(employee.employee + " role has been successfully updated");
            })
            
            initiate();
        });
    }
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        let options = []
        for (x=0; x < res.length; x++) {
            options.push(res[x].title)
        }
        testFunction(options)
    })
    console.log(roleOptions)


    /*//Prompt for employee info
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to edit?',
            choices: employeeOptions

        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is their new role?',
            choices: roleOptions,
        },
    ]).then((employee) => {

        //grab the employee we need to update's id
        let employeeID;
        var x;
        for (x=0; x < employeeOptions.length; x++) {
            if (employee.employee === employeeOptions[x].employeeName) {
                employeeID = employeeOptions[x].id
            }
        }

        //Get the updated role ID
        let roleID;
        var x;
        for (x=0, x < roleOptions.length; x++;) {
            if (employee.newRole === roleOptions[x].title) {
                roleID = roleOptions[x].id
            }
        }

        // Update employees role ID
        const sql = `UPDATE employee SET role_id = roleID WHERE id = employeeID`
        connection.query(sql, function(err, res) {
            if (err) return err;

            console.log(employee.employee + " role has been successfully updated");
        })
        
        initiate();
    });
};

deleteEmployee = () => {
    //add delete functions

    //get Employees
    let employeeOptions = []
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res)

        for (x=0; x < res.length; x++) {
            let employee = res[x].first_name + " " + res[x].last_name
            employeeOptions.push(employee)
        }

        console.log(employeeOptions)
    })

    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeDelete',
            message: 'Which employee do you want to delete?',
            choices: employeeOptions
        }
    ])*/
};


 welcomeMessage();