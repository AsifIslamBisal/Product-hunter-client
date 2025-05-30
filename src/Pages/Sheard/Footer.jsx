import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-gray-300 py-10 px-4">              
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* <!-- Brand --> */}
    <div>
      <h1 className="text-2xl font-bold text-white mb-3">ProductVerse</h1>
      <p className="text-sm">Your one-stop platform for amazing tech products. Submit, upvote, and discover the future.</p>
    </div>

    {/* <!-- Products --> */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Products</h3>
      <ul className="space-y-1">
        <li><a href="#" className="hover:underline">Trending</a></li>
        <li><a href="#" className="hover:underline">New</a></li>
        <li><a href="#" className="hover:underline">Submit Product</a></li>
      </ul>
    </div>

    {/* <!-- Company --> */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
      <ul className="space-y-1">
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Blog</a></li>
        <li><a href="#" className="hover:underline">Careers</a></li>
      </ul>
    </div>

    {/* <!-- Support --> */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
      <ul className="space-y-1">
        <li><a href="#" className="hover:underline">Help Center</a></li>
        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        <li><a href="#" className="hover:underline">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  {/* <!-- Bottom bar --> */}
  <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
    <p className="text-sm">&copy; 2025 ProductVerse. All rights reserved.</p>
    <div className="flex space-x-4 mt-4 md:mt-0">
      <a href="#" aria-label="Facebook" className="hover:text-white">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.3c0-2.4 1.4-3.8 3.5-3.8 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
        </svg>
      </a>
      <a href="#" aria-label="Twitter" className="hover:text-white">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 2a9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016.5 2c-2.5 0-4.5 2-4.5 4.5 0 .36.04.71.12 1.04C8.28 7.4 5.1 5.6 3 3.1c-.4.7-.6 1.5-.6 2.3 0 1.6.8 3 2.1 3.8a4.49 4.49 0 01-2-.55v.06c0 2.3 1.6 4.2 3.8 4.7a4.52 4.52 0 01-2 .07c.6 1.9 2.3 3.2 4.3 3.3a9.06 9.06 0 01-5.6 1.9c-.37 0-.73-.02-1.1-.07a12.8 12.8 0 006.9 2" />
        </svg>
      </a>
      <a href="#" aria-label="LinkedIn" className="hover:text-white">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.3h.1c.7-1.3 2.3-2.6 4.7-2.6 5 0 5.9 3.3 5.9 7.6V24h-5v-7.6c0-1.8-.04-4-2.4-4s-2.7 1.9-2.7 3.9V24h-5V8z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>

        </div>
    );
};

export default Footer;