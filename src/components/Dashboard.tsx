import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Fish, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockData = {
  totalEels: 1247,
  recentObservations: 89,
  tankSystems: 3,
  monthlyTrend: 15.2
};

const sizeDistributionData = [
  { category: 'Small (5-7cm)', count: 245, color: 'bg-blue-500' },
  { category: 'Medium (7-9cm)', count: 378, color: 'bg-green-500' },
  { category: 'Large (9-11cm)', count: 456, color: 'bg-yellow-500' },
  { category: 'Extra Large (11cm+)', count: 168, color: 'bg-red-500' }
];

const monthlyData = [
  { month: 'Jan', count: 85 },
  { month: 'Feb', count: 92 },
  { month: 'Mar', count: 78 },
  { month: 'Apr', count: 105 },
  { month: 'May', count: 118 },
  { month: 'Jun', count: 134 }
];

const recentObservations = [
  { id: 1, tank: 'Tank A', category: 'Medium', size: '8.2cm', condition: 'Healthy', date: '2025-01-03' },
  { id: 2, tank: 'Tank B', category: 'Small', size: '6.5cm', condition: 'Active', date: '2025-01-03' },
  { id: 3, tank: 'Tank C', category: 'Large', size: '10.1cm', condition: 'Feeding Well', date: '2025-01-02' },
  { id: 4, tank: 'Tank A', category: 'Extra Large', size: '11.8cm', condition: 'Healthy', date: '2025-01-02' },
  { id: 5, tank: 'Tank B', category: 'Medium', size: '7.9cm', condition: 'Active', date: '2025-01-01' }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Glass Eels</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalEels.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all tanks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Observations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.recentObservations}</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tank Systems</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.tankSystems}</div>
            <p className="text-xs text-muted-foreground">
              Active monitoring
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockData.monthlyTrend}%</div>
            <p className="text-xs text-muted-foreground">
              vs previous month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Size Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Glass Eel Size Distribution</CardTitle>
            <CardDescription>Current population by size category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sizeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth Monitoring</CardTitle>
            <CardDescription>Observations recorded over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Observations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Glass Eel Observations</CardTitle>
          <CardDescription>Latest monitoring entries from tank systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentObservations.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Fish className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{entry.tank}</p>
                    <p className="text-sm text-muted-foreground">Size: {entry.size} • {entry.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    entry.category === 'Extra Large' ? 'destructive' :
                    entry.category === 'Large' ? 'default' :
                    entry.category === 'Medium' ? 'secondary' : 'outline'
                  }>
                    {entry.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}