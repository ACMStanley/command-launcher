import { useContext } from 'react';
import styles from './CommandLauncher.module.scss';
import { CommandLauncherContext } from './CommandLauncherContext';
import { ExecutionView } from './execution-view/ExecutionView';
import { InputView } from './input-view/InputView';
import { CommandView } from './command-view/CommandView';
import { DecsriptionView } from './description-view/DescriptionView';

export const CommandLauncher = () => {
    const { selectedCommand, executionStatus, highlightedCommand} = useContext(CommandLauncherContext);

    let selectedView;

    if (executionStatus.status !== 'IDLE') {
        selectedView = <ExecutionView/>;
    } else if (selectedCommand) {
        selectedView = <InputView selectedCommand={selectedCommand}/>;
    } else if (highlightedCommand){
        selectedView = <DecsriptionView command={highlightedCommand}/>;
    }

    return (
        <div className={styles.commandLauncher}>
            <div className={styles.commandView}>
                <CommandView />
            </div>
            <div className={styles.actionView}>
                {selectedView}
            </div>
        </div>
    )
};
