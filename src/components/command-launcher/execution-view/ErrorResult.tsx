import { ICommandMeta } from '../CommandLauncherContext';
import styles from './ExecutionView.module.scss';

interface IErrorResultProps {
    command: ICommandMeta;
    error: Error;
}

export const ErrorResult = ({
    command,
    error
}:IErrorResultProps) => {
    return (
        <div className={styles.error}>
            Error executing {command.name}
            <div className={styles.errorMessage}>
                {error.message}
            </div>
        </div>
    )
}