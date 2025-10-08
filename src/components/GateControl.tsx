import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  DoorOpen, 
  DoorClosed, 
  Settings, 
  Fish, 
  Ruler, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function GateControl() {
  const [gateOpen, setGateOpen] = useState(false);
  const [sizeThreshold, setSizeThreshold] = useState([7.5]); // cm
  const [autoMode, setAutoMode] = useState(false);
  const [lastOperation, setLastOperation] = useState<string | null>(null);

  // Mock data for eels that would pass through
  const mockEels = [
    { id: 1, size: 6.2, tank: 'Tank A', status: 'ready' },
    { id: 2, size: 7.1, tank: 'Tank B', status: 'ready' },
    { id: 3, size: 7.8, tank: 'Tank A', status: 'ready' },
    { id: 4, size: 8.2, tank: 'Tank C', status: 'ready' },
    { id: 5, size: 9.1, tank: 'Tank B', status: 'ready' },
    { id: 6, size: 6.8, tank: 'Tank A', status: 'ready' },
  ];

  const eligibleEels = mockEels.filter(eel => eel.size <= sizeThreshold[0]);
  const blockedEels = mockEels.filter(eel => eel.size > sizeThreshold[0]);

  const handleGateToggle = () => {
    const newState = !gateOpen;
    setGateOpen(newState);
    
    if (newState) {
      setLastOperation(`Gate opened - allowing eels ≤${sizeThreshold[0]}cm to pass`);
      toast.success(`Gate opened for eels ≤${sizeThreshold[0]}cm`, {
        description: `${eligibleEels.length} eels can now pass through`
      });
    } else {
      setLastOperation('Gate closed - no eel passage');
      toast.info('Gate closed', {
        description: 'Eel passage has been stopped'
      });
    }
  };

  const handleEmergencyStop = () => {
    setGateOpen(false);
    setAutoMode(false);
    setLastOperation('Emergency stop activated');
    toast.error('Emergency stop activated', {
      description: 'Gate closed immediately'
    });
  };

  return (
    <div className="space-y-6">
      {/* Gate Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gate Status</CardTitle>
            {gateOpen ? <DoorOpen className="h-4 w-4 text-green-600" /> : <DoorClosed className="h-4 w-4 text-red-600" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gateOpen ? 'OPEN' : 'CLOSED'}
            </div>
            <p className="text-xs text-muted-foreground">
              {gateOpen ? 'Allowing passage' : 'Blocking passage'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Size Threshold</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sizeThreshold[0]}cm</div>
            <p className="text-xs text-muted-foreground">
              Maximum size allowed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eligible Eels</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eligibleEels.length}</div>
            <p className="text-xs text-muted-foreground">
              Can pass through gate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gate Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gate Controls
          </CardTitle>
          <CardDescription>
            Control the size-selective gate system for eel separation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Size Threshold Control */}
          <div className="space-y-4">
            <Label>Size Threshold (cm)</Label>
            <div className="px-4">
              <Slider
                value={sizeThreshold}
                onValueChange={setSizeThreshold}
                max={12}
                min={5}
                step={0.1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5cm</span>
              <span>Current: {sizeThreshold[0]}cm</span>
              <span>12cm</span>
            </div>
          </div>

          <Separator />

          {/* Auto Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Mode</Label>
              <p className="text-sm text-muted-foreground">
                Automatically open gate when eels are detected
              </p>
            </div>
            <Switch
              checked={autoMode}
              onCheckedChange={setAutoMode}
            />
          </div>

          <Separator />

          {/* Gate Control Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleGateToggle}
              variant={gateOpen ? "destructive" : "default"}
              className="flex-1"
            >
              {gateOpen ? (
                <>
                  <DoorClosed className="mr-2 h-4 w-4" />
                  Close Gate
                </>
              ) : (
                <>
                  <DoorOpen className="mr-2 h-4 w-4" />
                  Open Gate
                </>
              )}
            </Button>
            
            <Button
              onClick={handleEmergencyStop}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Emergency Stop
            </Button>
          </div>

          {lastOperation && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Last Operation: {lastOperation}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Eel Classification Preview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Eels That Can Pass */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Eels That Can Pass
            </CardTitle>
            <CardDescription>
              Size ≤ {sizeThreshold[0]}cm - {eligibleEels.length} eels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eligibleEels.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No eels match the current size criteria
                </p>
              ) : (
                eligibleEels.map((eel) => (
                  <div key={eel.id} className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950">
                    <div className="flex items-center gap-3">
                      <Fish className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Eel #{eel.id}</p>
                        <p className="text-sm text-muted-foreground">{eel.tank}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {eel.size}cm
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Eels That Cannot Pass */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Eels That Cannot Pass
            </CardTitle>
            <CardDescription>
              Size &gt; {sizeThreshold[0]}cm - {blockedEels.length} eels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blockedEels.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All eels can pass through the current gate setting
                </p>
              ) : (
                blockedEels.map((eel) => (
                  <div key={eel.id} className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-950">
                    <div className="flex items-center gap-3">
                      <Fish className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="font-medium">Eel #{eel.id}</p>
                        <p className="text-sm text-muted-foreground">{eel.tank}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      {eel.size}cm
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}