import { ICommandMeta } from "../../CommandLauncherContext";

export const sortAndFilterCommands = (commands: ICommandMeta[], filter: string) => {
    const sortedCommands = commands.slice().sort((a, b) => a.name.localeCompare(b.name));
    const filteredCommands = sortedCommands.filter(command => command.name.toLocaleUpperCase().startsWith(filter.toLocaleUpperCase()))
    return filteredCommands;
}