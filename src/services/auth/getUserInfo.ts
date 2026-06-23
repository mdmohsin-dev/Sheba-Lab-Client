'use server'

import { UserInfo } from "@/types/user.interface"
import { getCookie } from "./tokenHandlers"
import jwt, { JwtPayload } from "jsonwebtoken"
import { serverFetch } from "@/lib/server-fetch"

export const getUserInfo = async (): Promise<UserInfo | any> => {
    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();
        console.log('result is here: ',result)

        if (!result.success) {
            throw new Error("Failed to fetch user info");
        }

        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string
        ) as JwtPayload;

        const userInfo: UserInfo = {
            ...result.data,
            name:
                result.data.admin?.name ||
                result.data.doctor?.name ||
                result.data.patient?.name ||
                verifiedToken.name ||
                "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,  // ✅ সবশেষে set করো, যাতে spread overwrite না করে
        };

        return userInfo;

    } catch (error: any) {
        console.log(error);
        console.log("getUserInfo error:", error.message) 
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "PATIENT",
        };
    }
}