import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

const overviewData = [
  {
    title: "Total Balance",
    amount: "$2,847.50",
    change: "+5.2%",
    trend: "up",
    icon: Wallet,
    color: "text-primary"
  },
  {
    title: "Monthly Spending",
    amount: "$1,234.80",
    change: "-12.3%",
    trend: "down",
    icon: TrendingDown,
    color: "text-expense"
  },
  {
    title: "Savings Goal",
    amount: "$5,000.00",
    change: "68% complete",
    trend: "up",
    icon: Target,
    color: "text-savings"
  },
  {
    title: "Monthly Income",
    amount: "$2,100.00",
    change: "+8.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-income"
  }
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold">{item.amount}</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${
                    item.trend === 'up' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {item.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}