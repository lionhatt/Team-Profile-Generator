const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//function to prompt the user for information
class PromptUser {
    constructor() {
        this.team = []
    }

    promptManager() {
        console.log("It's time to build an engineering team, please input the details of the manager!")
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the manager?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of the manager?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the email of the manager?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the office number of the manager?"
            }
        ]).then(val => {
            const teamMember = new Manager(val.name, val.id, val.email, val.officeNumber)
            this.team.push(teamMember);
            this.promptAddTeam();
        })
    }

    promptAddTeam() {
        inquirer.prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Do you want to add another teamMember?"
            }
        ]).then(val => {
            if (val.choice) {
                this.promptTeam();
            } else {
                this.quit();
            }
        })
    }

    promptTeam() {
        inquirer.prompt([
            {
                type: "list",
                message: "Please choose to add a team member.",
                name: "member",
                choices: [
                    "Engineer",
                    "Intern"
                ]
            }
        ]).then(val => {
            if (val.member === "Engineer") {
                this.promptEngineer();
            } else if (val.member === "Intern") {
                this.promptIntern();
            }
        })
    }

    promptEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of this engineer?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of this engineer?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the email of this engineer?"
            },
            {
                type: "input",
                name: "github",
                message: "What is the GitHub username of this engineer?"
            }
        ]).then(val => {
            const teamMember = new Engineer(val.name, val.id, val.email, val.github)
            this.team.push(teamMember);
            this.promptAddTeam();
        })
    }

    promptIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of this intern?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of this intern?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the email of this intern?"
            },
            {
                type: "input",
                name: "school",
                message: "What is the name of the school this intern from?"
            }
        ]).then(val => {
            const teamMember = new Intern(val.name, val.id, val.email, val.school)
            this.team.push(teamMember);
            this.promptAddTeam();
        })
    }

    quit() {
        console.log(this.team)
        console.log("You have succesfully generated your employee summary!");
        const renderHtml = render(this.team);
        return fs.writeFileSync(outputPath, renderHtml);
    }

}

function init() {
    const promptUser = new PromptUser()
    promptUser.promptManager();
}

init();

