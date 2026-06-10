'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerPatient } from '@/services/auth/registerPatient'

export default function RegisterForm() {

  const [state, formAction, isPending] = useActionState(registerPatient, null)


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
          {getFieldError("name") && <p className="text-sm text-red-500">{getFieldError("name")}</p>}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
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
          {getFieldError("email") && <p className="text-sm text-red-500">{getFieldError("email")}</p>}
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
          {getFieldError("password") && <p className="text-sm text-red-500">{getFieldError("password")}</p>}
          
      </div>

      <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
        {isPending ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}