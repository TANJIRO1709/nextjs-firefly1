import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white sm:items-center">
      <div className="container mx-auto px-6 py-10 md:px-8 lg:px-12">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center sm:justify-items-start">
          <div className="space-y-4 text-center sm:text-left">
            <Image
              src="https://res.cloudinary.com/dmcnewoxd/image/upload/v1734690014/rxc5dynomgfbsfuebjt4.png"
              alt="Firefly Logo"
              width={150}
              height={80}
              className="h-16 w-auto mx-auto sm:mx-0"
            />
            <div className="flex justify-center sm:justify-start space-x-3">
              <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-700">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Career</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Media</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Reviews</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-700">Shop By Room</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Living Room</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Bedroom</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Dining Room</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Kitchen</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-700">Partner with us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Design Partner</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Sell On Firefly</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Franchise</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-700">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Order Tracking</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Custom Furniture</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Exporters</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Buy in Bulk</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-700">Need Help?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Help Center</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Ask Experts</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Track Your Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 mt-8 border-t text-sm text-gray-600 justify-center">
          <Link href="#" className="hover:text-gray-900">Terms Of Use</Link>
          <h1>|</h1>
          <Link href="#" className="hover:text-gray-900">Security</Link>
          <h1>|</h1>
          <Link href="#" className="hover:text-gray-900">Return & Refund</Link>
          <h1>|</h1>
          <Link href="#" className="hover:text-gray-900">Payment Policy</Link>
        </div>
      </div>
    </footer>
  );
}
