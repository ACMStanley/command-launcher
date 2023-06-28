import { useContext, useEffect, useState } from 'react';
import styles from './CommandList.module.scss';
import { CommandLauncherContext } from '../../CommandLauncherContext';
import { useKeyEvent } from '../../../../hooks/useKeyEvent';
import { sortAndFilterCommands } from './utils';
import { enableCallback } from '../../../common/utils';

interface ICommandListProps {
    isFocused: boolean;
}

export const CommandList = ({
    isFocused
}: ICommandListProps) => {
    const {
        commands: rawCommands,
        filter,
        setHighlightedCommand,
        selectCommand,
        selectedCommand
    } = useContext(CommandLauncherContext);

    const [commandIndex, setCommandIndex ] = useState(0);
    const commands = sortAndFilterCommands(rawCommands, filter);

    useEffect(() => {
        const command = commands[commandIndex];
        const index = rawCommands.indexOf(command);
        setHighlightedCommand(index);
    }, [commandIndex]);
    

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

    const handleEnter = () => {
        //only select a command if one is not already selected
        if (selectedCommand == null){
            selectCommand();
        }
    }

    useKeyEvent("ArrowUp", enableCallback(decCommandIndex,isFocused));
    useKeyEvent("ArrowDown", enableCallback(incSelectedCommandIndex,isFocused));
    useKeyEvent("Enter", handleEnter);

    return (
        <div className={styles.commandList}>
            <ol>
                {commandListItems}
            </ol>
        </div>
    )
}
