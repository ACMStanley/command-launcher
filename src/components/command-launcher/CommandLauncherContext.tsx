import { createContext, useState } from 'react';
import { ICommand } from '../../command/command';
import { SafeParseReturnType, ZodObject, z } from 'zod';
import { commandToMeta } from './utils';

//Just an ICommand without access to the execute method
export interface ICommandMeta {
    name: string;
    inputSchema: ZodObject<any>
    description: string;
}

export type ExecutionStatus = {
    status: 'IDLE',
    command: null
} | {
    status: 'EXECUTING',
    command: ICommandMeta
} | {
    status: 'SUCCESS',
    command: ICommandMeta
    result: object | void
} | {
    status: 'ERROR',
    command: ICommandMeta
    error: Error
}

interface ICommandLauncherContextType {
    commands: ICommandMeta[];
    selectedCommand: ICommandMeta | null;
    highlightedCommand: ICommandMeta | null;
    setHighlightedCommand: (index: number) => void;
    executeSelectedCommand: (input: any) => SafeParseReturnType<any, any>;
    selectCommand: () => void;
    filter: string;
    setFilter: (filter: string) => void;
    executionStatus: ExecutionStatus;
    returnHome: () => void;
}

export const CommandLauncherContext = createContext<ICommandLauncherContextType>({
    commands: [],
    filter: "",
    setFilter: () => { },
    selectedCommand: null,
    highlightedCommand: null,
    setHighlightedCommand: () => { },
    executeSelectedCommand: () => ({
        data: null,
        success: true
    }),
    executionStatus: {
        status: 'IDLE',
        command: null
    },
    returnHome: () => { },
    selectCommand: () => { }
});

interface ICommandLauncherProviderProps {
    children: React.ReactNode;
    commands: ICommand[];
}

export const CommandLauncherProvider = ({
    children,
    commands: rawCommands
}: ICommandLauncherProviderProps) => {
    const [filter, setFilter] = useState("");
    const [selectedCommand, setSelectedCommand] = useState<ICommand | null>(null);
    const [status, setStatus] = useState<ExecutionStatus>({
        status: 'IDLE',
        command: null
    });
    const [highlightedCommand, setHighlightedCommand] = useState<ICommand | null>(null);

    const setHighlightedCommandByIndex = (index: number) => {
        const command = rawCommands[index];
        setHighlightedCommand(command);
    };

    const commandMetas = rawCommands.map(command => ({
        name: command.name,
        inputSchema: command.inputSchema,
        description: command.description
    }));

    const handleExecution = async (command: ICommand, input: any) => {
        setStatus({
            status: 'EXECUTING',
            command
        });
        try {
            const result = await command.execute(input);
            setStatus({
                status: 'SUCCESS',
                command,
                result
            });
        }
        catch (e) {
            setStatus({
                status: 'ERROR',
                command,
                error: e as Error
            });
        }
    };

    const selectCommand = () => {
        if (highlightedCommand == null || selectCommand == null || status.status === 'EXECUTING') {
            return;
        }
        setSelectedCommand(highlightedCommand);
    };

    const executeSelectedCommand = (input: any): SafeParseReturnType<any, any> => {
        if (selectedCommand == null) {
            return {
                data: null,
                success: true
            };
        }

        const parseResult = selectedCommand.inputSchema.safeParse(input);

        if (parseResult.success) {
            handleExecution(selectedCommand, parseResult.data);
            setSelectedCommand(null);
        }

        return parseResult;

    };


    //sets the context state to the default state
    //The main component reflects this state and renders the home view
    const returnHome = () => {
        //Dont allow returning home if we are executing a command
        if (status.status === 'EXECUTING') {
            return;
        }
        setStatus({
            status: 'IDLE',
            command: null
        });
        setSelectedCommand(null);
    }

    const value: ICommandLauncherContextType = {
        commands: commandMetas,
        filter,
        setFilter,
        selectedCommand: selectedCommand ? commandToMeta(selectedCommand) : null,
        setHighlightedCommand: setHighlightedCommandByIndex,
        executeSelectedCommand,
        executionStatus: status,
        returnHome,
        selectCommand,
        highlightedCommand
    };

    return (
        <CommandLauncherContext.Provider value={value}>
            {children}
        </CommandLauncherContext.Provider>
    );
};