import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, Receipt, QrCode, CreditCard, Smartphone, Wifi, Eye, EyeOff, Copy, MoreVertical, X, CheckCircle2 } from "lucide-react";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<"physical" | "virtual">("physical");
  const [showBalance, setShowBalance] = useState(true);

  // Modal states
  const [sendModal, setSendModal] = useState(false);
  const [receiveModal, setReceiveModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [successModal, setSuccessModal] = useState<string | null>(null);

  // Send money form
  const [sendRecipient, setSendRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendNote, setSendNote] = useState("");

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    setSendModal(false);
    setSuccessModal(`Rs. ${sendAmount} sent to ${sendRecipient} successfully!`);
    setSendRecipient("");
    setSendAmount("");
    setSendNote("");
    setTimeout(() => setSuccessModal(null), 3000);
  };

  const handleQuickAction = (label: string) => {
    switch (label) {
      case "Send Money":
        setSendModal(true);
        break;
      case "Receive":
        setReceiveModal(true);
        break;
      case "Pay Bills":
        navigate("/bills");
        break;
      case "QR Pay":
        setQrModal(true);
        break;
    }
  };

  const quickActions = [
    { label: "Send Money", Icon: ArrowUpRight },
    { label: "Receive", Icon: ArrowDownLeft },
    { label: "Pay Bills", Icon: Receipt },
    { label: "QR Pay", Icon: QrCode },
  ];

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {successModal && (
        <div className="fixed top-6 right-6 z-50 bg-card border border-border rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-right max-w-sm">
          <CheckCircle2 size={22} className="text-success shrink-0" />
          <p className="text-sm font-medium">{successModal}</p>
          <button onClick={() => setSuccessModal(null)} className="text-muted-foreground hover:text-foreground ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Send Money Modal */}
      {sendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSendModal(false)} />
          <div className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Send Money</h3>
              <button onClick={() => setSendModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendMoney} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Recipient</label>
                <input
                  type="text"
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  placeholder="Enter name or account number"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount (Rs.)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Note (Optional)</label>
                <input
                  type="text"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  placeholder="What's this for?"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {receiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setReceiveModal(false)} />
          <div className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Receive Money</h3>
              <button onClick={() => setReceiveModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl gradient-primary mx-auto flex items-center justify-center text-primary-foreground">
                <ArrowDownLeft size={36} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Account Number</p>
                <p className="text-xl font-bold tracking-wider">4589-0021-7821-3456</p>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Account Title</p>
                <p className="font-semibold">Muhammad Ali</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("4589-0021-7821-3456");
                  setReceiveModal(false);
                  setSuccessModal("Account number copied to clipboard!");
                  setTimeout(() => setSuccessModal(null), 3000);
                }}
                className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                Copy Account Number
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Pay Modal */}
      {qrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setQrModal(false)} />
          <div className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">QR Pay</h3>
              <button onClick={() => setQrModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="text-center space-y-4">
              {/* QR Code placeholder */}
              <div className="w-48 h-48 mx-auto bg-foreground rounded-2xl p-4 flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-sm ${
                          [0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 19, 20, 22, 23, 24].includes(i)
                            ? "bg-foreground"
                            : "bg-card"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Scan this QR code to receive payment</p>
              <div className="bg-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground">SmartWallet ID</p>
                <p className="font-semibold text-sm">SW-ALI-4589</p>
              </div>
              <button
                onClick={() => setQrModal(false)}
                className="w-full py-3 rounded-xl border border-border font-semibold text-sm hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div>
                <p className="text-sm opacity-70 mb-1">Available Balance</p>
                <p className="text-4xl font-extrabold tracking-tight">
                  {showBalance ? "Rs. 128,450" : "Rs. •••••••"}
                </p>
              </div>
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
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/5" />
              <div className="absolute -bottom-8 -right-4 w-28 h-28 rounded-full bg-primary-foreground/5" />
            </div>
          ) : (
            <div className="relative rounded-2xl p-8 text-primary-foreground min-h-[220px] flex flex-col justify-between overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(280, 72%, 55%), hsl(320, 70%, 50%))" }}
            >
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
              <div>
              <p className="text-sm opacity-70 mb-1">Available Balance</p>
                <p className="text-4xl font-extrabold tracking-tight">
                  {showBalance ? "Rs. 128,450" : "Rs. •••••••"}
                </p>
              </div>
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
                onClick={() => handleQuickAction(action.label)}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group cursor-pointer"
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
