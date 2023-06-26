import { useContext } from "react";
import { CommandLauncherContext } from "../CommandLauncherContext";
import styles from './ExecutionView.module.scss';
import { buildErrorView, buildSuccessfulView } from "./utils";
import { useKeyEvent } from "../../../hooks/useKeyEvent";

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

    let view;
    let style;
    if(status === 'EXECUTING') {
        view = `Executing ${executionStatus.command.name}...`;
        style = styles.executing;
    } else if (status === 'ERROR') {
        view = buildErrorView(executionStatus.command, executionStatus.error);
        style = styles.error;
    } else if (status === 'SUCCESS') {
        view = buildSuccessfulView(executionStatus.command, executionStatus.result);
        style = styles.success;
    }

    return (
        <div className={styles.executionView}>
            <span className={style}>{view}</span>
        </div>
    )
}
