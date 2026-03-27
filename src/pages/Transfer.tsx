import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const recentTransfers = [
  { name: "Ahmed Khan", amount: "Rs. 2,500", date: "Mar 25, 2026", type: "sent" },
  { name: "Sara Ali", amount: "Rs. 5,000", date: "Mar 24, 2026", type: "sent" },
  { name: "Client Payment", amount: "Rs. 15,000", date: "Mar 23, 2026", type: "received" },
  { name: "Freelance Work", amount: "Rs. 8,500", date: "Mar 22, 2026", type: "received" },
  { name: "Zain Ahmed", amount: "Rs. 1,200", date: "Mar 21, 2026", type: "sent" },
];

const Transfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer of Rs. ${amount} to ${recipient} initiated!`);
    setRecipient("");
    setAmount("");
    setNote("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transfer Money</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">New Transfer</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter name or account number"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Amount (Rs.)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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

        {/* Recent Transfers */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Recent Transfers</h3>
          <div className="space-y-3">
            {recentTransfers.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === "sent" ? "bg-destructive/10 text-destructive" : "bg-success/20 text-success"}`}>
                    {t.type === "sent" ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${t.type === "sent" ? "text-destructive" : "text-success"}`}>
                  {t.type === "sent" ? "-" : "+"} {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
