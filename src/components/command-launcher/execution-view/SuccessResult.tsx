import { ICommandMeta } from '../CommandLauncherContext';
import styles from './ExecutionView.module.scss';

interface ISuccessResultProps {
    command: ICommandMeta;
    result: any;
}

export const SuccessResult = ({
    command,
    result
}:ISuccessResultProps) => {
    const isResultPresent = result != undefined;
    return (
        <div className={styles.success}>
            {command.name} Successful!
            <pre className={styles.resultWrapper}>
                <span className={styles.result}>{isResultPresent && JSON.stringify(result,null,2)}</span>
            </pre>
        </div>
    )
}