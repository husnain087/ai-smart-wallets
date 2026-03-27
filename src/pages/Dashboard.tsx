import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Receipt, QrCode, CreditCard, Smartphone, Wifi, Eye, EyeOff, Copy, MoreVertical } from "lucide-react";

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
  const [activeCard, setActiveCard] = useState<"physical" | "virtual">("physical");
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-6">
      {/* Wallet & Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card Type Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCard("physical")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCard === "physical"
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard size={16} />
              Physical Card
            </button>
            <button
              onClick={() => setActiveCard("virtual")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCard === "virtual"
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone size={16} />
              Virtual Card
            </button>
          </div>

          {/* Card Display */}
          {activeCard === "physical" ? (
            <div className="gradient-hero rounded-2xl p-8 text-primary-foreground relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              {/* Card chip & contactless */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-primary-foreground/20 border border-primary-foreground/30" />
                  <Wifi size={20} className="opacity-60 rotate-90" />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowBalance(!showBalance)} className="opacity-70 hover:opacity-100 transition-opacity">
                    {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button className="opacity-70 hover:opacity-100 transition-opacity">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div>
                <p className="text-sm opacity-70 mb-1">Available Balance</p>
                <p className="text-4xl font-extrabold tracking-tight">
                  {showBalance ? "Rs. 128,450" : "Rs. •••••••"}
                </p>
              </div>

              {/* Card details */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-60 mb-1">Card Number</p>
                  <p className="text-sm font-medium tracking-widest">4589 •••• •••• 7821</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-60 mb-1">Expires</p>
                  <p className="text-sm font-medium">09/28</p>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/5" />
              <div className="absolute -bottom-8 -right-4 w-28 h-28 rounded-full bg-primary-foreground/5" />
            </div>
          ) : (
            <div className="relative rounded-2xl p-8 text-primary-foreground min-h-[220px] flex flex-col justify-between overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(280, 72%, 55%), hsl(320, 70%, 50%))" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={20} className="opacity-80" />
                  <span className="text-sm font-semibold opacity-80">Virtual Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowBalance(!showBalance)} className="opacity-70 hover:opacity-100 transition-opacity">
                    {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button className="opacity-70 hover:opacity-100 transition-opacity">
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div>
                <p className="text-sm opacity-70 mb-1">Virtual Balance</p>
                <p className="text-4xl font-extrabold tracking-tight">
                  {showBalance ? "Rs. 45,200" : "Rs. •••••••"}
                </p>
              </div>

              {/* Card details */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-60 mb-1">Card Number</p>
                  <p className="text-sm font-medium tracking-widest">9012 •••• •••• 3456</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-60 mb-1">CVV</p>
                  <p className="text-sm font-medium">{showBalance ? "847" : "•••"}</p>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/5" />
              <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full bg-primary-foreground/5" />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-2xl p-6 border border-border flex flex-col">
          <h3 className="font-bold text-lg mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
                  <action.Icon size={24} strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
        <div className="bg-card rounded-2xl p-6 border border-border overflow-x-auto">
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
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
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
