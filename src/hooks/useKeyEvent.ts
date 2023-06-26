import { useEffect } from "react";

export const useKeyEvent = (key: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.key);
            if (event.key === key) {
                callback();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, callback]);
}