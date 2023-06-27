import { useEffect, useRef } from "react";

export interface IFocusedInputProps {
    type: string;
    isFocused: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    className?: string;
    placeholder?: string;
}

export const AutoFocusedInput = ({
    type,
    isFocused,
    onChange,
    name,
    className,
    placeholder
}: IFocusedInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    //force focus on this component
    useEffect(() => {
        refocus();
    }, [isFocused]);

    const refocus = () => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <input
            name={name}
            type={type}
            ref={inputRef}
            onBlur={refocus}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
        />
    )
}