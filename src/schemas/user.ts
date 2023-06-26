import z from "zod";

export const userSchema = z.object({
    id: z.string().length(10),
    name: z.string().min(2).max(20),
    email: z.string().email(),
    birthDate: z.date(),
});