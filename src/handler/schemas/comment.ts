import {z} from "zod";

export const GetAll = z.object({
    limit: z.string().default('0').transform((limit) => parseInt(limit)),
    page: z.string().default('0').transform((page) => parseInt(page)),
    userId: z.string().optional(),
    postId: z.string().optional(),
})

export const Store = z.object({
    postId: z.string(),
    userId: z.string(),
    name: z.string(),
    comment: z.string(),
})