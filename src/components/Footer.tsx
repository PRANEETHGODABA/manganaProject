import React from 'react';
import { MapPin, Phone, Mail, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Manogna Piragold India Pvt. Ltd.</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Quality is our mantra, leading manufacturer of 
              premium rubber products, with over two decades of excellence in quality and innovation.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Industrial Area, Sector 12, Manufacturing District, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">info@manognapiragold.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '#legacy' },
                { name: 'Our Products', href: '#manufacturing' },
                { name: 'Why Choose Us', href: '#why-us' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div>
                <p className="text-teal-400 font-medium">Business Hours</p>
                <p className="text-gray-300 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-300 text-sm">Saturday: 9:00 AM - 2:00 PM</p>
              </div>
              
              <div>
                <p className="text-teal-400 font-medium">Follow Us</p>
                <div className="flex gap-3 mt-2">
                  <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-300">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Manogna Piragold India Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;