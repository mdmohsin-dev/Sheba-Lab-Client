"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/services/auth/loginUser'
import { useActionState, useState } from 'react'

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [state, formAction, isPending] = useActionState(loginUser, null)
    console.log(state, "state")

    return (

        <form action={formAction}
            className="space-y-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    )
}

export default LoginForm