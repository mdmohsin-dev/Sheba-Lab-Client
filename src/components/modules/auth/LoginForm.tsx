"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/services/auth/loginUser'
import { useActionState } from 'react'

const LoginForm = ({ redirect }: { redirect?: string }) => {

    const [state, formAction, isPending] = useActionState(loginUser, null)

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const errorForField = state.errors.find((err: any) => err.field === fieldName)
            return errorForField?.message
        }
        else {
            return null
        }
    }

    return (

        <form action={formAction} className="space-y-8">
            {redirect && <input type="hidden" name='redirect' value={redirect} />}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                    />
                    {getFieldError("email") && <p className="text-sm text-red-500">{getFieldError("email")}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                    />
                </div>
                {getFieldError("password") && <p className="text-sm text-red-500">{getFieldError("password")}</p>}
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    )
}

export default LoginForm