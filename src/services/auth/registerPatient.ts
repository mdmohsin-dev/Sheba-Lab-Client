"use server"

import z from "zod"
import { loginUser } from "./loginUser"

const registerValidationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    address: z.string().optional()
})

export const registerPatient = async (currentState: any, formData: any): Promise<any> => {
    try {
        const registerData = {
            password: formData.get("password"),
            patient: {
                name: formData.get("name"),
                email: formData.get("email"),
                address: formData.get("address"),
            }
        }

        const validationResult = registerValidationSchema.safeParse({
            name: registerData.patient.name,
            email: registerData.patient.email,
            password: registerData.password,
            address: registerData.patient.address
        })
        if (!validationResult.success) {
            return {
                success: false, errors: validationResult.error.issues.map(issue => {
                    return { field: issue.path[0], message: issue.message }
                })
            }
        }

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))

        const res = await fetch("http://localhost:5000/api/v1/user/create-patient", {
            method: "POST",
            body: newFormData,
        })
        const result = await res.json()

        if (result.success) {
            loginUser(currentState, formData)
        }

        return result


    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return { success: false, error: "Registration failed" }
    }
}