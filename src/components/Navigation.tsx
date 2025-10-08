import { Button } from './ui/button';
import { Home, Plus, BarChart3, FileText, Settings, DoorOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'gate', label: 'Gate Control', icon: DoorOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'data', label: 'Data Export', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white border-b border-border">
      <div className="flex overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className="flex-shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}