

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCookie } from '@/services/auth/tokenHandlers'
import LogoutButton from '../shared/LogoutButton'

const NavbarAuth = async () => {
    const accessToken = await getCookie('accessToken')

    return accessToken ? (
        <LogoutButton />
    ) : (
        <Button asChild>
            <Link href="/login">Login</Link>
        </Button>
    )
}

export default NavbarAuth