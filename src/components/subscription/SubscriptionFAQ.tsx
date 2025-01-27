import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the refundable deposit work?",
    answer: "A refundable deposit of $500 is required for Premium and Elite plans. This deposit is fully refundable upon plan cancellation, provided the vehicle is returned in good condition and there are no outstanding charges.",
  },
  {
    question: "What is included in the Premium Take-Home Plan?",
    answer: "The Premium Take-Home Plan includes a dedicated vehicle you can keep at home, unlimited rides, free public charging, 24/7 priority support, and access to premium app features. You'll also get VIP lounge access at Unity Link hubs.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle. Upgrades can be processed immediately, while downgrades require a 30-day notice.",
  },
  {
    question: "What happens if I need maintenance or repairs?",
    answer: "All plans include maintenance coverage. Premium and Elite members receive priority service with a replacement vehicle provided during repairs. Base plan members can schedule maintenance at any Unity Fleet service center.",
  },
];

export const SubscriptionFAQ = () => {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our subscription plans
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card">
              <AccordionTrigger className="text-left px-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};