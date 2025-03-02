import chalk from "chalk";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

type status = "Done ✅" | "In-progress ⌛" | "Todo 🚨";
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
    const createdAt = new Date(tasks[i].createdAt);
    const updatedAt = new Date(tasks[i].updatedAt);
    console.log(chalk.cyan(`----------Task ${tasks[i].id}----------`));
    console.log(`Name: ${chalk.green(tasks[i].description)}`);
    console.log(`Status: ${tasks[i].status}`);
    console.log(`Created at: ${createdAt.toLocaleString()}`);
    console.log(`Last update: ${updatedAt.toLocaleString()}\n`);
  }
};

const listFiltered = (tasks: Task[], status: status): void => {
  const tasksFiltered = tasks.filter((task: Task) => {
    return task.status === status;
  });
  for (let i = 0; i < tasksFiltered.length; i++) {
    const createdAt = new Date(tasksFiltered[i].createdAt);
    const updatedAt = new Date(tasksFiltered[i].updatedAt);
    console.log(chalk.cyan(`----------Task ${tasksFiltered[i].id}----------`));
    console.log(`Name: ${chalk.green(tasksFiltered[i].description)}`);
    console.log(`Status: ${tasksFiltered[i].status}`);
    console.log(`Created at: ${createdAt.toLocaleString()}`);
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
      "Todo 🚨",
      taskCreationDate.toString(),
      taskCreationDate.toString(),
    );
    tasksList.push(newTask);
    writeFileSync(tasksFilePath, JSON.stringify(tasksFile, null, 2));
  } else {
    console.log(chalk.red("The task must have a description"));
  }
};

const update = (taskId: number, newDescription: string): void => {
  const newUpdateDate = new Date();
  const tasksFile = JSON.parse(readFileSync(tasksFilePath, "utf8"));
  const tasksList: Task[] = tasksFile.tasks;
  tasksList[taskId - 1].description = newDescription;
  tasksList[taskId - 1].updatedAt = newUpdateDate.toString();
  writeFileSync(tasksFilePath, JSON.stringify(tasksFile, null, 2));
};

const mark = (taskId: number, newStatus: status): void => {
  const newUpdateDate = new Date();
  const tasksFile = JSON.parse(readFileSync(tasksFilePath, "utf8"));
  const targetTask: Task = tasksFile.tasks[taskId - 1];
  targetTask.status = newStatus;
  targetTask.updatedAt = newUpdateDate.toString();
  writeFileSync(tasksFilePath, JSON.stringify(tasksFile, null, 2));
};

const deleteTask = (taskId: number) => {
  const tasksFile = JSON.parse(readFileSync(tasksFilePath, "utf8"));
  const tasksList: Task[] = tasksFile.tasks;
  // console.log(tasksList);
  tasksList.splice(taskId - 1, 1);
  tasksList.forEach((task: Task, index: number) => {
    task.id = index + 1;
  });
  writeFileSync(tasksFilePath, JSON.stringify(tasksFile, null, 2));
};

function main() {
  const mainCmd = args[0];

  if (mainCmd === "init") {
    init();
    return;
  }
  if (!existsSync(tasksFilePath)) {
    console.log(chalk.red('Developer\'s task manager must be initialized first!\nrun "devtask init"'));
    return;
  }

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
      switch (args[1]) {
        case undefined:
          listAll(tasksList);
          break;

        case "done":
          listFiltered(tasksList, "Done ✅");
          break;

        case "in-progress":
          listFiltered(tasksList, "In-progress ⌛");
          break;

        case "todo":
          listFiltered(tasksList, "Todo 🚨");
          break;

        default:
          console.log(chalk.red("Invalid status filter"));
          break;
      }
      break;

    case "update":
      if (!args[1] || !args[2]) {
        console.log(chalk.red("Missing arguments"));
      } else {
        update(parseInt(args[1]), args[2]);
        console.log(chalk.green(`Task number updated ${parseInt(args[1])} sucessfully!`));
      }
      break;
    case "mark-done":
      if (!args[1]) {
        console.log(chalk.red("Missing arguments"));
      } else {
        mark(parseInt(args[1]), "Done ✅");
      }
      break;
    case "mark-in-prog":
      if (!args[1]) {
        console.log(chalk.red("Missing arguments"));
      } else {
        mark(parseInt(args[1]), "In-progress ⌛");
      }
      break;
    case "mark-todo":
      if (!args[1]) {
        console.log(chalk.red("Missing arguments"));
      } else {
        mark(parseInt(args[1]), "Todo 🚨");
      }
      break;
    case "delete":
      if (!args[1]) {
        console.log(chalk.red("Missing the task id to be deleted"));
      } else {
        deleteTask(parseInt(args[1]));
        console.log(chalk.greenBright(`Task number ${args[1]} deleted sucessfully!`));
      }
  }
}

main();
