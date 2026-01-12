import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

const schemaCreate = z.object({
    name: z.string({ required_error: "Name is required" }).min(2, "name must be at least 2 characters").max(50, "name must be at most 50 characters"),
    code: z.string({ required_error: "Code is required" }).min(2, "code must be at least 2 characters").max(50, "code must be at most 50 characters"),
    game_id: z.string({ required_error: "Game is required" }).cuid("Invalid game please select another game")
})
export const createCategorySchema = toTypedSchema(schemaCreate)
export type CreateCategoryPayload = z.infer<typeof schemaCreate>;

const schemaUpdate = z.object({
    name: z.string({ required_error: "Name is required" }).min(2, "name must be at least 2 characters").max(50, "name must be at most 50 characters").optional(),
    code: z.string({ required_error: "Code is required" }).min(2, "code must be at least 2 characters").max(50, "code must be at most 50 characters").optional(),
    game_id: z.string({ required_error: "Game is required" }).cuid("Invalid game please select another game").optional()
})
export const updateCategorySchema = toTypedSchema(schemaUpdate)
export type UpdateCategoryPayload = z.infer<typeof schemaUpdate>;