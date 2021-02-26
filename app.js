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
}

initiate = () => {
    
    const option = inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What can I help you with today?',
            choices: ['View all employees.', 'View all Employees by Department.', 'View all Employees by Manager.', 'Add an employee.', 'Update an employee.', 'Delete an employee.',]
        }
    ]);
    if (option.choice === "View all employees.") {
        viewAllEmployees();
    }
    else if (option.choice === "View all Employees by Department."){
        viewEmployeesByDepartment();
    }
    else if (option.choice === "View all Employees by Manager."){
        viewEmployeesByManager();
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
    console.log('Viewing all employees.')
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        initiate();
    })
}

viewEmployeesByDepartment = () => {

    initiate();
}

viewEmployeesByManager = () => {

    initiate();
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
            letManagerName = res[x].first_name + " " + res[x].last_name
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
    //add update functions
}

deleteEmployee = () => {
    //add delete functions
}

//Start Express
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  welcomeMessage();