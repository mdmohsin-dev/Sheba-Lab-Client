import z from "zod"

export const registerPatientValidationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    address: z.string().optional()
})


export const loginValidationSchema = z.object({
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })

})