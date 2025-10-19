import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loc8r');

// Place Schema
const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  facilities: [String],
  coords: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  openingTimes: [{
    days: String,
    opening: String,
    closing: String,
    closed: Boolean
  }]
});

const Place = mongoose.model('Place', placeSchema);

// Routes
app.get('/api/places', async (req, res) => {
  try {
    const { lng, lat, maxDistance } = req.query;
    
    if (!lng || !lat) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }
    
    const places = await Place.find({
      'coords.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: maxDistance ? parseFloat(maxDistance as string) : 10000
        }
      }
    });
    
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
});

app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching place', error });
  }
});

app.post('/api/places', async (req, res) => {
  try {
    const place = new Place(req.body);
    const savedPlace = await place.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(400).json({ message: 'Error creating place', error });
  }
});

app.put('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(400).json({ message: 'Error updating place', error });
  }
});

app.delete('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting place', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;