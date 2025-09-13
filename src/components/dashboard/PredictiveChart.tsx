import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, Brain, Calendar } from "lucide-react";

// Historical data with predictions
const data = [
  { month: "Sep", actual: 980, predicted: null, type: "historical" },
  { month: "Oct", actual: 1150, predicted: null, type: "historical" },
  { month: "Nov", actual: 890, predicted: null, type: "historical" },
  { month: "Dec", actual: 1320, predicted: null, type: "historical" },
  { month: "Jan", actual: 1180, predicted: null, type: "current" },
  { month: "Feb", actual: null, predicted: 1285, type: "predicted", confidence: 0.89 },
  { month: "Mar", actual: null, predicted: 1340, type: "predicted", confidence: 0.82 },
  { month: "Apr", actual: null, predicted: 1210, type: "predicted", confidence: 0.75 },
  { month: "May", actual: null, predicted: 1390, type: "predicted", confidence: 0.68 },
];

const insights = [
  {
    label: "Trend Direction",
    value: "Increasing",
    change: "+8.2%",
    color: "text-warning"
  },
  {
    label: "Avg. Monthly",
    value: "$1,245",
    change: "vs $1,150 target",
    color: "text-muted-foreground"
  },
  {
    label: "Prediction Accuracy",
    value: "89%",
    change: "High confidence",
    color: "text-success"
  }
];

export function PredictiveChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm mb-2">{label}</p>
          {data.actual && (
            <p className="text-sm text-primary">
              Actual: ${data.actual}
            </p>
          )}
          {data.predicted && (
            <div className="space-y-1">
              <p className="text-sm text-warning">
                Predicted: ${data.predicted}
              </p>
              <p className="text-xs text-muted-foreground">
                Confidence: {(data.confidence * 100).toFixed(0)}%
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Spending Forecast
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              4 months ahead
            </Badge>
            <Badge variant="secondary" className="text-xs">
              89% accuracy
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Current month separator */}
              <ReferenceLine 
                x="Jan" 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="2 2"
                label={{ value: "Current", position: "top" }}
              />
              
              {/* Historical data line */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                connectNulls={false}
              />
              
              {/* Predicted data line */}
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--warning))', r: 3 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* AI Insights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            {insights.map((insight, index) => (
              <div key={index} className="text-center space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  {insight.label}
                </p>
                <p className="text-lg font-bold">
                  {insight.value}
                </p>
                <p className={`text-xs ${insight.color} flex items-center justify-center gap-1`}>
                  {insight.change.includes('+') && <TrendingUp className="h-3 w-3" />}
                  {insight.change}
                </p>
              </div>
            ))}
          </div>
          
          {/* Prediction Factors */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Prediction Factors
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">Historical trends</Badge>
              <Badge variant="outline" className="text-xs">Seasonal patterns</Badge>
              <Badge variant="outline" className="text-xs">Category spending</Badge>
              <Badge variant="outline" className="text-xs">Income stability</Badge>
              <Badge variant="outline" className="text-xs">Student lifestyle</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}