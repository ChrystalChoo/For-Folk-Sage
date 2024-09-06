import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface NewsletterProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: (e: React.FormEvent) => void;
}

export default function Newsletter({ email, setEmail, handleSubscribe }: NewsletterProps) {
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubscribe(e)
    setShowWelcomeDialog(true)
  }

  return (
    <section className="bg-[#113108] py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-semibold">Ward off the bad juju with us</h2>
        <p className="mb-8 text-lg">Join our club and stay connected with the latest updates and exclusive offers.</p>
        <form onSubmit={handleSubmit} className="flex max-w-md">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-l-md border-white bg-white text-stone-800"
            required
          />
          <Button type="submit" className="rounded-l-none bg-white text-[#113108] hover:bg-stone-100">
            Subscribe
          </Button>
        </form>
      </div>
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">Welcome to the club</DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm">
            Check your emails for weekly updates, join us for community events, and let's make life worth living!
          </p>
        </DialogContent>
      </Dialog>
    </section>
  )
}