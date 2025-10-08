import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, Download, Filter, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function DataExport() {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('last30');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Mock export process
    setTimeout(() => {
      toast.success(`Data exported successfully as ${exportFormat.toUpperCase()}`);
      setIsExporting(false);
    }, 2000);
  };

  const exportStats = {
    totalRecords: 1247,
    filteredRecords: 89,
    dateRange: 'Last 30 days',
    locations: 5
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Export
          </CardTitle>
          <CardDescription>
            Export eel classification data for analysis and reporting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Export Filters
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7">Last 7 days</SelectItem>
                    <SelectItem value="last30">Last 30 days</SelectItem>
                    <SelectItem value="last90">Last 90 days</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="format">Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location Filter</Label>
                <Input
                  id="location"
                  placeholder="Filter by location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category Filter</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="juvenile">Juvenile</SelectItem>
                    <SelectItem value="sub-adult">Sub-adult</SelectItem>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="large-adult">Large Adult</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Export Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export Preview
            </h3>
            
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{exportStats.totalRecords}</div>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{exportStats.filteredRecords}</div>
                  <p className="text-xs text-muted-foreground">Filtered Records</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{exportStats.locations}</div>
                  <p className="text-xs text-muted-foreground">Locations</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm font-bold">{exportStats.dateRange}</div>
                  <p className="text-xs text-muted-foreground">Date Range</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Export Button */}
          <Button 
            onClick={handleExport} 
            className="w-full"
            disabled={isExporting}
          >
            {isExporting ? (
              'Preparing Export...'
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {exportStats.filteredRecords} Records as {exportFormat.toUpperCase()}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Data Fields Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data Fields</CardTitle>
          <CardDescription>
            Fields included in the exported data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            <ul className="space-y-1 text-sm">
              <li>• Record ID</li>
              <li>• Date & Time</li>
              <li>• Location Name</li>
              <li>• GPS Coordinates</li>
              <li>• Length (cm)</li>
              <li>• Weight (g)</li>
            </ul>
            <ul className="space-y-1 text-sm">
              <li>• Size Category</li>
              <li>• Habitat Type</li>
              <li>• Researcher ID</li>
              <li>• Notes</li>
              <li>• Classification Date</li>
              <li>• Data Quality Score</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}