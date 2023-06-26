import { ICommandDescription } from "../../CommandLauncherContext";

export const sortAndFilterCommands = (commands: ICommandDescription[], filter: string) => {
    const sortedCommands = commands.slice().sort((a, b) => a.name.localeCompare(b.name));
    const filteredCommands = sortedCommands.filter(command => command.name.toLocaleUpperCase().startsWith(filter.toLocaleUpperCase()))
    return filteredCommands;
}