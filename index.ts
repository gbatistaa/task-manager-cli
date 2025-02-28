import chalk from "chalk";
import { appendFileSync, existsSync, mkdirSync } from "fs";

type status = "done" | "doing" | "to do";

interface Task {
  title: string;
  status: status;
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

const init = async (): Promise<void> => {
  const currDir = process.cwd();
  const userDefault: User = {
    username: "Gabriel",
    tasks: [],
  };

  const configDir = `${currDir}/config`;
  const tasksFilePath = `${configDir}/tasks.json`;

  try {
    if (!existsSync(tasksFilePath)) {
      mkdirSync(configDir);
      const stringJson = JSON.stringify(userDefault, null, 2);
      appendFileSync(tasksFilePath, stringJson);
      console.log(chalk.green("Developer's task manager initialized successfully!"));
    } else {
      console.log(chalk.yellow("Developer's task manager was already initialized!"));
    }
  } catch (error) {
    console.error(chalk.red(error));
  }
};

function main() {
  const mainCmd = args[0];

  switch (mainCmd) {
    case "init":
      init();
      break;

    default:
      break;
  }
}

main();
