import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { ExpenseCategories } from "@/components/dashboard/ExpenseCategories";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Overview Cards */}
        <OverviewCards />
        
        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Spending Chart - takes 2 columns */}
          <SpendingChart />
          
          {/* Expense Categories */}
          <ExpenseCategories />
        </div>
        
        {/* Secondary Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Transactions */}
          <RecentTransactions />
          
          {/* Financial Goals */}
          <FinancialGoals />
        </div>
      </main>
    </div>
  );
};

export default Index;
