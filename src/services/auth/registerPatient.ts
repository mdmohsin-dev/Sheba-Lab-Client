"use server"

import z from "zod"
import { loginUser } from "./loginUser"
import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import { registerPatientValidationSchema } from "@/zod/auth.validation"


export const registerPatient = async (currentState: any, formData: any): Promise<any> => {
    try {

        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        if (zodValidator(payload, registerPatientValidationSchema).success === false) {
            return zodValidator(payload, registerPatientValidationSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerPatientValidationSchema).data;

        const registerData = {
            password: validatedPayload.password,
            patient: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                address: validatedPayload.address,
            }
        }

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))

         if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-patient", {
            body: newFormData,
        })
        const result = await res.json()

        if (result.success) {
          await  loginUser(currentState, formData)
        }

        return result


    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Registration failed. Please try again'}` }
    }
}