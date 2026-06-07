'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Activity, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Health Plans', path: '/health-plans' },
    { name: 'Diagnostic', path: '/diagnostic' }
]

export function PublicNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-border shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border-transparent',
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">
                                Sheba Lab
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    pathname === link.path
                                        ? 'text-primary'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">

                        {/* Dark/Light toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDark((prev) => !prev)}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Login button */}
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">

                        {/* Dark/Light toggle — mobile */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDark((prev) => !prev)}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Menu open/close */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu — smooth slide animation */}
            <div
                className={cn(
                    'md:hidden bg-white dark:bg-zinc-900 border-b border-border overflow-hidden transition-all duration-300 ease-in-out',
                    mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                'block px-3 py-2 rounded-md text-base font-medium',
                                pathname === link.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
                        <Button className="w-full" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}