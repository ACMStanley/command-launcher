import { useContext, useEffect } from 'react';
import { CommandLauncherContext, ICommandMeta } from '../CommandLauncherContext';
import styles from './InputView.module.scss';
//@ts-ignore
import { ReactComponent as BackArrow } from './left-arrow.svg';
import { InputForm } from './input-form/InputForm';
import { useKeyEvent } from '../../../hooks/useKeyEvent';

export interface IInputViewProps {
    selectedCommand: ICommandMeta
}

export const InputView = ({
    selectedCommand
} : IInputViewProps) => {
    const { returnHome, executeSelectedCommand } = useContext(CommandLauncherContext);
    
    // If there are no input fields, execute the command immediately
    useEffect(() => {
        if(Object.keys(selectedCommand.inputSchema.shape).length === 0) {
            executeSelectedCommand({});
        }
    }, [selectedCommand]);

    useKeyEvent("Escape", returnHome);

    return (
        <div className={styles.inputView}>

            <div className={styles.inputHeader}>

                <div className={styles.backArrowWrapper}>
                    <BackArrow className={styles.backArrow} onClick={returnHome} />
                    <span className={styles.buttonLabel}>(esc)</span>
                </div>

                <span className={styles.commandTitle}>{selectedCommand?.name}</span>

            </div>

            <InputForm selectedCommand={selectedCommand} />
        </div>
    )
}