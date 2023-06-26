import { z } from "zod";
import { createDummyTask } from "./utils";
import { userSchema } from "../schemas/user";
import { ICommand } from "../command/command";

const createUserSchema = userSchema.omit({ id: true });
const updateUserSchema = userSchema.pick({ id: true }).merge(userSchema.partial().omit({ id: true }));
const deleteUserSchema = userSchema.pick({ id: true });

export const DEFAULT_COMMANDS: ICommand[] = [
    {
        name: "createUser",
        inputSchema: createUserSchema,
        execute: createDummyTask<z.infer<typeof createUserSchema>>(1000),
    },
    {
        name: "updateUser",
        inputSchema: updateUserSchema,
        execute: createDummyTask<z.infer<typeof updateUserSchema>>(2000),
    },
    {
        name: "deleteUser",
        inputSchema: deleteUserSchema,
        execute: createDummyTask<z.infer<typeof deleteUserSchema>>(1000),
    },
    {
        name: "testError",
        inputSchema: z.object({}),
        execute: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            throw new Error("This is the error message");
        }
    }
];