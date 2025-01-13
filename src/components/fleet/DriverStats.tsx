import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: '13', smoother: 10, safer: 65, cleaner: 95, onTime: 82 },
  { name: '14', smoother: 15, safer: 68, cleaner: 98, onTime: 85 },
  { name: '15', smoother: 12, safer: 62, cleaner: 97, onTime: 88 },
  { name: '16', smoother: 18, safer: 70, cleaner: 99, onTime: 86 },
  { name: '17', smoother: 14, safer: 66, cleaner: 96, onTime: 84 },
  { name: '18', smoother: 16, safer: 69, cleaner: 98, onTime: 87 },
  { name: '19', smoother: 13, safer: 64, cleaner: 97, onTime: 85 },
];

export const DriverStats = () => {
  return (
    <div className="space-y-6 mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Smoother"
          value="12.7%"
          change="+2.3%"
          color="rgb(45, 212, 191)"
        />
        <StatCard
          label="Safer"
          value="65.4%"
          change="+4.9%"
          color="rgb(56, 189, 248)"
        />
        <StatCard
          label="Cleaner"
          value="99.3%"
          change="+3.2%"
          color="rgb(168, 85, 247)"
        />
        <StatCard
          label="On Time"
          value="84.7%"
          change="+0.9%"
          color="rgb(251, 146, 60)"
        />
      </div>

      <Card className="p-4 bg-accent/10">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Line
              type="monotone"
              dataKey="smoother"
              stroke="rgb(45, 212, 191)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="safer"
              stroke="rgb(56, 189, 248)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cleaner"
              stroke="rgb(168, 85, 247)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="onTime"
              stroke="rgb(251, 146, 60)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

const StatCard = ({ label, value, change, color }: { 
  label: string;
  value: string;
  change: string;
  color: string;
}) => (
  <Card className="p-4 bg-accent/10">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold" style={{ color }}>{value}</div>
    <div className="text-sm text-eco">{change}</div>
  </Card>
);