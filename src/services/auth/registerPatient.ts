"use server"

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

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))

        const res = await fetch("http://localhost:5000/api/v1/user/create-patient", {
            method: "POST",
            body: newFormData,
        }).then(res => res.json())

        console.log(res, 'res')

        return res


    } catch (error) {
        console.error("Error registering patient:", error)
        return { success: false, error: "Registration failed" }
    }
}