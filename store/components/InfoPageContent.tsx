'use client';

import React from 'react'
import { Leaf, Users, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function InfoPageContent() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value
    console.log(`Subscribed with email: ${email}`)
    form.reset()
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#113108]">Welcome to For Folk Sage</h1>
        <p className="text-xl text-center max-w-2xl mx-auto">Discover our collection of sustainable, nature-inspired products for mindful living.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-stone-100 p-6 rounded-lg shadow-md">
          <Leaf className="w-12 h-12 text-[#113108] mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-[#113108]">Sustainable Materials</h2>
          <p>Our products are crafted from eco-friendly, responsibly sourced materials.</p>
        </div>
        <div className="bg-stone-100 p-6 rounded-lg shadow-md">
          <Users className="w-12 h-12 text-[#113108] mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-[#113108]">Community-Driven</h2>
          <p>Join our community of like-minded individuals passionate about sustainable living.</p>
        </div>
        <div className="bg-stone-100 p-6 rounded-lg shadow-md">
          <ShoppingBag className="w-12 h-12 text-[#113108] mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-[#113108]">Curated Collection</h2>
          <p>Explore our carefully selected range of products that blend style with sustainability.</p>
        </div>
      </section>

      <section className="bg-[#113108] text-white p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">At For Folk Sage, we're committed to promoting sustainable living through thoughtfully designed products that connect people with nature and traditional wisdom.</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#113108] mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-lg">Sustainability: We are committed to eco-friendly practices.</li>
          <li className="text-lg">Quality: We ensure that every product meets our high standards.</li>
          <li className="text-lg">Transparency: We provide clear information about our products.</li>
          <li className="text-lg">Community: We support and engage with our local community.</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#113108] mb-4">Our Concept</h2>
        <p className="text-lg">
          Our concept revolves around blending modern design with traditional craftsmanship. We
          believe in creating products that not only look good but also contribute to a sustainable
          future. By using eco-friendly materials and ethical practices, we aim to offer products
          that make a difference.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#113108] mb-4">Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-grow p-2 border border-[#113108] rounded"
          />
          <button type="submit" className="bg-[#113108] text-white px-6 py-2 rounded hover:bg-[#1c4912]">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  )
}