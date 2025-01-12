import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Unity Fleet</h3>
            <p className="text-white/80">
              Revolutionizing mobility through sustainable electric vehicle subscriptions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-secondary"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-secondary"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-secondary"><Youtube className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Unity Fleet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};