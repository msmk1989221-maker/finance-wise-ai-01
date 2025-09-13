import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", spending: 980, budget: 1200 },
  { month: "Feb", spending: 1150, budget: 1200 },
  { month: "Mar", spending: 890, budget: 1200 },
  { month: "Apr", spending: 1320, budget: 1200 },
  { month: "May", spending: 1180, budget: 1200 },
  { month: "Jun", spending: 1235, budget: 1200 },
];

export function SpendingChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-muted-foreground"
              fontSize={12}
            />
            <YAxis 
              className="text-muted-foreground"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="spending" 
              stroke="hsl(var(--expense))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--expense))', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="budget" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'hsl(var(--muted-foreground))', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}