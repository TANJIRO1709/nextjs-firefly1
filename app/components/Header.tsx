'use client'

import { Bell, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="flex items-center gap-6">
        <Link href="#" className="text-sm font-medium hover:text-gray-600">
          Community
        </Link>
        <Link href="#" className="text-sm font-medium hover:text-gray-600">
          Tutorials
        </Link>
      </div>
      
      <div className="flex-1 max-w-xl px-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full py-2 pl-8 pr-4 text-sm border rounded-md outline-none focus:border-gray-400"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ShoppingCart className="w-5 h-5" />
          <span className="sr-only">Shopping cart</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <button className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="https://plchldr.co/i/500x250?bg=111111"
            alt="User profile"
            width={32}
            height={32}
            className="object-cover"
          />
        </button>
      </div>
    </nav>
  )
}
