import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useLoading } from '../context/LoadingContext';

// Components
import StatCard from '../components/StatCard';
import RecentActivityTable from '../components/RecentActivityTable';
import DashboardChart from '../components/DashboardChart';

// Skeletons
import StatCardSkeleton from '../components/skeletons/StatCardSkeleton';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

// Mock data
import { stats, recentActivities, chartData } from '../components/mock/mockData';

const Dashboard: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => <StatCard key={stat.id} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <DashboardChart title="Monthly Performance" data={chartData} />
          )}
        </div>

        {/* Recent Activity Section */}
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
