import { useContext, useState } from 'react';
import styles from './CommandList.module.scss';
import { CommandLauncherContext } from '../../CommandLauncherContext';
import { useKeyEvent } from '../../../../hooks/useKeyEvent';
import { sortAndFilterCommands } from './utils';

export const CommandList = () => {
    const {
        commands: rawCommands,
        filter,
        setSelectedCommand
    } = useContext(CommandLauncherContext);

    const [commandIndex, setCommandIndex] = useState(0);
    const commands = sortAndFilterCommands(rawCommands, filter);

    // If the command index is out of bounds, set it to the last command
    if (commands.length <= commandIndex && commandIndex > 0) {
        setCommandIndex(commands.length - 1);
    }

    const commandNames = commands.map(command => command.name);
    const commandListItems = commandNames.map((commandName, index) => {
        const className = index === commandIndex ? styles.selectedCommandItem : styles.commandItem;
        return <li key={commandName} className={className}>{commandName}</li>
    });

    const decCommandIndex = () => {
        if (commandIndex > 0) {
            setCommandIndex(commandIndex - 1);
        }
    }

    const incSelectedCommandIndex = () => {
        if (commandIndex < commands.length - 1) {
            setCommandIndex(commandIndex + 1);
        }
    }

    const selectCommand = () => {
        if (commands.length > 0) {
            const index = rawCommands.findIndex(command => command.name === commands[commandIndex].name);
            setSelectedCommand(index);
        }
    }

    useKeyEvent("ArrowUp", decCommandIndex);
    useKeyEvent("ArrowDown", incSelectedCommandIndex);
    useKeyEvent("Enter", selectCommand);

    return (
        <div className={styles.commandList}>
            <ol>
                {commandListItems}
            </ol>
        </div>
    )
}
