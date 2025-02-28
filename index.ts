import chalk from "chalk";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";

type status = "done" | "doing" | "to do";

class Task {
  public id: number;
  public description: string;
  public status: status;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, description: string, status: status, createdAt: Date, updatedAt: Date) {
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

const add = (): void => {
  if (!existsSync(tasksFilePath)) {
    console.log(chalk.red('Developer\'s task manager must be initialized to add tasks!\nrun "devtask init"'));
  } else if (args[1]) {
    const tasksObj: Task[] = JSON.parse(readFileSync(tasksFilePath, "utf8")).tasks;
  } else {
    // console.log(chalk.red())
  }
};

function main() {
  const mainCmd = args[0];

  switch (mainCmd) {
    case "init":
      init();
      break;

    case "add":
      add();
      break;
  }
}

main();
