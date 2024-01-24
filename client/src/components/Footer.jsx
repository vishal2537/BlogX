import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";


const Footer = () => {
  return (
      <div className=" flex flex-col md:flex-row w-full py-8 items-center justify-between text-[14px] text-gray-800 dark:text-gray-400" >
        {/* <Divider/> */}
        <p>© 2024 BlogX. All rights reserved.</p>
        <dir className="flex gap-5">
          <Link to="/contact">Contact</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/" target="_blank">
            Privacy Policy
          </Link>
        </dir>
        <div className="flex gap-2 text-[20px] md:hidden lg:flex">
          <Link to="/" className="text-red-600">
            <FaYoutube class="hover:scale-150 transition duration-500 cursor-pointer" />
          </Link>
          <Link to="/" className="text-blue-600">
            <FaFacebook class="hover:scale-150 transition duration-500 cursor-pointer" />
          </Link>
          <Link to="/" className="text-rose-600">
            <FaInstagram class="hover:scale-150 transition duration-500 cursor-pointer" />
          </Link>
          <Link to="/" className="text-blue-500">
            <FaTwitterSquare class="hover:scale-150 transition duration-500 cursor-pointer" />
          </Link>
        </div>
      </div>
  );
};

export default Footer;
