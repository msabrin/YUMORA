import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/YUMORA.png';

const Footer = () => {
  return (
    <footer className="mt-20 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Yumora Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-display font-bold text-gradient-gold">
                Yumora
              </span>
            </div>
            <p className="text-light/80 leading-relaxed">
              Where mystery meets elegance. Discover treasures that speak to your soul.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-primary">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-light/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-light/80 hover:text-primary transition-colors">
                Shop
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-primary">
              Stay Connected
            </h3>
            <p className="text-light/80">
              Subscribe to receive updates on new mysteries and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-l-full glass border-0 focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
              />
              <button className="px-6 py-2 bg-primary text-surface font-semibold rounded-r-full hover:shadow-glow transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-light/60 flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by Yumora</span>
          </p>
          <p className="text-light/60">
            © 2025 Yumora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
