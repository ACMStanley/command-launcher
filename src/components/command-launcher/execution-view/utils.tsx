import { ICommandMeta } from "../CommandLauncherContext";
import styles from './ExecutionView.module.scss';

export const buildErrorView = (command: ICommandMeta, error: Error) => {
    return (
        <>
            Error executing {command.name}:
            <div className={styles.errorMessage}>
                {error.message}
            </div>
        </>
    )
}

export const buildSuccessfulView = (command: ICommandMeta, result: any) => {
    const isResultPresent = result != undefined;
    return (
        <>
            {command.name} Successful!
            <pre className={styles.result}>
                {isResultPresent && JSON.stringify(result,null,2)}
            </pre>
        </>
    )
}