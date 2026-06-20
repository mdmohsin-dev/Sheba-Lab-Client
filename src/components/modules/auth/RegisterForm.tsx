'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerPatient } from '@/services/auth/registerPatient'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import InputFieldError from '../shared/InputFieldError'

export default function RegisterForm() {

  const [state, formAction, isPending] = useActionState(registerPatient, null)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction}
      className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
          />
        </div>
        <InputFieldError field="name" state={state} />
        <div className="space-y-2">
          <Label htmlFor="address">Address<span className='text-xs'>(optionla)</span></Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St, City, State 12345"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
          />
          <InputFieldError field="email" state={state} />
        </div>


        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
        <InputFieldError field="password" state={state} />

      </div>

      <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
        {isPending ? <Loader className='animate-spin'/> : 'Create Account'}
      </Button>
    </form>
  )
}