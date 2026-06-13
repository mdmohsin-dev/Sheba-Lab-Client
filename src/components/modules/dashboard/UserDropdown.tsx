'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/services/auth/logoutUser"
import { UserInfo } from "@/types/user.interface"
import { BadgeCheckIcon, LogOutIcon, Settings, UserRound } from "lucide-react"
import Link from "next/link"

interface UserDropdownProps {
    userInfo: UserInfo
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {

    const handleLogout = async () => {
        await logoutUser()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-lg" className="rounded-full bg-primary text-white">
                    <span className="text-sm font-semibold">
                        {userInfo?.name?.charAt(0).toUpperCase() || userInfo?.email.charAt(0).toUpperCase() || 'U'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 text-black">
                        <p className="text-2xl font-semibold">{userInfo.name}</p>
                        <p className="text-lg font-medium">{userInfo.email}</p>
                        <p className="text-sm font-medium">{userInfo.role.toLowerCase()}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={"/my-profile"} className="flex gap-2">
                            <UserRound />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={"/change-password"} className="flex gap-2">
                            <Settings />
                            Change Password
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown