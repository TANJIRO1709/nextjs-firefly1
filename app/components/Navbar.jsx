"use client"
import React, { useState } from "react"
import { Bell, Search, ShoppingCart, CircleUserRound } from "lucide-react"
import Link from "next/link"

export default function Component({ active, user, logout, toggleSidebar, setShowCart }) {
  const [searchText, setSearchText] = useState("")
  const [viewUser, setViewUser] = useState(false)

  return (
    <nav className="w-full border-b">
      {/* Mobile Navigation */}
      <div className="flex items-center justify-between p-4 xl:hidden">
        <div className="text-xl font-bold">Logo</div>
        {user ? (
          <div className="flex items-center gap-4">
            <button>
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => setShowCart(true)}>
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button>
              <Bell className="h-5 w-5" />
            </button>
            <button onClick={toggleSidebar}>
              <CircleUserRound className="h-8 w-8 text-gray-400" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Login
          </Link>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden h-16 items-center justify-between px-6 xl:flex">
        <div className="flex items-center space-x-6">
          <Link href="/community" className="text-sm font-medium text-gray-700 hover:text-gray-900 ">
            Community
          </Link>
          <Link href="/tutorials" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Tutorials
          </Link>
        </div>

        <div className="flex w-full max-w-md items-center px-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 cursor-pointer" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-gray-300"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button onClick={() => setShowCart(true)}>
                <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-slate-400 hover:scale-110" />
              </button>
              <button>
                <Bell className="h-5 w-5 text-gray-700 hover:text-slate-400 hover:scale-110" />
              </button>
              <button
                onClick={() => setViewUser(!viewUser)}
                className="relative"
              >
                <CircleUserRound className="h-6 w-6 text-gray-700 hover:text-slate-400 hover:scale-110" />
                {viewUser && (
                  <div
                    onClick={() => logout()}
                    className="absolute right-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                      Logout
                    </button>
                  </div>
                )}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}