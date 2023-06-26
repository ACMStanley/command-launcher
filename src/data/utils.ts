export const createDummyTask = <T>(delay: number) => async (input: T) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return input;
};