import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden bg-black text-gray-300 w-full min-h-min py-10 border-t-4 border-orange-500">
      <div className="relative z-10 mx-auto max-w-none w-full px-6 lg:px-12">
        <div className="-m-6 flex flex-wrap">
          
          {/* Left Side: Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-6 flex items-center">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-500">&copy; 2024 DevUI. All Rights Reserved.</p>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-sm font-semibold uppercase text-orange-400 mb-5">Company</h3>
              <ul>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Features</Link>
                </li>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Pricing</Link>
                </li>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Affiliate Program</Link>
                </li>
                <li>
                  <Link className="hover:text-orange-500 transition" to="/">Press Kit</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-sm font-semibold uppercase text-orange-400 mb-5">Support</h3>
              <ul>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Account</Link>
                </li>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Help</Link>
                </li>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Contact Us</Link>
                </li>
                <li>
                  <Link className="hover:text-orange-500 transition" to="/">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="text-sm font-semibold uppercase text-orange-400 mb-5">Legals</h3>
              <ul>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Terms & Conditions</Link>
                </li>
                <li className="mb-3">
                  <Link className="hover:text-orange-500 transition" to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="hover:text-orange-500 transition" to="/">Licensing</Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Footer;
