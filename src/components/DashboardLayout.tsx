import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Receipt, PiggyBank, BarChart3, User, Menu, X } from "lucide-react";
import AiAssistant from "./AiAssistant";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transfer", label: "Transfer", icon: ArrowLeftRight },
  { to: "/bills", label: "Bills", icon: Receipt },
  { to: "/savings", label: "Savings", icon: PiggyBank },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">SmartWallet AI</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-secondary">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-foreground/30 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen
        w-60 bg-sidebar-bg md:rounded-2xl md:m-3 p-5 flex flex-col shrink-0
        transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <h1 className="text-sidebar-active-fg font-bold text-lg mb-8">SmartWallet AI</h1>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "gradient-primary text-sidebar-active-fg"
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
      <main className="flex-1 p-4 md:p-6 overflow-auto mt-14 md:mt-0 min-w-0">
        <Outlet />
      </main>
      <AiAssistant />
    </div>
  );
};

export default DashboardLayout;
