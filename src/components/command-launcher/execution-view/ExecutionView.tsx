import { useContext } from "react";
import { CommandLauncherContext } from "../CommandLauncherContext";
import styles from './ExecutionView.module.scss';
import { useKeyEvent } from "../../../hooks/useKeyEvent";
import { ErrorResult } from "./ErrorResult";
import { SuccessResult } from "./SuccessResult";

export const ExecutionView = () => {
    const { executionStatus, returnHome} = useContext(CommandLauncherContext);
    const status = executionStatus.status;

    //this state shouldn't happen,
    //but if it does, we should return to the main view
    if (executionStatus.status === 'IDLE') {
        returnHome();
        return null;
    }

    //don't allow the user to exit the view while the command is executing
    const exitView = () => {
        if(status === 'EXECUTING') {
            return;
        }
        returnHome();
    }

    useKeyEvent("Escape", exitView);
    useKeyEvent("Enter", exitView);

    let resultView;
    if(status === 'EXECUTING') {
        resultView = `Executing ${executionStatus.command.name}...`;
    } else if (status === 'ERROR') {
        resultView = <ErrorResult command={executionStatus.command} error={executionStatus.error}/>;
    } else if (status === 'SUCCESS') {
        resultView = <SuccessResult command={executionStatus.command} result={executionStatus.result}/>;
    }

    return (
        <div className={styles.executionView}>
            {resultView}
        </div>
    )
}
