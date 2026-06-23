import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.NETXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1'

const serverFetchHelper = async (endPoint: string, options: RequestInit): Promise<Response> => {

    const { headers, ...restOptions } = options;

    const accessToken = await getCookie('accessToken')

     //to stop recursion loop
    if (endPoint !== "/auth/refresh-token") {
        await getNewAccessToken();
    }


    const response = await fetch(`${BACKEND_API_URL}${endPoint}`, {
        headers: {
            ...headers,
            Cookie: accessToken ? `accessToken=${accessToken}` : ""
        },
        ...restOptions
    })

    return response
}


export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),
    
    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
}