export const enableCallback = (callback: () => void, isEnabled: boolean) => {
    if (isEnabled) {
        return callback;
    }
    return () => { };
}