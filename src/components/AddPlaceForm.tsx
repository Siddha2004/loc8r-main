import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface PlaceFormData {
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
}

interface AddPlaceFormProps {
  onSubmit: (data: Omit<PlaceFormData, '_id'>) => void;
  onCancel: () => void;
}

const AddPlaceForm = ({ onSubmit, onCancel }: AddPlaceFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PlaceFormData>({
    name: '',
    address: '',
    rating: 0,
    facilities: [],
    openingTimes: [{ days: 'Mon-Fri', opening: '09:00', closing: '17:00', closed: false }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, facility]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        facilities: prev.facilities.filter(f => f !== facility)
      }));
    }
  };

  const handleOpeningTimeChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => {
      const newTimes = [...prev.openingTimes];
      newTimes[index] = { ...newTimes[index], [field]: value };
      return { ...prev, openingTimes: newTimes };
    });
  };

  const addOpeningTime = () => {
    setFormData(prev => ({
      ...prev,
      openingTimes: [...prev.openingTimes, { days: '', opening: '', closing: '', closed: false }]
    }));
  };

  const removeOpeningTime = (index: number) => {
    if (formData.openingTimes.length > 1) {
      setFormData(prev => {
        const newTimes = [...prev.openingTimes];
        newTimes.splice(index, 1);
        return { ...prev, openingTimes: newTimes };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Place name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.address.trim()) {
      toast({
        title: "Validation Error",
        description: "Address is required",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  const availableFacilities = ['WiFi', 'Coffee', 'Parking', 'Phone'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Place Name *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="rating">Rating (0-5)</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Facilities</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {availableFacilities.map(facility => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={facility}
                checked={formData.facilities.includes(facility)}
                onCheckedChange={(checked) => handleFacilityChange(facility, !!checked)}
              />
              <Label htmlFor={facility}>{facility}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Opening Times</Label>
        {formData.openingTimes.map((time, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-3">
              <Input
                placeholder="Days"
                value={time.days}
                onChange={(e) => handleOpeningTimeChange(index, 'days', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input
                type="time"
                value={time.opening}
                onChange={(e) => handleOpeningTimeChange(index, 'opening', e.target.value)}
                disabled={time.closed}
              />
            </div>
            <div className="col-span-3">
              <Input
                type="time"
                value={time.closing}
                onChange={(e) => handleOpeningTimeChange(index, 'closing', e.target.value)}
                disabled={time.closed}
              />
            </div>
            <div className="col-span-2 flex items-center">
              <Checkbox
                checked={time.closed}
                onCheckedChange={(checked) => handleOpeningTimeChange(index, 'closed', !!checked)}
              />
              <Label className="ml-1">Closed</Label>
            </div>
            <div className="col-span-1">
              {formData.openingTimes.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeOpeningTime(index)}
                >
                  X
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" className="mt-2" onClick={addOpeningTime}>
          Add Time Slot
        </Button>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Place
        </Button>
      </div>
    </form>
  );
};

export default AddPlaceForm;