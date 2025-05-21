import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useLoading } from '../context/LoadingContext';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

// Regular components
import StatCard from '../components/StatCard';
import RecentActivityTable from '../components/RecentActivityTable';
import DashboardChart from '../components/DashboardChart';

// Skeleton components
import StatCardSkeleton from '../components/skeletons/StatCardSkeleton';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

const Dashboard: React.FC = () => {
  const { isLoading } = useLoading();

  // Mock data for stats
  const stats = [
    { 
      title: 'Total Customers', 
      value: '1,284', 
      change: '12%', 
      changeType: 'positive' as const, 
      icon: Users,
      iconColor: 'text-blue-500',
      iconBgColor: 'bg-blue-100'
    },
    { 
      title: 'Total Products', 
      value: '843', 
      change: '7%', 
      changeType: 'positive' as const, 
      icon: ShoppingBag,
      iconColor: 'text-purple-500',
      iconBgColor: 'bg-purple-100'
    },
    { 
      title: 'Revenue', 
      value: '$45,289', 
      change: '3%', 
      changeType: 'negative' as const, 
      icon: DollarSign,
      iconColor: 'text-green-500',
      iconBgColor: 'bg-green-100'
    },
    { 
      title: 'Growth', 
      value: '24.8%', 
      change: '2%', 
      changeType: 'positive' as const, 
      icon: TrendingUp,
      iconColor: 'text-red-500',
      iconBgColor: 'bg-red-100'
    }
  ];

  // Mock data for recent activity
  const recentActivities = [
    { id: '1', user: 'John Doe', action: 'Created', target: 'New Product', time: '5 min ago', status: 'completed' as const },
    { id: '2', user: 'Jane Smith', action: 'Updated', target: 'Customer #1284', time: '10 min ago', status: 'completed' as const },
    { id: '3', user: 'Alex Johnson', action: 'Deleted', target: 'Old Inventory', time: '25 min ago', status: 'failed' as const },
    { id: '4', user: 'Emma Wilson', action: 'Processed', target: 'Order #582', time: '1 hour ago', status: 'pending' as const },
    { id: '5', user: 'Michael Brown', action: 'Approved', target: 'Refund #128', time: '3 hours ago', status: 'completed' as const },
  ];

  // Mock data for chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [65, 59, 80, 81, 56, 55, 40, 58, 62, 79, 85, 90]
  };

  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <DashboardChart 
              title="Monthly Performance" 
              data={chartData} 
            />
          )}
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : (
            <RecentActivityTable activities={recentActivities} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;