import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const createItemsSchemaValidate = toTypedSchema(
    z.object({
        name: z.string({ required_error: "Name is required" }).min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
        merchant_name: z.string({ required_error: "Merchant name is required" }).min(2, "Merchant name must be at least 2 characters").max(50, "Merchant name must be at most 50 characters"),
        price: z.coerce.number({ required_error: "Price is required", invalid_type_error: "Please input valid price" }).min(1, "Price must be at least Rp 1"),
        category_id: z.string({ required_error: "Please select category" }).cuid("Please select valid category"),
        image: z
            .instanceof(File, { message: "Please upload an image file" })
            .refine(file => file.size <= 1 * 1024 * 1024, `Max file size is 1MB`)
            .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Only .jpg, .jpeg, .png, .webp and .gif formats are supported")
    })
)