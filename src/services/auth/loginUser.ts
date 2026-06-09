"use server"

export const loginUser = async (currentState: any, formData: any): Promise<any> => {
    try {
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password")
        }


        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())


        return res


    } catch (error) {
        console.error("Error logging in user:", error)
        return { success: false, error: "Login failed" }
    }
}