// AI-powered expense analysis and categorization
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category?: string;
  merchant?: string;
}

export interface CategoryPrediction {
  category: string;
  confidence: number;
  reasoning: string;
}

export interface SpendingPrediction {
  nextMonth: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  factors: string[];
}

export interface BudgetAlert {
  id: string;
  category: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  currentSpending: number;
  budgetLimit: number;
  percentageUsed: number;
  predictedOverrun?: number;
}

// Expense categorization rules based on merchant and description patterns
const categoryRules = {
  'Food & Dining': [
    'restaurant', 'cafe', 'coffee', 'pizza', 'burger', 'food', 'dining',
    'mcdonalds', 'subway', 'starbucks', 'doordash', 'ubereats', 'grubhub'
  ],
  'Transportation': [
    'uber', 'lyft', 'taxi', 'gas', 'fuel', 'metro', 'bus', 'train',
    'parking', 'toll', 'car', 'vehicle', 'transit'
  ],
  'Shopping': [
    'amazon', 'target', 'walmart', 'store', 'shop', 'retail', 'clothing',
    'electronics', 'purchase', 'buy'
  ],
  'Education': [
    'university', 'college', 'school', 'tuition', 'books', 'supplies',
    'academic', 'course', 'textbook', 'library'
  ],
  'Entertainment': [
    'movie', 'theater', 'game', 'netflix', 'spotify', 'music', 'concert',
    'event', 'fun', 'entertainment', 'streaming'
  ],
  'Health': [
    'doctor', 'hospital', 'pharmacy', 'medical', 'health', 'clinic',
    'prescription', 'medicine', 'dental'
  ],
  'Utilities': [
    'electric', 'gas', 'water', 'internet', 'phone', 'cable', 'utility',
    'bill', 'service'
  ]
};

export class ExpenseAnalyzer {
  // Categorize expense automatically using AI-like pattern matching
  static categorizeExpense(transaction: Transaction): CategoryPrediction {
    const description = transaction.description.toLowerCase();
    const merchant = transaction.merchant?.toLowerCase() || '';
    const searchText = `${description} ${merchant}`;

    let bestMatch = { category: 'Other', confidence: 0.3, reasoning: 'No clear pattern found' };

    for (const [category, keywords] of Object.entries(categoryRules)) {
      const matches = keywords.filter(keyword => 
        searchText.includes(keyword.toLowerCase())
      );

      if (matches.length > 0) {
        const confidence = Math.min(0.95, 0.5 + (matches.length * 0.15));
        if (confidence > bestMatch.confidence) {
          bestMatch = {
            category,
            confidence,
            reasoning: `Matched keywords: ${matches.join(', ')}`
          };
        }
      }
    }

    return bestMatch;
  }

  // Predict future spending based on historical data
  static predictSpending(transactions: Transaction[], category?: string): SpendingPrediction {
    const filteredTransactions = category 
      ? transactions.filter(t => t.category === category && t.type === 'expense')
      : transactions.filter(t => t.type === 'expense');

    if (filteredTransactions.length < 3) {
      return {
        nextMonth: 0,
        trend: 'stable',
        confidence: 0.2,
        factors: ['Insufficient historical data']
      };
    }

    // Group by month and calculate trends
    const monthlySpending = this.groupByMonth(filteredTransactions);
    const amounts = Object.values(monthlySpending);
    const avgSpending = amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;

    // Calculate trend
    const recentMonths = amounts.slice(-3);
    const trend = this.calculateTrend(recentMonths);
    
    // Predict next month with seasonal and trend adjustments
    const seasonalMultiplier = this.getSeasonalMultiplier();
    const trendMultiplier = trend === 'increasing' ? 1.1 : trend === 'decreasing' ? 0.9 : 1.0;
    
    const prediction = avgSpending * seasonalMultiplier * trendMultiplier;
    const confidence = Math.min(0.9, amounts.length * 0.1 + 0.3);

    return {
      nextMonth: Math.round(prediction),
      trend,
      confidence,
      factors: this.getSpendingFactors(recentMonths, trend)
    };
  }

  // Generate budget alerts based on current spending and predictions
  static generateBudgetAlerts(
    transactions: Transaction[], 
    budgets: Record<string, number>
  ): BudgetAlert[] {
    const alerts: BudgetAlert[] = [];
    const currentMonth = new Date().toISOString().slice(0, 7);

    for (const [category, budgetLimit] of Object.entries(budgets)) {
      const monthlySpending = transactions
        .filter(t => 
          t.category === category && 
          t.type === 'expense' && 
          t.date.startsWith(currentMonth)
        )
        .reduce((sum, t) => sum + t.amount, 0);

      const percentageUsed = (monthlySpending / budgetLimit) * 100;
      
      // Predict end-of-month spending
      const prediction = this.predictSpending(transactions, category);
      const predictedTotal = monthlySpending + (prediction.nextMonth * 0.5); // Remaining month portion

      if (predictedTotal > budgetLimit) {
        const overrun = predictedTotal - budgetLimit;
        alerts.push({
          id: `${category}-critical`,
          category,
          type: 'critical',
          message: `Predicted to exceed budget by $${overrun.toFixed(2)} this month`,
          currentSpending: monthlySpending,
          budgetLimit,
          percentageUsed,
          predictedOverrun: overrun
        });
      } else if (percentageUsed > 80) {
        alerts.push({
          id: `${category}-warning`,
          category,
          type: 'warning',
          message: `${percentageUsed.toFixed(0)}% of budget used`,
          currentSpending: monthlySpending,
          budgetLimit,
          percentageUsed
        });
      } else if (percentageUsed > 50) {
        alerts.push({
          id: `${category}-info`,
          category,
          type: 'info',
          message: `On track with ${percentageUsed.toFixed(0)}% of budget used`,
          currentSpending: monthlySpending,
          budgetLimit,
          percentageUsed
        });
      }
    }

    return alerts.sort((a, b) => {
      const priority = { critical: 3, warning: 2, info: 1 };
      return priority[b.type] - priority[a.type];
    });
  }

  private static groupByMonth(transactions: Transaction[]): Record<string, number> {
    return transactions.reduce((acc, transaction) => {
      const month = transaction.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  }

  private static calculateTrend(amounts: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (amounts.length < 2) return 'stable';
    
    const first = amounts[0];
    const last = amounts[amounts.length - 1];
    const change = (last - first) / first;

    if (change > 0.1) return 'increasing';
    if (change < -0.1) return 'decreasing';
    return 'stable';
  }

  private static getSeasonalMultiplier(): number {
    const month = new Date().getMonth();
    // Higher spending in November (holidays), September (back to school)
    const seasonalFactors = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.15, 1.0, 1.2, 1.1];
    return seasonalFactors[month];
  }

  private static getSpendingFactors(recentMonths: number[], trend: string): string[] {
    const factors = [];
    
    if (trend === 'increasing') {
      factors.push('Spending trend is increasing');
    } else if (trend === 'decreasing') {
      factors.push('Spending trend is decreasing');
    }

    const month = new Date().getMonth();
    if (month === 8) factors.push('Back-to-school season');
    if (month === 10 || month === 11) factors.push('Holiday season');
    
    const variance = this.calculateVariance(recentMonths);
    if (variance > 0.3) {
      factors.push('High spending variability');
    } else {
      factors.push('Consistent spending pattern');
    }

    return factors;
  }

  private static calculateVariance(amounts: number[]): number {
    if (amounts.length === 0) return 0;
    const mean = amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;
    const variance = amounts.reduce((sum, amt) => sum + Math.pow(amt - mean, 2), 0) / amounts.length;
    return variance / (mean * mean); // Coefficient of variation
  }
}