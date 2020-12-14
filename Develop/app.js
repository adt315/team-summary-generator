const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function promptUser() {
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
    ]).then(function(team) {
        let name = team.name;
        let email = team.email;
        let id = team.id;
        switch (team.role) {
            case "Engineer":
                promptEngineer(name, id, email);
                break;
            case "Intern":
                promptIntern(name, id, email);
                break;   
            case "Manager":
                promptManager(name, id, email);
                break;
        }
    }) 
};

// {
//     type: "list",
//     name: "add",
//     message: "Would you like to add another employee to your team?",
//     choices: ["Yes", "No"]
// },


promptUser()
    .then(function createTemplate(data) {

        fs.writeFile(outputPath, render(team), function (error) {
            if (error) {
                return console.log(error);
            }
            console.log("Your team roster has been created.");
        })
    });


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
