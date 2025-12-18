import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-[#0f1f3d] text-[#ffffff] p-10">
      <nav>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">

          <span className="text-[#1e40af]">Contest </span>
          <span className="text-[#60a5fa]">Hub</span>
        </h1>
        <p className='w-65'>Connecting taste explorers with hidden gems, authentic bites, and real reviews. From street stalls to cozy kitchens, we celebrate every local flavor. Join the community. Share your plate. Discover what’s delicious nearby.</p>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaXTwitter size={23} />
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>

  );
};

export default Footer;