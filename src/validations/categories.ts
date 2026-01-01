import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const createCategorySchemaValidate = toTypedSchema(
    z.object({
        name: z.string().min(3).max(20),
        code: z.string().min(3).max(20)
    })
)