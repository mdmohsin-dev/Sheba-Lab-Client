"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/services/auth/loginUser'
import { useActionState, useEffect } from 'react'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import InputFieldError from '../shared/InputFieldError'

const LoginForm = ({ redirect }: { redirect?: string }) => {

    const [state, formAction, isPending] = useActionState(loginUser, null)

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message)
        }
    }, [state])

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
                    <InputFieldError field="email" state={state} />
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
                <InputFieldError field="password" state={state} />
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
                {isPending ? (
                    <Loader className="animate-spin" />
                ) : (
                    'Sign In'
                )}
            </Button>
        </form>
    )
}

export default LoginForm