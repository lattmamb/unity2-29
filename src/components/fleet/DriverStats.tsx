import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 400 },
  { name: 'Sun', value: 300 },
];

export const DriverStats = () => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Weekly Distance (km)</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Average Speed" value="62 km/h" trend="+2.5%" />
        <StatCard title="Fuel Efficiency" value="8.2 L/100km" trend="-1.8%" />
        <StatCard title="Idle Time" value="45 min" trend="+5 min" trendDown />
        <StatCard title="Hard Brakes" value="2" trend="-1" trendDown />
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendDown 
}: { 
  title: string; 
  value: string; 
  trend: string;
  trendDown?: boolean;
}) => (
  <Card className="p-4">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <div className="mt-2 flex items-baseline justify-between">
      <span className="text-2xl font-bold">{value}</span>
      <span className={`text-sm ${trendDown ? 'text-destructive' : 'text-eco'}`}>
        {trend}
      </span>
    </div>
  </Card>
);