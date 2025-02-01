import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <section className="overflow-hidden bg-cyan-900 py-7 relative top-10 ">
      <div className="relative z-10 mx-auto max-w-7xl px-4 font-semibold text-black">
        <div className="flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center ">
                <Logo width="100px" />
              </div>
              <div className=' flex justify-center '>
                <p className="text-xl text-white ">
                  &copy; Copyright 2023. All Rights Reserved by ShashBlogs.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xl font-semibold uppercase text-black-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-lg font-medium  hover:text-gray-700"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-lg font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>

              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-black-500">
                Support
              </h3>
              <ul>

                <li className="mb-4">
                  <Link
                    className=" text-lg font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-lg font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xl underline font-semibold uppercase text-black-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-lg font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-lg font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
