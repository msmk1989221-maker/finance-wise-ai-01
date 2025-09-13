import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { PredictiveChart } from "@/components/dashboard/PredictiveChart";
import { ExpenseCategories } from "@/components/dashboard/ExpenseCategories";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { BudgetAlerts } from "@/components/dashboard/BudgetAlerts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Overview Cards */}
        <OverviewCards />
        
        {/* AI Predictive Analytics */}
        <PredictiveChart />
        
        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Traditional Spending Chart */}
          <SpendingChart />
          
          {/* Expense Categories */}
          <ExpenseCategories />
        </div>
        
        {/* AI-Enhanced Secondary Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <RecentTransactions />
          
          {/* Financial Goals */}
          <FinancialGoals />
          
          {/* AI Insights */}
          <AIInsights />
        </div>
        
        {/* Budget Management */}
        <BudgetAlerts />
      </main>
    </div>
  );
};

export default Index;
