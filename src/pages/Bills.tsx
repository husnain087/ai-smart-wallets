import { useState } from "react";
import { Zap, Wifi, Droplets, Phone, Tv, CreditCard } from "lucide-react";

const bills = [
  { id: 1, name: "Electricity Bill", provider: "K-Electric", amount: "Rs. 8,200", due: "Mar 28, 2026", icon: Zap, paid: false },
  { id: 2, name: "Internet Bill", provider: "PTCL", amount: "Rs. 3,500", due: "Mar 30, 2026", icon: Wifi, paid: false },
  { id: 3, name: "Water Bill", provider: "KWSB", amount: "Rs. 1,800", due: "Apr 2, 2026", icon: Droplets, paid: false },
  { id: 4, name: "Mobile Bill", provider: "Jazz", amount: "Rs. 1,200", due: "Apr 5, 2026", icon: Phone, paid: false },
  { id: 5, name: "Cable TV", provider: "Nayatel", amount: "Rs. 2,000", due: "Mar 20, 2026", icon: Tv, paid: true },
  { id: 6, name: "Credit Card", provider: "HBL", amount: "Rs. 15,000", due: "Mar 18, 2026", icon: CreditCard, paid: true },
];

const Bills = () => {
  const [billList, setBillList] = useState(bills);

  const handlePay = (id: number) => {
    setBillList((prev) => prev.map((b) => (b.id === id ? { ...b, paid: true } : b)));
  };

  const unpaid = billList.filter((b) => !b.paid);
  const paid = billList.filter((b) => b.paid);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bills</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Total Due</p>
          <p className="text-2xl font-bold mt-1">Rs. {unpaid.reduce((s, b) => s + parseInt(b.amount.replace(/[^\d]/g, "")), 0).toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Unpaid Bills</p>
          <p className="text-2xl font-bold mt-1">{unpaid.length}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Paid This Month</p>
          <p className="text-2xl font-bold mt-1">{paid.length}</p>
        </div>
      </div>

      {/* Unpaid */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-bold text-lg mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {unpaid.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <bill.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.provider} • Due {bill.due}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{bill.amount}</span>
                <button
                  onClick={() => handlePay(bill.id)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
          {unpaid.length === 0 && <p className="text-sm text-muted-foreground">All bills paid! 🎉</p>}
        </div>
      </div>

      {/* Paid */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-bold text-lg mb-4">Paid Bills</h3>
        <div className="space-y-3">
          {paid.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <bill.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.provider}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{bill.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bills;
