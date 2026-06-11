import Link from 'next/link'
import { Activity } from 'lucide-react'
import { getCookie } from '@/services/auth/tokenHandlers'
import NavClient from './NavbarClient'

const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Health Plans', path: '/health-plans' },
    { name: 'Diagnostic', path: '/diagnostic' },
]

const PublicNavbar = async () => {
    const accessToken = await getCookie('accessToken')

    return (
        <NavClient navLinks={NAV_LINKS} isLoggedIn={!!accessToken}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-foreground">
                    Sheba Lab
                </span>
            </Link>
        </NavClient>
    )
}

export default PublicNavbar