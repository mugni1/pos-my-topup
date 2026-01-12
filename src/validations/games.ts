import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const createGameSchema = toTypedSchema(
    z.object({
        title: z.string().min(4).max(50),
        studio: z.string().min(4).max(50),
        image: z
            .instanceof(File, { message: "Please upload an image file" })
            .refine(file => file.size <= 3 * 1024 * 1024, `Max file size is 3MB`)
            .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Only .jpg, .jpeg, .png, .webp and .gif formats are supported"),
        cover: z
            .instanceof(File, { message: "Please upload an image file" })
            .refine(file => file.size <= 3 * 1024 * 1024, `Max file size is 3MB`)
            .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Only .jpg, .jpeg, .png, .webp and .gif formats are supported")
    })
)

export const updateGameSchema = toTypedSchema(
    z.object({
        title: z.string().max(50, "maximum title must have 50 characters").min(4, "minimum title must have 4 characters").optional(),
        studio: z.string().max(50, "maximum studio must have 50 characters").min(4, "minimum studio must have 4 characters").optional(),
        image: z
            .instanceof(File, { message: "Please upload an image file" })
            .refine(file => file.size <= 3 * 1024 * 1024, `Max file size is 3MB`)
            .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Only .jpg, .jpeg, .png, .webp and .gif formats are supported").optional(),
        cover: z
            .instanceof(File, { message: "Please upload an image file" })
            .refine(file => file.size <= 3 * 1024 * 1024, `Max file size is 3MB`)
            .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Only .jpg, .jpeg, .png, .webp and .gif formats are supported").optional()
    })
)