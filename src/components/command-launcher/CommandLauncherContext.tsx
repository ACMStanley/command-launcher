import { createContext, useState } from 'react';
import { ICommand } from '../../command/command';
import { SafeParseReturnType, ZodObject } from 'zod';

export interface ICommandDescription {
    name: string;
    inputSchema: ZodObject<any>
}

export type ExecutionStatus = {
    status: 'IDLE',
    command: null
} | {
    status: 'EXECUTING',
    command: ICommandDescription
} | {
    status: 'SUCCESS',
    command: ICommandDescription
    result: object | void
} | {
    status: 'ERROR',
    command: ICommandDescription
    error: Error
}

interface ICommandLauncherContextType {
    commands: ICommandDescription[];
    selectedCommand: ICommandDescription | null;
    setSelectedCommand: (index: number) => void;
    executeSelectedCommand: (input: any) => SafeParseReturnType<any, any>;
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
    setSelectedCommand: () => { },
    executeSelectedCommand: () => ({
        data: null,
        success: true
    }),
    executionStatus: {
        status: 'IDLE',
        command: null
    },
    returnHome: () => { }
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
    const [_selectedCommand, _setSelectedCommand] = useState<ICommand | null>(null);
    const [selectedCommandDescription, _setSelectedCommandDescription] = useState<ICommandDescription | null>(null);
    const [status, setStatus] = useState<ExecutionStatus>({
        status: 'IDLE',
        command: null
    });

    const setSelectedCommand = (command: ICommand | null) => {
        _setSelectedCommand(command);

        if(command == null) {
            _setSelectedCommandDescription(null);
        }
        else{
            _setSelectedCommandDescription({
                name: command.name,
                inputSchema: command.inputSchema
            });
        }
    };

    const setSelectedCommandByIndex = (index: number) => {
        const command = rawCommands[index];
        setSelectedCommand(command);
    };

    const commandDescriptions = rawCommands.map(command => ({
        name: command.name,
        inputSchema: command.inputSchema
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

    const executeSelectedCommand = (input: any): SafeParseReturnType<any, any> => {
        if (_selectedCommand == null) {
            return {
                data: null,
                success: true
            };
        }

        const parseResult = _selectedCommand.inputSchema.safeParse(input);

        if (parseResult.success) {
            handleExecution(_selectedCommand, parseResult.data);
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
        commands: commandDescriptions,
        filter,
        setFilter,
        selectedCommand: selectedCommandDescription,
        setSelectedCommand: setSelectedCommandByIndex,
        executeSelectedCommand,
        executionStatus: status,
        returnHome
    };

    return (
        <CommandLauncherContext.Provider value={value}>
            {children}
        </CommandLauncherContext.Provider>
    );
};