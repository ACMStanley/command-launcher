import { ZodObject } from "zod";

export interface ICommand {
    name: string;
    //Have chosen to enforce command schemas to be ZodObjects rather so that all fields of schema are named.
    //This is so that we can use the schema to generate a form for the user to fill out.
    //Workaround for primitive schema is to use ZodObject with a singgle field.
    inputSchema: ZodObject<any>; 
    execute: (input: any) => Promise<any>;
}



