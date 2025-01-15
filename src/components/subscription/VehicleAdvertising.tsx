import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const VehicleAdvertising = () => {
  const [adBudget, setAdBudget] = useState(300);
  const [brandBudget, setBrandBudget] = useState(300);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-ev-dark to-ev-light bg-clip-text text-transparent">
          Vehicle Advertising
        </h2>
        <p className="text-gray-600">
          Promote your brand on our premium Tesla fleet
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/c650f54f-2783-48c7-a17b-7c1d8d9bba88.png"
              alt="Digital Ad Preview"
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Digital Advertising</h3>
              <p className="text-sm text-gray-600">
                Upload your digital ads to display on our Tesla Model Y fleet
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload Ad Design</Label>
              <Input type="file" accept="image/*" className="cursor-pointer" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Ad Budget</Label>
                <span className="text-ev-dark font-semibold">${adBudget}</span>
              </div>
              <Slider
                value={[adBudget]}
                onValueChange={(value) => setAdBudget(value[0])}
                max={1000}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Estimated daily impressions: {(adBudget * 100).toLocaleString()}
              </p>
            </div>

            <Button className="w-full bg-ev-DEFAULT hover:bg-ev-dark">
              Submit Ad Request
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-ev-light to-ev-dark">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                Custom Wrap Preview
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Brand Wrapping</h3>
              <p className="text-sm text-gray-600">
                Custom vehicle wraps for extended brand visibility
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload Wrap Design</Label>
              <Input type="file" accept="image/*" className="cursor-pointer" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Wrapping Budget</Label>
                <span className="text-ev-dark font-semibold">${brandBudget}</span>
              </div>
              <Slider
                value={[brandBudget]}
                onValueChange={(value) => setBrandBudget(value[0])}
                max={3000}
                step={300}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Coverage: {Math.round((brandBudget / 3000) * 100)}% vehicle wrap
              </p>
            </div>

            <Button variant="outline" className="w-full border-ev-DEFAULT text-ev-dark hover:bg-ev-light">
              Get Wrapping Quote
            </Button>
          </div>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-600 mt-8">
        <p>
          All advertising requests are subject to review. Contact our team for custom campaigns and enterprise solutions.
        </p>
      </div>
    </div>
  );
};