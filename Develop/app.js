const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

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
    ]).then(function(employee) {
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

function promptManager(name, id, email) {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ]).then(function (employee) {
        let officeNumber = employee.officeNumber;
        let manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);
        promptAdd();
    })
};

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
        employees.push(engineer);
        promptAdd();
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
        employees.push(intern);
        promptAdd();
    })
};

function promptAdd() {
    return inquirer.prompt([
        {
            type: "list",
            name: "more",
            message: "Would you like to add another employee to your team?",
            choices: ["Yes", "No"]
        }
    ]).then(function (add) {
        switch (add.more) {
            case "Yes":
                promptEmployee();
                break;
            case "No":
                createTemplate();
                break;
        }
    })
};

function createTemplate() {
    fs.writeFile(outputPath, render(employees), function(error) {
        if (error) {
            return console.log(error);
        }
        console.log("Your team roster has been created.");
    })
};



