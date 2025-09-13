import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, TrendingUp, Settings } from "lucide-react";
import { ExpenseAnalyzer, BudgetAlert } from "@/lib/ai/expenseAnalyzer";
import { useEffect, useState } from "react";

// Mock data for demonstration
const mockTransactions = [
  { id: '1', description: 'Starbucks Coffee', amount: 5.50, date: '2024-01-15', type: 'expense' as const, category: 'Food & Dining' },
  { id: '2', description: 'Uber Ride', amount: 12.00, date: '2024-01-14', type: 'expense' as const, category: 'Transportation' },
  { id: '3', description: 'Amazon Purchase', amount: 45.99, date: '2024-01-13', type: 'expense' as const, category: 'Shopping' },
  { id: '4', description: 'Pizza Delivery', amount: 18.50, date: '2024-01-12', type: 'expense' as const, category: 'Food & Dining' },
  { id: '5', description: 'Gas Station', amount: 35.00, date: '2024-01-11', type: 'expense' as const, category: 'Transportation' },
  { id: '6', description: 'Restaurant', amount: 28.75, date: '2024-01-10', type: 'expense' as const, category: 'Food & Dining' },
  { id: '7', description: 'Coffee Shop', amount: 4.25, date: '2024-01-09', type: 'expense' as const, category: 'Food & Dining' },
  { id: '8', description: 'Lyft Ride', amount: 8.50, date: '2024-01-08', type: 'expense' as const, category: 'Transportation' },
  { id: '9', description: 'Lunch', amount: 12.00, date: '2024-01-07', type: 'expense' as const, category: 'Food & Dining' },
  { id: '10', description: 'Target Shopping', amount: 67.99, date: '2024-01-06', type: 'expense' as const, category: 'Shopping' },
];

const budgets = {
  'Food & Dining': 150,
  'Transportation': 100,
  'Shopping': 200,
  'Education': 300,
  'Entertainment': 50,
};

export function BudgetAlerts() {
  const [alerts, setAlerts] = useState<BudgetAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAlerts = async () => {
      setIsLoading(true);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const budgetAlerts = ExpenseAnalyzer.generateBudgetAlerts(mockTransactions, budgets);
      setAlerts(budgetAlerts);
      setIsLoading(false);
    };

    generateAlerts();
  }, []);

  const getAlertIcon = (type: BudgetAlert['type']) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertVariant = (type: BudgetAlert['type']) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Smart Budget Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-2 bg-muted/60 rounded animate-pulse"></div>
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
          <AlertTriangle className="h-5 w-5 text-warning" />
          Smart Budget Alerts
          <Badge variant="outline" className="ml-auto text-xs">
            {alerts.filter(a => a.type !== 'info').length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
            <h3 className="font-medium text-sm mb-1">All budgets on track!</h3>
            <p className="text-xs text-muted-foreground">
              No budget alerts at this time. Keep up the great work!
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            
            return (
              <Alert key={alert.id} variant={getAlertVariant(alert.type)} className="relative">
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{alert.category}</h4>
                    <Badge 
                      variant={alert.type === 'critical' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                  </div>
                  
                  <AlertDescription className="text-sm mb-3">
                    {alert.message}
                  </AlertDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${alert.currentSpending.toFixed(2)} spent</span>
                      <span>${alert.budgetLimit.toFixed(2)} budget</span>
                    </div>
                    
                    <Progress 
                      value={alert.percentageUsed} 
                      className="h-2"
                      style={{
                        '--progress-background': alert.percentageUsed >= 90 ? 'hsl(var(--destructive))' : 
                                               alert.percentageUsed >= 75 ? 'hsl(var(--warning))' : 
                                               'hsl(var(--primary))'
                      } as React.CSSProperties}
                    />
                    
                    {alert.predictedOverrun && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-destructive/10 rounded text-xs">
                        <TrendingUp className="h-3 w-3 text-destructive" />
                        <span className="text-destructive">
                          Predicted overrun: ${alert.predictedOverrun.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Alert>
            );
          })
        )}
        
        {alerts.length > 0 && (
          <div className="pt-2 border-t flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Adjust Budgets
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              View Spending Tips
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}