import { ICommandMeta } from '../CommandLauncherContext';
import styles from './DescriptionView.module.scss';

interface IDescriptionViewProps {
    command: ICommandMeta
}

export const DecsriptionView = ({
    command
}: IDescriptionViewProps) => {
    return (
        <div className={styles.descriptionView}>
            <div className={styles.title}>
                {command.name}
            </div>
            <div className={styles.description}>
                {command.description}
            </div>
        </div>
    )
}