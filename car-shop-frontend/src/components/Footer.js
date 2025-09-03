// src/components/Footer.jsx

import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialIcon = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary-red transition-colors duration-300">
    {icon}
  </a>
);

const Footer = () => {
  // Define footer links with their corresponding routes for the Link component
  const footerSections = [
    {
      title: 'Informations',
      links: [
        { name: 'About Us', to: '/about' },
        { name: 'Contact Us', to: '/contact' },
        // These can be linked to future pages
        { name: 'Privacy Policy', to: '/privacy' },
        { name: 'Terms of Use', to: '/terms' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'FAQs', to: '/faq' },
        { name: 'Delivery Information', to: '/delivery' },
        { name: 'Returns', to: '/returns' },
      ],
    },
    {
      title: 'My Account',
      links: [
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'My Cart', to: '/cart' },
        { name: 'Login', to: '/login' },
        { name: 'Register', to: '/register' },
      ],
    },
  ];

  return (
    // Correct dark background color class applied here
    <footer className="bg-dark-card text-light-text pt-16 pb-8"> 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="md:col-span-2 lg:col-span-1">
            <h1 className="text-4xl font-black mb-4">
              Pyramid<span className="text-primary-red">Cars</span>
            </h1>
            <p className="text-secondary-text mb-6">
              Your trusted partner for high-quality vehicles. We are committed to your satisfaction.
            </p>
            <div className="flex space-x-5 text-2xl">
              <SocialIcon icon={<FaFacebookF />} href="#" />
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
              <SocialIcon icon={<FaLinkedinIn />} href="#" />
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {/* Use the Link component for internal navigation */}
                    <Link to={link.to} className="text-secondary-text hover:text-light-text hover:pl-2 transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-secondary-text">
          <p>&copy; {new Date().getFullYear()} Pyramid Cars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;