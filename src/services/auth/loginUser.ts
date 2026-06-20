"use server"

import { getDefaultDashboardRoute, isValidateRedirectForRole, UserRole } from "@/lib/auth-utils"
import { parse } from "cookie"
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation"
import z from "zod"
import { setCookie } from "./tokenHandlers"
import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import { loginValidationSchema } from "@/zod/auth.validation"



export const loginUser = async (currentState: any, formData: any): Promise<any> => {
    try {

        const redirectTo = formData.get('redirect') || null;

        let accessTokenObj: null | any = null
        let refreshTokenObj: null | any = null

        const payload = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        // const validationResult = loginValidationSchema.safeParse(loginData)
        // if (!validationResult.success) {
        //     return {
        //         success: false, errors: validationResult.error.issues.map(issue => {
        //             return { field: issue.path[0], message: issue.message }
        //         })
        //     }
        // }

        if (zodValidator(payload, loginValidationSchema).success === false) {
            return zodValidator(payload, loginValidationSchema);
        }

        const validatedPayload = zodValidator(payload, loginValidationSchema).data;

        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers:{
                "Content-type":"application/json"
            }
        })

        const result = await res.json()

        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie)

                if (parsedCookie['accessToken']) {
                    accessTokenObj = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObj = parsedCookie;
                }
            })
        }
        else {
            throw new Error("No Set-Cookie header found in response")
        }



        if (!accessTokenObj) {
            throw new Error("Tokens not found in cookies")
        }
        if (!refreshTokenObj) {
            throw new Error("Tokens not found in cookies")
        }


        await setCookie('accessToken', accessTokenObj.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObj['Max-Age']) || 100 * 60 * 60,
            path: accessTokenObj.Path || "/",
            sameSite: accessTokenObj.SameSite || 'none'
        })

        await setCookie("refreshToken", refreshTokenObj.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObj['Max-Age']) || 100 * 60 * 60 * 24 * 90,
            path: refreshTokenObj.Path || "/",
            sameSite: accessTokenObj.SameSite || "none"
        })



        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObj.accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token")
        }

        const userRole: UserRole = verifiedToken.role

        if (!result.success) {
            throw new Error(result.message || 'Invalid email or password')
        }

        if (redirectTo) {
            const requestPath = redirectTo.toString()
            if (isValidateRedirectForRole(requestPath, userRole)) {
                redirect(`${requestPath}?loggedIn=true`)
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
        }



    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Invalid email or password'}` }
    }
}