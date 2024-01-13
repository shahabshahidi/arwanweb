import "dotenv/config";
import chalk from "chalk";

import Action from "./action.js";

console.clear();

const error = chalk.redBright.bold;
const warn = chalk.yellowBright.bold;

const command = process.argv[2];
const subCommand = process.argv[3];

const commands = ["list", "add", "show", "edit", "delete", "delete-all"];
const subCommands = ["posts", "comments", "users"];

if (command) {
  if (subCommand) {
    switch (command) {
      case "list":
        Action.list(subCommand);
        break;
      case "add":
        Action.add(subCommand);
        break;
      case "show":
        Action.show(subCommand);
        break;
      case "edit":
        Action.edit(subCommand);
        break;
      case "delete":
        Action.delete(subCommand);
        break;
      case "delete-all":
        Action.deleteAll(subCommand);
        break;

      default:
        showAlert();
        break;
    }
  } else {
    showAlert();
  }
} else {
  showAlert();
}

function showAlert() {
  const alert = `${error("You must enter a command.")}
Available command are:
${warn(commands.join("\n"))}
${chalk.redBright("example : node app list posts")}`;

  console.log(alert);
}
