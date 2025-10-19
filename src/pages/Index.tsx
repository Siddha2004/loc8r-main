// Update this page (the content is just a fallback if you fail to update the page)

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Compass, Search, Map, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-indigo-800">Welcome to Loc8r</h1>
        <p className="text-2xl text-gray-700 mb-8 max-w-2xl">
          Discover amazing places near you with our location-based application
        </p>
        <Link to="/loc8r">
          <Button size="lg" className="text-xl px-10 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
            <MapPin className="mr-3 h-7 w-7" />
            Explore Nearby Places
          </Button>
        </Link>
      </div>
      
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-8 mb-12 border border-indigo-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">How Loc8r Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
            <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Compass className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Discover</h3>
            <p className="text-gray-700">
              Find interesting places near your current location
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-200">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">Search</h3>
            <p className="text-gray-700">
              Filter by distance, ratings, and facilities
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200">
            <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-800">Rate</h3>
            <p className="text-gray-700">
              Add new places and share your experiences
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">About Loc8r</h2>
        <p className="mb-4">
          Loc8r is a location-based application that helps you discover places near your current location. 
          Whether you're looking for a coffee shop, restaurant, or any other venue, Loc8r makes it easy to 
          find what you need based on your proximity.
        </p>
        <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc list-inside space-y-1">
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