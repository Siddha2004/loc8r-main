// Update this page (the content is just a fallback if you fail to update the page)

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Loc8r App</h1>
        <p className="text-xl text-gray-600 mb-6">
          Find places near you with our location-based application
        </p>
        <Link to="/loc8r">
          <Button size="lg" className="text-lg px-8 py-6">
            <MapPin className="mr-2 h-6 w-6" />
            Open Loc8r
          </Button>
        </Link>
      </div>
      
      <div className="max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Loc8r</h2>
        <p className="text-gray-700 mb-4">
          Loc8r is a location-based application that helps you discover places near your current location. 
          Whether you're looking for a coffee shop, restaurant, or any other venue, Loc8r makes it easy to 
          find what you need based on your proximity.
        </p>
        <h3 className="text-xl font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Find places near your current location</li>
          <li>Filter by distance</li>
          <li>View place details including ratings and facilities</li>
          <li>Add new places to the database</li>
        </ul>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;