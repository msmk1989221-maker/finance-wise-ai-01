import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Laptop, GraduationCap, Plane } from "lucide-react";

const goals = [
  {
    title: "Emergency Fund",
    current: 1850,
    target: 3000,
    icon: Target,
    color: "hsl(var(--success))",
    deadline: "Dec 2024"
  },
  {
    title: "New Laptop",
    current: 680,
    target: 1200,
    icon: Laptop,
    color: "hsl(var(--primary))",
    deadline: "Mar 2024"
  },
  {
    title: "Study Abroad",
    current: 2400,
    target: 8000,
    icon: GraduationCap,
    color: "hsl(var(--investment))",
    deadline: "Sep 2024"
  },
  {
    title: "Summer Trip",
    current: 320,
    target: 1500,
    icon: Plane,
    color: "hsl(var(--warning))",
    deadline: "Jun 2024"
  }
];

export function FinancialGoals() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Financial Goals</CardTitle>
        <Button variant="outline" size="sm">Add Goal</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const percentage = (goal.current / goal.target) * 100;
          
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: goal.color + '20', color: goal.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due {goal.deadline}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    ${goal.current.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    of ${goal.target.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress 
                  value={percentage} 
                  className="h-2"
                  style={{ 
                    '--progress-background': goal.color 
                  } as React.CSSProperties}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(0)}% complete</span>
                  <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}