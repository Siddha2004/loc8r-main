import React from 'react';
import { MapPin, Star, Clock, Wifi, Coffee, Car, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetails = ({ place, onClose }: PlaceDetailsProps) => {
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
    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <CardHeader className="relative">
        <CardTitle className="text-2xl">{place.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center bg-primary/10 px-3 py-2 rounded mt-2 w-fit">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-bold text-lg">{place.rating || 'N/A'}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start">
          <MapPin className="w-6 h-6 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-lg">{place.address}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-muted-foreground">
              {formatOpeningTimes(place.openingTimes)}
            </p>
          </div>
        </div>
        
        {place.facilities && place.facilities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {place.facilities.map((facility, index) => (
                <span 
                  key={index} 
                  className="flex items-center bg-secondary px-3 py-2 rounded"
                >
                  {getFacilityIcon(facility)}
                  <span className="ml-2">{facility}</span>
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;