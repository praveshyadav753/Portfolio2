import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react'; // Re-using icons from lucide-react

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-gray-400 py-8 px-4  ">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-6 md:space-y-0">
        {/* Copyright Information */}
        <p className="text-sm">
          &copy; {currentYear} Nancy Srivastava. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/NancySri453" // Replace with actual GitHub profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href="linkedin.com/in/nancy-srivastava-9742bb213" // Replace with actual LinkedIn profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:your.email@example.com" // Replace with actual email address
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Email Me"
          >
            <Mail size={24} />
          </a>
        </div>

        {/* Built With / Credits */}
        <p className="text-xs text-gray-500">
          Built with <span className="text-purple-400">React</span> & <span className="text-teal-400">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
