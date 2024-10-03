import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl px-4 py-16 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                  <div className="text-teal-600">
                      <img src='/images/logo-min.png' className='w-40' alt='typefinance logo' />
                  </div>
                  <p className="max-w-xs mt-4 text-gray-500">
                      Get started with your NextJS project right away.
                  </p>
                  <ul className="flex gap-6 mt-8">
                      <li>
                          <Link href="https://www.facebook.com/profile.php?id=100090952518947" rel="noreferrer" target="_blank">
                              <span className="sr-only">Facebook</span>
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                              </svg>
                          </Link>
                      </li>
                      {/* Repeat for other social media */}
                  </ul>
              </div>

              {/* Quick Links Section */}
              <div>
                  <p className="font-medium text-white">Quick Links</p>
                  <nav aria-label="Footer Navigation" className="mt-8">
                      <ul className="space-y-4 text-sm">
                          <li>
                              <Link href="/about" className="text-gray-500 transition hover:opacity-75">
                                  About Us
                              </Link>
                          </li>
                          <li>
                              <Link href="/contact" className="text-gray-500 transition hover:opacity-75">
                                  Contact Us
                              </Link>
                          </li>
                          <li>
                              <Link href="/services" className="text-gray-500 transition hover:opacity-75">
                                  Services
                              </Link>
                          </li>
                      </ul>
                  </nav>
              </div>

              {/* Contact Information */}
              <div>
                  <p className="font-medium text-white">Contact Us</p>
                  <ul className="space-y-4 mt-8 text-sm">
                      <li>
                          <p className="text-gray-500">Email: info@typefinance.com</p>
                      </li>
                      <li>
                          <p className="text-gray-500">Phone: (123) 456-7890</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="py-4 bg-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 TypeFinance. All rights reserved.
      </div>
  </footer>
  )
}

export default Footer;

