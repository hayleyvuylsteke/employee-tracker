const mysql = require ('mysql');
const inquirer = require ('inquirer');

//connect to database



//User prompt messages/functions
welcomeMessage = () => {
 console.log('===== Welcome to the Employee database! ======')
}

initiate = () => {
    
    return inquirer.prompt ([
        {
        type: 'list',
        name: 'options',
        message: 'What can I help you with today?',
        choices: ['View all employees.', 'View all Employees by Department.', 'View all Employees by Manager.', 'Add an employee.', 'Update an employee.', 'Delete an employee.', ]
        }

    ]).then(function(option){
        if(option.choice === "View all employees." || "View all Employees by Department." ||"View all Employees by Manager." ) {
            viewEmployee(option.choice)
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
    })
    
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
