import { AppSidebar } from "@/components/AppSidebar";
import UserDashboard from "@/components/UserDashboard";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <div className="flex-1 overflow-hidden">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
