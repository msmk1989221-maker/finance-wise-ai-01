import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    amount: -5.50,
    date: "2024-01-15",
    type: "expense"
  },
  {
    id: 2,
    description: "Part-time Job",
    category: "Income",
    amount: 450.00,
    date: "2024-01-14",
    type: "income"
  },
  {
    id: 3,
    description: "Textbook Purchase",
    category: "Education",
    amount: -89.99,
    date: "2024-01-13",
    type: "expense"
  },
  {
    id: 4,
    description: "Uber Ride",
    category: "Transportation",
    amount: -12.30,
    date: "2024-01-12",
    type: "expense"
  },
  {
    id: 5,
    description: "Freelance Work",
    category: "Income",
    amount: 125.00,
    date: "2024-01-11",
    type: "income"
  }
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-expense/10 text-expense'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'income' ? 'text-success' : 'text-expense'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}