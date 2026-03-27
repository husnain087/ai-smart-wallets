import { ArrowUpRight, ArrowDownLeft, Receipt, QrCode } from "lucide-react";

const transactions = [
  { name: "Ahmed Khan", type: "Sent", amount: "- Rs. 2,500", status: "Completed" },
  { name: "Electricity Bill", type: "Bill Payment", amount: "- Rs. 8,200", status: "Paid" },
  { name: "Client Payment", type: "Received", amount: "+ Rs. 15,000", status: "Received" },
];

const savingsGoals = [
  { name: "Laptop Fund", percent: 70 },
  { name: "Emergency Fund", percent: 45 },
  { name: "Semester Fee", percent: 83 },
];

const quickActions = [
  { label: "Send Money", Icon: ArrowUpRight },
  { label: "Receive", Icon: ArrowDownLeft },
  { label: "Pay Bills", Icon: Receipt },
  { label: "QR Pay", Icon: QrCode },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <div className="gradient-hero text-primary-foreground rounded-2xl p-6">
          <p className="text-sm opacity-80">Wallet Balance</p>
          <p className="text-4xl font-bold mt-2">Rs. 128,450</p>
          <p className="text-sm mt-3 opacity-70">**** 4589 • Active</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
                  <action.Icon size={18} />
                </div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Monthly Spending</p>
          <p className="text-2xl font-bold mt-1">Rs. 42,000</p>
          <p className="text-sm text-success mt-1">+8% from last month</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Total Savings</p>
          <p className="text-2xl font-bold mt-1">Rs. 75,300</p>
          <p className="text-sm text-primary mt-1">3 active goals</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Bills Due</p>
          <p className="text-2xl font-bold mt-1">4</p>
          <p className="text-sm text-warning mt-1">Electricity due tomorrow</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left pb-3 font-medium">Name</th>
                <th className="text-left pb-3 font-medium">Type</th>
                <th className="text-left pb-3 font-medium">Amount</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="py-3">{t.name}</td>
                  <td className="py-3 text-muted-foreground">{t.type}</td>
                  <td className="py-3">{t.amount}</td>
                  <td className="py-3 text-muted-foreground">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Savings Goals */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Savings Goals</h3>
          <div className="space-y-5">
            {savingsGoals.map((goal) => (
              <div key={goal.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-primary font-semibold">{goal.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all"
                    style={{ width: `${goal.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
