//Requirements for program to run
const express = require('express');
const app = express();
const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const cTable = require('console.table');

//Declaring Port information
const PORT = process.env.PORT || 3006;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'directory.db'
})

//Test Route
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });
  

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });


//User prompt messages/functions
welcomeMessage = () => {
 console.log('===== Welcome to the Employee database! ======')
}

initiate = async () => {
    
    const option = await inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What can I help you with today?',
            choices: ['View all employees.', 'View all Employees by Department.', 'View all Employees by Manager.', 'Add an employee.', 'Update an employee.', 'Delete an employee.',]
        }
    ]);
    if (option.choice === "View all employees." || "View all Employees by Department." || "View all Employees by Manager.") {
        viewEmployee(option.choice);
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

viewEmployee = (option) => {
    //add view functions
}

addEmployee = () => {
    //add view functions
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
  