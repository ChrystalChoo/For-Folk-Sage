import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#113108] text-stone-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Home</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-stone-300 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Our Values</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Our Concept</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Collection</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-stone-300 hover:text-white">All Products</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Bestsellers</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-stone-300 hover:text-white">Events</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Community Dinner</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Networking</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Let's Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-stone-300 hover:text-white">Instagram</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">TikTok</Link></li>
              <li><Link href="#" className="text-stone-300 hover:text-white">Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2023 For Folk Sage. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/privacy" className="text-stone-300 hover:text-white hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-stone-300 hover:text-white hover:underline">Terms of Service</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}