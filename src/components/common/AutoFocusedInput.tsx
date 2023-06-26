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

    //stops vertical arrow keys from moving text cursor, so that they can be used for navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            // event.preventDefault();
        }
    }

    return (
        <input
            name={name}
            type={type}
            ref={inputRef}
            onBlur={refocus}
            onKeyDown={handleKeyDown}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
        />
    )
}