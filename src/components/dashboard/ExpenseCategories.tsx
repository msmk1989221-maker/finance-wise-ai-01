import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingBag, Utensils, Car, BookOpen, Coffee, Gamepad2 } from "lucide-react";

const categories = [
  {
    name: "Food & Dining",
    amount: 485,
    budget: 600,
    icon: Utensils,
    color: "hsl(var(--expense))"
  },
  {
    name: "Shopping",
    amount: 320,
    budget: 400,
    icon: ShoppingBag,
    color: "hsl(var(--warning))"
  },
  {
    name: "Transportation",
    amount: 180,
    budget: 250,
    icon: Car,
    color: "hsl(var(--primary))"
  },
  {
    name: "Education",
    amount: 120,
    budget: 200,
    icon: BookOpen,
    color: "hsl(var(--investment))"
  },
  {
    name: "Coffee & Snacks",
    amount: 95,
    budget: 100,
    icon: Coffee,
    color: "hsl(var(--accent-foreground))"
  },
  {
    name: "Entertainment",
    amount: 75,
    budget: 150,
    icon: Gamepad2,
    color: "hsl(var(--savings))"
  }
];

export function ExpenseCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage = (category.amount / category.budget) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${category.amount} of ${category.budget}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  percentage > 90 ? 'text-destructive' : 
                  percentage > 75 ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
                style={{ 
                  '--progress-background': category.color 
                } as React.CSSProperties}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}