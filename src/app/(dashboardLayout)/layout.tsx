import LogoutButton from "@/components/modules/shared/LogoutButton"
import { getCookie } from "@/services/auth/tokenHandlers"

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const accessToken = await getCookie('accessToken')
    return (
        <div>
            {accessToken && <LogoutButton/>}
            {children}
        </div>
    )
}

export default CommonDashboardLayout