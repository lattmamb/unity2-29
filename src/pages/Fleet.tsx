import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Fleet() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Fleet</h1>
        <p>Fleet management content coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}