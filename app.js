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
        choices: ['']
        }

    ])
    
}

