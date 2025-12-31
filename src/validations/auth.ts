import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

// SCHEMA
export const loginSchemaValidate = toTypedSchema(
    z.object({
        email: z.string().email().min(2).max(50),
        password: z.string().min(8).max(12),
    })
)