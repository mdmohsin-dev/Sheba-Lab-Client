'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (id === 'confirmPassword' || id === 'password') {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // })

      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success('Account created successfully!')
      router.push('/patient')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={cn(
                passwordError && 'border-red-500 focus-visible:ring-red-500',
              )}
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}