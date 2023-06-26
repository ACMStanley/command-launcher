import { useEffect } from "react";

export const useKeyEvent = (key: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === key) {
                callback();
                //stop default behaviour of key
                event.preventDefault();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, callback]);
}