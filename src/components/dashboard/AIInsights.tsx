import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";
import { ExpenseAnalyzer, SpendingPrediction } from "@/lib/ai/expenseAnalyzer";
import { useEffect, useState } from "react";

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'achievement';
  title: string;
  description: string;
  confidence: number;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock transactions for AI analysis
const mockTransactions = [
  { id: '1', description: 'Starbucks Coffee', amount: 5.50, date: '2024-01-15', type: 'expense' as const, category: 'Food & Dining' },
  { id: '2', description: 'Uber Ride', amount: 12.00, date: '2024-01-14', type: 'expense' as const, category: 'Transportation' },
  { id: '3', description: 'Amazon Purchase', amount: 45.99, date: '2024-01-13', type: 'expense' as const, category: 'Shopping' },
  { id: '4', description: 'Textbook Store', amount: 120.00, date: '2024-01-12', type: 'expense' as const, category: 'Education' },
  { id: '5', description: 'Netflix Subscription', amount: 15.99, date: '2024-01-11', type: 'expense' as const, category: 'Entertainment' },
  { id: '6', description: 'Part-time Job', amount: 400.00, date: '2024-01-10', type: 'income' as const },
  { id: '7', description: 'McDonald\'s', amount: 8.50, date: '2024-01-09', type: 'expense' as const, category: 'Food & Dining' },
  { id: '8', description: 'Gas Station', amount: 35.00, date: '2024-01-08', type: 'expense' as const, category: 'Transportation' },
];

const budgets = {
  'Food & Dining': 150,
  'Transportation': 100,
  'Shopping': 200,
  'Education': 300,
  'Entertainment': 50,
};

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateInsights = async () => {
      setIsLoading(true);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const generatedInsights: AIInsight[] = [];

      // Generate spending predictions
      const foodPrediction = ExpenseAnalyzer.predictSpending(mockTransactions, 'Food & Dining');
      const transportPrediction = ExpenseAnalyzer.predictSpending(mockTransactions, 'Transportation');

      generatedInsights.push({
        id: 'food-prediction',
        type: 'prediction',
        title: 'Food Spending Forecast',
        description: `Predicted to spend $${foodPrediction.nextMonth} on food next month (${foodPrediction.trend} trend)`,
        confidence: foodPrediction.confidence,
        priority: foodPrediction.trend === 'increasing' ? 'high' : 'medium'
      });

      // Generate budget alerts
      const alerts = ExpenseAnalyzer.generateBudgetAlerts(mockTransactions, budgets);
      alerts.slice(0, 2).forEach(alert => {
        generatedInsights.push({
          id: alert.id,
          type: 'alert',
          title: `${alert.category} Budget Alert`,
          description: alert.message,
          confidence: 0.9,
          priority: alert.type === 'critical' ? 'high' : alert.type === 'warning' ? 'medium' : 'low'
        });
      });

      // Smart recommendations
      generatedInsights.push({
        id: 'coffee-recommendation',
        type: 'recommendation',
        title: 'Coffee Spending Optimization',
        description: 'You could save $65/month by brewing coffee at home 3 days a week',
        confidence: 0.85,
        action: 'Set up home brewing routine',
        priority: 'medium'
      });

      generatedInsights.push({
        id: 'achievement-goal',
        type: 'achievement',
        title: 'Savings Goal Progress',
        description: 'You\'re 15% ahead of your emergency fund savings schedule!',
        confidence: 1.0,
        priority: 'low'
      });

      setInsights(generatedInsights.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }));
      
      setIsLoading(false);
    };

    generateInsights();
  }, []);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      case 'achievement': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type: AIInsight['type'], priority: AIInsight['priority']) => {
    if (type === 'alert' && priority === 'high') return 'text-destructive';
    if (type === 'alert') return 'text-warning';
    if (type === 'achievement') return 'text-success';
    if (type === 'prediction') return 'text-primary';
    return 'text-muted-foreground';
  };

  const getBadgeVariant = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted/60 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Financial Insights
          <Badge variant="secondary" className="ml-auto text-xs">
            {insights.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          
          return (
            <div
              key={insight.id}
              className="p-4 rounded-lg border bg-card/50 space-y-3 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-muted/50 ${getInsightColor(insight.type, insight.priority)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge variant={getBadgeVariant(insight.priority)} className="text-xs">
                      {insight.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      Confidence: {(insight.confidence * 100).toFixed(0)}%
                    </span>
                    
                    {insight.action && (
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View All AI Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}