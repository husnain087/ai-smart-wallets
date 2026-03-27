import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Receipt, PiggyBank, BarChart3, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transfer", label: "Transfer", icon: ArrowLeftRight },
  { to: "/bills", label: "Bills", icon: Receipt },
  { to: "/savings", label: "Savings", icon: PiggyBank },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar-bg rounded-2xl m-4 p-6 flex flex-col shrink-0">
        <h1 className="text-sidebar-active-fg font-bold text-xl mb-8">SmartWallet AI</h1>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-active text-sidebar-active-fg"
                    : "text-sidebar-fg hover:text-sidebar-active-fg"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
