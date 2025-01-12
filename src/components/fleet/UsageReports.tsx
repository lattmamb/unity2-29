import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', energy: 400, cost: 240 },
  { month: 'Feb', energy: 300, cost: 139 },
  { month: 'Mar', energy: 200, cost: 980 },
  { month: 'Apr', energy: 278, cost: 390 },
  { month: 'May', energy: 189, cost: 480 },
];

export const UsageReports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Consumption & Costs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="energy" fill="#2563eb" name="Energy (kWh)" />
              <Bar yAxisId="right" dataKey="cost" fill="#16a34a" name="Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};