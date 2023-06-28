import { ICommand } from "../../command/command";

export const commandToMeta = (command: ICommand) => ({
    name: command.name,
    description: command.description,
    inputSchema: command.inputSchema
});