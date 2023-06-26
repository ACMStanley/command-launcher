import { useContext } from 'react';
import styles from './CommandLauncher.module.scss';
import { CommandLauncherContext } from './CommandLauncherContext';
import { ExecutionView } from './execution-view/ExecutionView';
import { InputView } from './input-view/InputView';
import { CommandView } from './command-view/CommandView';

export const CommandLauncher = () => {
    const { selectedCommand, executionStatus} = useContext(CommandLauncherContext);

    let selectedView;

    if (executionStatus.status !== 'IDLE') {
        selectedView = <ExecutionView/>;
    } else if (selectedCommand) {
        selectedView = <InputView selectedCommand={selectedCommand}/>;
    } else {
        selectedView = <CommandView />;
    }

    return (
        <div className={styles.commandLauncher}>
            {selectedView}
        </div>
    )
};
