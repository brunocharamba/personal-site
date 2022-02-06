// FILE SYSTEM

export const commandCD = (command: string[]): string => command[0];
export const commandLS = (command: string[]): string => command[0];
export const commandCLS = (command: string[]): string => command[0];

export const commandSwitch = (command: string): string => {
  if (!command || command.length < 2) return "Command not found";

  const splited = command.split(" ");
  const comm = splited[0].toLowerCase();

  switch (comm) {
    case "cd":
      return commandCD(splited);
    case "ls":
      return commandLS(splited);
    case "cls":
    case "clear":
      return commandCLS(splited);
    default:
      return "Command not found";
      break;
  }
};
