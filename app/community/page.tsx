'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Utensils, Heart, MessageSquare, Briefcase } from 'lucide-react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CustomEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const events: CustomEvent[] = [
  {
    title: 'Community Gathering',
    start: new Date(2024, 8, 15),
    end: new Date(2024, 8, 15),
    allDay: true,
  },
  {
    title: 'Wellness Workshop',
    start: new Date(2024, 9, 2),
    end: new Date(2024, 9, 2),
    allDay: true,
  },
  {
    title: 'Sustainability Forum',
    start: new Date(2024, 9, 20),
    end: new Date(2024, 9, 20),
    allDay: true,
  },
]

export default function CommunityPage() {
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null)

  const handleSelectEvent = (event: CustomEvent) => {
    setSelectedEvent(event)
  }
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <Header 
        isLoggedIn={false}
        handleLogin={() => {}}
        handleLogout={() => {}}
        isCartOpen={false}
        setIsCartOpen={() => {}}
        isWishlistOpen={false}
        setIsWishlistOpen={() => {}}
        cart={[]}
        wishlist={[]}
        searchQuery=""
        setSearchQuery={() => {}}
        handleSearch={() => {}}
        cartTotal={0}
        removeFromCart={() => {}}
        removeFromWishlist={() => {}}
        updateCartItemQuantity={() => {}}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Community</h1>
        
        <nav className="mb-12 flex flex-wrap gap-6 text-sm">
          {[
            { name: 'Events', icon: Calendar },
            { name: 'Meetups', icon: Users },
            { name: 'Dinners & Socials', icon: Utensils },
            { name: 'Volunteering', icon: Heart },
            { name: 'Forum', icon: MessageSquare },
            { name: 'Collaborations', icon: Briefcase },
          ].map((item) => (
            <Link
              key={item.name}
              href="#"
              className="flex items-center gap-2 hover:text-[#113108] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Community Calendar</h2>
          <div className="h-[600px]">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              className="bg-white p-4 rounded-lg shadow"
            />
          </div>
        </section>

        {selectedEvent && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Selected Event</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <p>Date: {selectedEvent.start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.title} className="group">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:underline">{event.title}</h3>
                <p className="text-sm text-stone-600">{event.start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Join Our Community</h2>
          <p className="mb-4">
            Connect with like-minded individuals, participate in events, and contribute to our sustainable community.
          </p>
          <Link href="#" className="inline-block bg-[#113108] text-white px-4 py-2 rounded hover:bg-[#1c4912]">
            Get Involved
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
