'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    content: (
      <>
        123 Healthcare Blvd, Medical District
        <br />
        New York, NY 10001
      </>
    ),
  },
  {
    icon: Phone,
    title: 'Phone Number',
    content: (
      <>
        +1 (800) 123-4567
        <br />
        +1 (800) 987-6543
      </>
    ),
  },
  {
    icon: Mail,
    title: 'Email Address',
    content: (
      <>
        support@medicareai.com
        <br />
        info@medicareai.com
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: (
      <>
        Monday - Friday: 8:00 AM - 8:00 PM
        <br />
        Saturday - Sunday: 9:00 AM - 5:00 PM
      </>
    ),
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We will get back to you soon.')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600">
            Have questions or need assistance? Our support team is here to help
            you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-none shadow-md">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input name="name" id="name" required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input name="subject" id="subject" required placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    name="message"
                    id="message"
                    required
                    placeholder="Please describe your inquiry in detail..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-4 lg:pl-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Contact Information
            </h3>
            {contactInfo.map(({ icon: Icon, title, content }) => (
              <Card key={title} className="border-none shadow-sm bg-white">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
                    <p className="text-slate-600">{content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}