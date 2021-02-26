//Requirements for program to run
const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const cTable = require('console.table');
const { connect } = require('http2');

//connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'directory.db',
    port: 3008,
    password: 'Marketer101!'
})
  

//User prompt messages/functions
welcomeMessage = () => {
 console.log('===== Welcome to the Employee database! ======')
 initiate();
}

initiate = () => {
    
    const option = inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What can I help you with today?',
            choices: ['View all employees.', 'View all roles.', 'View all departments.', 'Add an employee.', 'Update an employee role.', 'Delete an employee.',]
        }
    ]);
    if (option.choice === "View all employees.") {
        viewAllEmployees();
    }
    else if (option.choice === "View all roles."){
        viewAllRoles();
    }
    else if (option.choice === "View all departments."){
        viewAllDepartments();
    }
    else if (option.choice === "Add an employee.") {
        addEmployee();
    }
    else if (option.choice === "Update an employee.") {
        updateEmployee();
    }
    else if (option.choice === "Delete an employee.") {
        deleteEmployee();
    }
    
}

viewAllEmployees = () => {
    //shows a table that has first names, last names, job titles, departments, salaries, and managers that the employee reports to
    console.log('Viewing all employees.')
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title, departments.department_name, roles.salary, employee.manager_id FROM employee INNER JOIN roles on employee.role_id = roles.id INNER JOIN departments on roles.department_id = departments.id', function (err, res) {
        if (err) throw err;

        //grabbing Manager firstName
        let managerFirstName;
        let managerLastName;
        let managerID = employee.manager_id

        for (x=0; x > employee.id; x++) {
            if (managerID = employee[x].id) {
                managerFirstName = employee[x].first_name
                managerLastName = employee[x].last_name
            }
        }
        console.table(res.employee.first_name, res.employee.last_name, res.roles.title, res.departments.department_name, res.roles.salary, managerFirstName, managerLastName);
        connection.end();
        initiate();
    })
}

viewAllDepartments = () => {
    //shows a table that has department name and department ID
    console.log('Viewing all departments.')
    connection.query('SELECT * from departments', function (err, res){
        if (err) throw err;
        console.table(res);
        connection.end();
        initiate();
    })
}

viewAllRoles = () => {
    //shows a table that has job title, role id, the department the role belongs to and the salary for that role
    console.log('Viewing all roles')
    connection.query('SELECT title, id, department_name, salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        initiate();
    })
}

addEmployee = () => {
    //Grab role data from roles table
    let roleOptions = [];
    connection.query('SELECT title,id FROM roles'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            roleOptions.push(res[x].title)
            connection.end();
        }
    }

    //Grab manager data from employees table
    let managerOptions = [];
    connection.query('SELECT first_name, last_name, id FROM employee'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            let managerName = res[x].first_name + " " + res[x].last_name
            managerOptions.push(managerName)
            connection.end();
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
            let roleID,
            for (x=0; x < roleOptions.length; x++) {
                if (employee.role === roleOptions[x].title) {
                    roleID = roleOptions[x].id
                }
            }

            //Set Manager ID
            let managerID,
            for (x=0; x < managerOptions.length; x++) {
                of (employee.manager === managerOptions[x].managerName) {
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
    //Grab employee data from employees table
    let employeeOptions = [];
    connection.query('SELECT first_name, last_name, id FROM employees'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            let employeeName = res[x].first_name + " " + res[x].last_name
            employeeOptions.push(employeeName)
            connection.end();
        }
    }

    //Grab role data from roles table
    let roleOptions = [];
    connection.query('SELECT title, id FROM roles'), function (err, res) {
        if (err) throw err;
        for (x=0; x < res.length; x++) {
            roleOptions.push(res[x].title)
            connection.end();
        }
    }

    //Prompt for employee info
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to edit?',
            choices: employeeOptions,

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
        for (x=0; x < employeeOptions.length; x++) {
            if (employee.employee === employeeOptions[x].employeeName) {
                employeeID = employeeOptions[x].id
            }
        }

        //Get the updated role ID
        let roleID;
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
}
  
  welcomeMessage();