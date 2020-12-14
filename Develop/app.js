const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { normalize } = require("path");

const team = [];

function promptEmployee() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the employee's job title",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        }
    ]).then(function (employee) {
        let name = employee.name;
        let email = employee.email;
        let id = employee.id;
        switch (employee.role) {
            case "Manager":
                promptManager(name, id, email);
                break;
            case "Engineer":
                promptEngineer(name, id, email);
                break;
            case "Intern":
                promptIntern(name, id, email);
                break;
        }
    })
};

promptEmployee()


function promptEngineer(name, id, email) {
    return inquirer.prompt([
        {
            type: "input",
            name: "gitHub",
            message: "What is the engineer's GitHub address?"
        }
    ]).then(function (employee) {
        let gitHub = employee.gitHub;
        let engineer = new Engineer(name, id, email, gitHub);
        team.push(engineer);
        promptEmployee();
    })
};

function promptIntern(name, id, email) {
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What is the intern's school name?"
        }
    ]).then(function (employee) {
        let school = employee.school;
        let intern = new Intern(name, id, email, school);
        team.push(intern);
        promptEmployee();
    })
};


// {
//     type: "list",
//     name: "add",
//     message: "Would you like to add another employee to your team?",
//     choices: ["Yes", "No"]
// },
// if yes, promptEmployee();
// if no, 
//     .then(function createTemplate(team) {

//     fs.writeFile(outputPath, render(team), function (error) {
//         if (error) {
//             return console.log(error);
//         }
//         console.log("Your team roster has been created.");
//     })
// });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

