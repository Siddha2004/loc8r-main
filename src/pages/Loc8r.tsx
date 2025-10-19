import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Wifi, Coffee, Car, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import AddPlaceForm from '@/components/AddPlaceForm';
import PlaceDetails from '@/components/PlaceDetails';
import { fetchPlaces, createPlace } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Place {
  _id: string;
  name: string;
  address: string;
  rating: number;
  facilities: string[];
  openingTimes: {
    days: string;
    opening: string;
    closing: string;
    closed: boolean;
  }[];
  coords: {
    coordinates: [number, number];
  };
}

const Loc8r = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(1000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (err) => {
          setError('Unable to get your location. Please enable location services.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Fetch places when location is available
  useEffect(() => {
    if (userLocation) {
      fetchPlacesData();
    }
  }, [userLocation, searchRadius]);

  const fetchPlacesData = async () => {
    if (!userLocation) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchPlaces(userLocation[0], userLocation[1], searchRadius);
      setPlaces(data);
    } catch (err) {
      setError('Failed to load places. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlace = async (placeData: Omit<Place, '_id'>) => {
    try {
      const newPlaceData = {
        ...placeData,
        coords: {
          type: 'Point',
          coordinates: userLocation || [0, 0]
        }
      };
      
      const newPlace = await createPlace(newPlaceData);
      setPlaces(prev => [newPlace, ...prev]);
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Place added successfully!",
      });
    } catch (err) {
      console.error('Error adding place:', err);
      toast({
        title: "Error",
        description: "Failed to add place. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAddPlace = () => {
    setIsAddDialogOpen(false);
  };

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const closePlaceDetails = () => {
    setSelectedPlace(null);
  };

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatOpeningTimes = (times: Place['openingTimes']) => {
    if (!times || times.length === 0) return 'Opening times not available';
    
    return times.map(time => 
      `${time.days}: ${time.closed ? 'Closed' : `${time.opening} - ${time.closing}`}`
    ).join(', ');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Loc8r</h1>
          <p className="text-muted-foreground">Find places near you</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Label htmlFor="radius">Search Radius (m)</Label>
            <Input
              id="radius"
              type="number"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-32"
              min="100"
              max="10000"
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Place</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Place</DialogTitle>
              </DialogHeader>
              <AddPlaceForm onSubmit={handleAddPlace} onCancel={handleCancelAddPlace} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Card 
              key={place._id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePlaceClick(place)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{place.name}</span>
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-bold">{place.rating || 'N/A'}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{place.address}</p>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      {formatOpeningTimes(place.openingTimes)}
                    </p>
                  </div>
                  
                  {place.facilities && place.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {place.facilities.map((facility, index) => (
                        <span 
                          key={index} 
                          className="flex items-center bg-secondary px-2 py-1 rounded text-sm"
                        >
                          {getFacilityIcon(facility)}
                          <span className="ml-1">{facility}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {places.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No places found</h3>
          <p className="text-muted-foreground">
            Try increasing the search radius or add a new place
          </p>
        </div>
      )}

      {/* Place Details Modal/Drawer */}
      {selectedPlace && (
        isMobile ? (
          <Drawer open={!!selectedPlace} onOpenChange={(open) => !open && closePlaceDetails()}>
            <DrawerContent>
              <div className="p-4">
                <PlaceDetails place={selectedPlace} onClose={closePlaceDetails} />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={!!selectedPlace} onOpenChange={(open) => !open && closePlaceDetails()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <PlaceDetails place={selectedPlace} onClose={closePlaceDetails} />
            </DialogContent>
          </Dialog>
        )
      )}
    </div>
  );
};

export default Loc8r;