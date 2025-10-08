import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { Fish, MapPin, Ruler, Calendar } from 'lucide-react';

interface FormData {
  location: string;
  coordinates: string;
  length: string;
  weight: string;
  category: string;
  habitat: string;
  notes: string;
  researcherId: string;
  date: string;
}

export function EelClassificationForm() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    coordinates: '',
    length: '',
    weight: '',
    category: '',
    habitat: '',
    notes: '',
    researcherId: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCategoryFromLength = (length: number): string => {
    if (length < 30) return 'Juvenile';
    if (length < 50) return 'Sub-adult';
    if (length < 70) return 'Adult';
    return 'Large Adult';
  };

  const handleLengthChange = (value: string) => {
    handleInputChange('length', value);
    if (value && !isNaN(Number(value))) {
      const category = getCategoryFromLength(Number(value));
      handleInputChange('category', category);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      toast.success('Eel classification submitted successfully!');
      setFormData({
        location: '',
        coordinates: '',
        length: '',
        weight: '',
        category: '',
        habitat: '',
        notes: '',
        researcherId: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fish className="h-5 w-5" />
          New Eel Classification
        </CardTitle>
        <CardDescription>
          Record a new eel observation and classification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location Name</Label>
                <Input
                  id="location"
                  placeholder="e.g., River Thames, London"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordinates">GPS Coordinates</Label>
                <Input
                  id="coordinates"
                  placeholder="e.g., 51.5074, -0.1278"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange('coordinates', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Physical Measurements */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Physical Measurements
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="length">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.length}
                  onChange={(e) => handleLengthChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (g)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 250"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Fish className="h-4 w-4" />
              Classification
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Size Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Juvenile">Juvenile (&lt; 30cm)</SelectItem>
                    <SelectItem value="Sub-adult">Sub-adult (30-50cm)</SelectItem>
                    <SelectItem value="Adult">Adult (50-70cm)</SelectItem>
                    <SelectItem value="Large Adult">Large Adult (&gt; 70cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="habitat">Habitat Type</Label>
                <Select value={formData.habitat} onValueChange={(value) => handleInputChange('habitat', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select habitat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Freshwater">Freshwater</SelectItem>
                    <SelectItem value="Brackish">Brackish Water</SelectItem>
                    <SelectItem value="Marine">Marine</SelectItem>
                    <SelectItem value="Estuary">Estuary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Additional Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Observation Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="researcherId">Researcher ID</Label>
                <Input
                  id="researcherId"
                  placeholder="e.g., R001"
                  value={formData.researcherId}
                  onChange={(e) => handleInputChange('researcherId', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional observations, behavior notes, environmental conditions..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Classification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}