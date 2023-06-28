import { useContext, useState } from 'react';
import styles from './InputForm.module.scss';
import { ZodType, z, ZodObject } from 'zod';
import { useKeyEvent } from '../../../../hooks/useKeyEvent';
import { buildZodInput } from './utils';
import { CommandLauncherContext, ICommandMeta } from '../../CommandLauncherContext';
import { fromZodError } from 'zod-validation-error'

interface InputFormProps {
    selectedCommand: ICommandMeta
}

export const InputForm = ({
    selectedCommand
}: InputFormProps) => {
    const schema = selectedCommand.inputSchema;

    const { executeSelectedCommand } = useContext(CommandLauncherContext);
    const [inputValues, setInputValues] = useState<z.infer<typeof schema>>({});
    const [selectedFieldIndex, setSelectedFieldIndex] = useState<number>(0);
    const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(null);

    const buildInputs = (schema: ZodObject<any>): JSX.Element[] => {
        const fields = Object.keys(schema.shape);

        return fields.map((fieldName, index) => {
            const fieldSchema = schema.shape[fieldName] as ZodType;

            const updateInputValues = (value: any) => {
                setInputErrorMessage(null);
                setInputValues({
                    ...inputValues,
                    [fieldName]: value
                });
            }

            const isSelected = index === selectedFieldIndex;
            const className = isSelected ? styles.selectedInputField : styles.inputField;
            const inputElement = buildZodInput(fieldSchema, fieldName, updateInputValues, isSelected);

            return (
                <div className={className} key={fieldName}>
                    <label htmlFor={fieldName}>{fieldName}:</label>
                    {inputElement}
                </div>
            )
        });
    }

    const incSelectedFieldIndex = () => {
        if (selectedFieldIndex < inputs.length - 1) {
            setSelectedFieldIndex(selectedFieldIndex + 1);
        }
    }

    const decSelectedFieldIndex = () => {
        if (selectedFieldIndex > 0) {
            setSelectedFieldIndex(selectedFieldIndex - 1);
        }
    }

    useKeyEvent("ArrowUp", decSelectedFieldIndex);
    useKeyEvent("ArrowDown", incSelectedFieldIndex);
    useKeyEvent("Tab", incSelectedFieldIndex);

    useKeyEvent("Enter", () => {
        const parseResult = executeSelectedCommand(inputValues);

        if (!parseResult.success) {
            setInputErrorMessage(fromZodError(parseResult.error).message);
        }
    });

    let inputs: JSX.Element[] = [];
    if (selectedCommand) {
        inputs = buildInputs(selectedCommand.inputSchema);
    }

    return (
        <div className={styles.inputForm}>
            {inputs}
            {inputErrorMessage && <span className={styles.validationError}>{inputErrorMessage} </span>}
        </div>
    )
}