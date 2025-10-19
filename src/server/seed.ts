import mongoose from 'mongoose';
import { config } from 'dotenv';
import { Place } from './server';

config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loc8r');

const samplePlaces = [
  {
    name: "Starbucks Downtown",
    address: "123 Main St, City Center",
    rating: 4.2,
    facilities: ["WiFi", "Coffee", "Parking"],
    coords: {
      type: "Point",
      coordinates: [-73.9857, 40.7484] // Near Times Square, NYC
    },
    openingTimes: [
      { days: "Mon-Fri", opening: "06:00", closing: "22:00", closed: false },
      { days: "Sat-Sun", opening: "07:00", closing: "23:00", closed: false }
    ]
  },
  {
    name: "Central Park Cafe",
    address: "456 Park Ave, Central Park",
    rating: 4.7,
    facilities: ["WiFi", "Coffee", "Phone"],
    coords: {
      type: "Point",
      coordinates: [-73.9654, 40.7829] // Central Park, NYC
    },
    openingTimes: [
      { days: "Mon-Sun", opening: "08:00", closing: "20:00", closed: false }
    ]
  },
  {
    name: "TechHub Co-working",
    address: "789 Innovation Blvd, Tech District",
    rating: 4.5,
    facilities: ["WiFi", "Coffee", "Parking", "Phone"],
    coords: {
      type: "Point",
      coordinates: [-73.9712, 40.7589] // Near Empire State Building, NYC
    },
    openingTimes: [
      { days: "Mon-Fri", opening: "07:00", closing: "21:00", closed: false },
      { days: "Sat", opening: "09:00", closing: "18:00", closed: false },
      { days: "Sun", closed: true }
    ]
  }
];

const seedDB = async () => {
  try {
    // Clear existing places
    await Place.deleteMany({});
    console.log('Cleared existing places');
    
    // Add sample places
    await Place.insertMany(samplePlaces);
    console.log('Sample places added');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();