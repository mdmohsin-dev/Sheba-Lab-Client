"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <form className="space-y-8">
            <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            required
                        />
                    </div> */}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                 {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    )
}

export default LoginForm