//install dependencies
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

//connect to database
let db;

try {
  const db = mysql2
    .createConnection({
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise();

  //start connection

  db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    start();
  });
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

//function to view departments
async function viewDepartments() {
  const databases = `SELECT departments.id, departments.name AS Department FROM department;`;
  try {
    const [results] = await db.query(databases);
    console.table(results);
    Question();
  } catch (err) {
    console.error(err);
  }
}

//funtion to view roles
async function viewRoles() {
  const databases = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
  try {
    const [results] = await db.query(databases);
    console.table(results);
    Question();
  } catch (err) {
    console.error(err);
  }
}

//function to view employees
function viewEmployees() {
  const databases = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`;
  db.query(databases, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    Question();
  });
}

//function to do something else
function Question() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "nextAction",
        message: "Would you like to make other changes?",
        choices: ["Yes", "No"],
      },
    ])
    .then((answer) => {
      if (answer.nextAction === "Yes") {
        mainMenu();
      } else {
        process.exit();
      }
    });
}

//function to add departmnet
async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Department name:",
    },
  ]);

  const query = "INSERT INTO departments (name) VALUES (?)";
  await db.query(query, [name]);
  console.log(`Added ${name} to the departments.`);
}

//function to add employee

async function addEmployee() {
  const { firstName, lastName, roleId } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee Last Name:",
    },
    {
      type: "input",
      name: "roleId",
      message: "Role ID of employer:",
    },
  ]);

  const query =
    "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)";
  await db.query(query, [firstName, lastName, roleId]);
  console.log(
    `Added employee with first name ${firstName}, last name ${lastName}.`
  );
}

//function to add role

async function addRole() {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Role salary:",
    },
    {
      type: "input",
      name: "departmentId",
      message: "Role Department ID:",
    },
  ]);

  const query =
    "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
  await db.query(query, [title, salary, departmentId]);
  console.log(`Added role with title ${title} and salary ${salary}.`);
}

//function to add a manager

async function addManager() {
  console.log("Adding a manager...");
}

//function updating employee roles
async function updateEmployeeRole() {
  const { currentRoleId, newRoleId } = await inquirer.prompt([
    {
      type: "input",
      name: "currentRoleId",
      message: "Employee Role ID:",
    },
    {
      type: "input",
      name: "newRoleId",
      message: "New Role ID:",
    },
  ]);

  const query = "UPDATE employees SET role_id =? WHERE role_id =?";
  await db.query(query, [newRoleId, currentRoleId]);
  console.log(`employee role updated from ${currentRoleId} to ${newRoleId}.`);
}

//prompts
async function mainMenu() {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Actions",
        choices: [
          "View departments",
          "View roles",
          "View employees",
          "Add department",
          "Add role",
          "Add an employee",
          "Update employee role",
          "Add manager",
        ],
      },
    ]);

    switch (answer.action) {
      case "View departments":
        viewDepartments();
        break;
      case "View roles":
        viewRoles();
        break;
      case "View employees":
        viewEmployees();
        break;
      case "Add department":
        addDepartment();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Add role":
        addRole();
        break;
      case "Add manager":
        addManager();
        break;
      case "Update employee role":
        updateEmployeeRole();
        break;

      // Implement other cases similarly
      case "Exit":
        process.exit();
    }
  } catch (error) {
    console.error(error);
    mainMenu(); // Retry after catching an error
  }
}

// function to view all departments
function viewAllDepartments() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart the application
    mainMenu();
  });
}

// function to view all roles
function viewAllRoles() {
  const query =
    "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart the application
    start();
  });
}

// function to view all employees
function viewAllEmployees() {
  const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart the application
    start();
  });
}

mainMenu();
