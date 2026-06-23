import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils'
import { deleteCookie, getCookie } from './services/auth/tokenHandlers'
import { getUserInfo } from './services/auth/getUserInfo'
import { getNewAccessToken } from './services/auth/auth.service'


export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname
    const hasTokenRefreshedParam = request.nextUrl.searchParams.has('tokenRefreshed');

       // If coming back after token refresh, remove the param and continue
    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    }

    const tokenRefreshResult = await getNewAccessToken();

    // If token was refreshed, redirect to same page to fetch with new token
    if (tokenRefreshResult?.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    }


    const accessToken = await getCookie('accessToken') || null

    let userRole: UserRole | null = null

    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (typeof verifiedToken === "string") {
            await deleteCookie("accessToken")
            await deleteCookie("refreshToken")
            return NextResponse.redirect(new URL('/login', request.url))
        }

        userRole = verifiedToken.role
    }

    const routerOwner = getRouteOwner(pathName)

    const isAuth = isAuthRoute(pathName)

    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", pathName)
        return NextResponse.redirect(loginUrl)
    }


    // if (accessToken) {
    //     const userInfo = await getUserInfo();
    //     if (userInfo.needPasswordChange) {
    //         if (pathName !== "/reset-password") {
    //             const resetPasswordUrl = new URL("/reset-password", request.url);
    //             resetPasswordUrl.searchParams.set("redirect", pathName);
    //             return NextResponse.redirect(resetPasswordUrl);
    //         }
    //         return NextResponse.next();
    //     }

    //     if (userInfo && !userInfo.needPasswordChange && pathName === '/reset-password') {
    //         return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    //     }
    // }



    if (routerOwner === "COMMON") {
        return NextResponse.next()
    }

    if (routerOwner === 'ADMIN' || routerOwner === 'DOCTOR' || routerOwner === 'PATIENT') {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    return NextResponse.next()
}




export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}