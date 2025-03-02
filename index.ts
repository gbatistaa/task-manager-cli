import chalk from "chalk";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

type status = "Done" | "In-progress" | "Todo";
class Task {
  public id: number;
  public description: string;
  public status: status;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, description: string, status: status, createdAt: string, updatedAt: string) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

interface User {
  username: string;
  tasks: Task[];
}

// const read = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const args = process.argv.slice(2);
const currDir = process.cwd();
const configDir = `${currDir}/config`;
const tasksFilePath = `${configDir}/tasks.json`;

const init = (): void => {
  const userDefault: User = {
    username: "Gabriel",
    tasks: [],
  };

  if (!existsSync(tasksFilePath)) {
    mkdirSync(configDir);
    const stringJson = JSON.stringify(userDefault, null, 2);
    appendFileSync(tasksFilePath, stringJson);
    console.log(chalk.green("Developer's task manager initialized successfully!"));
  } else {
    console.log(chalk.yellow("Developer's task manager was already initialized!"));
  }
};

const listAll = (tasks: Task[]): void => {
  for (let i = 0; i < tasks.length; i++) {
    const updatedAt = new Date(tasks[i].updatedAt);
    console.log(`----------Task ${tasks[i].id}----------`);
    console.log(`Name: ${tasks[i].description}`);
    console.log(`Status: ${tasks[i].status}`);
    console.log(`Last update: ${updatedAt.toLocaleString()}\n`);
  }
};

const add = (): void => {
  if (!existsSync(tasksFilePath)) {
    console.log(chalk.red('Developer\'s task manager must be initialized to add tasks!\nrun "devtask init"'));
  } else if (args[1]) {
    const tasksFile = JSON.parse(readFileSync(tasksFilePath, "utf8"));
    const tasksList: Task[] = tasksFile.tasks;
    const taskCreationDate = new Date();
    const newTask = new Task(
      tasksList.length + 1,
      args[1],
      "Done",
      taskCreationDate.toString(),
      taskCreationDate.toString(),
    );
    tasksList.push(newTask);
    writeFileSync(tasksFilePath, JSON.stringify(tasksFile, null, 2));
    console.log(args[1]);
  } else {
    console.log(chalk.red("The task must have a description"));
  }
};

function main() {
  const mainCmd = args[0];
  const tasksFile = JSON.parse(readFileSync(tasksFilePath, "utf8"));
  const tasksList: Task[] = tasksFile.tasks;

  switch (mainCmd) {
    case "init":
      init();
      break;

    case "add":
      add();
      break;

    case "list":
      listAll(tasksList);
      break;
  }
}

main();
