import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const SubscriptionFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-center space-y-8 pt-8 border-t border-white/10"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold">Ready to Get Started?</h3>
        <p className="text-muted-foreground">
          Join Unity Fleet today and be part of the sustainable transportation revolution
        </p>
        <Button 
          className="bg-rental-blue hover:bg-rental-blue/90 text-white"
          size="lg"
        >
          Contact Sales
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <a href="#" className="hover:text-rental-blue transition-colors">
          Terms & Conditions
        </a>
        <span>•</span>
        <a href="#" className="hover:text-rental-blue transition-colors">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="#" className="hover:text-rental-blue transition-colors flex items-center gap-1">
          Eco-Initiative <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Unity Fleet. All rights reserved.
      </p>
    </motion.footer>
  );
};