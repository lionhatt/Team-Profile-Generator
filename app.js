const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
        return render(this.team);
    }
    
}

async function init() {
    try {
        const promptUser = new PromptUser()
        const renderHtml = promptUser.promptManager();
        await writeFileAsync(outputPath, renderHtml.replace(/,/g, ""))

    }catch(err){
        console.log(err)
    }

}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
