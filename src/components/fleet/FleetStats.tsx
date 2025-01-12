import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', miles: 65 },
  { name: 'Tue', miles: 59 },
  { name: 'Wed', miles: 80 },
  { name: 'Thu', miles: 81 },
  { name: 'Fri', miles: 56 },
  { name: 'Sat', miles: 55 },
  { name: 'Sun', miles: 40 },
];

export const FleetStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="miles" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};