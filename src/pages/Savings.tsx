import { useState } from "react";
import { Plus } from "lucide-react";

const initialGoals = [
  { id: 1, name: "Laptop Fund", target: 150000, saved: 105000 },
  { id: 2, name: "Emergency Fund", target: 200000, saved: 90000 },
  { id: 3, name: "Semester Fee", target: 120000, saved: 99600 },
  { id: 4, name: "Vacation Trip", target: 80000, saved: 24000 },
];

const Savings = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTarget) return;
    setGoals([...goals, { id: Date.now(), name: newName, target: parseInt(newTarget), saved: 0 }]);
    setNewName("");
    setNewTarget("");
    setShowForm(false);
  };

  const handleAddFunds = (id: number) => {
    const amountStr = prompt("Enter amount to add:");
    if (!amountStr) return;
    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount <= 0) return;
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, saved: Math.min(g.saved + amount, g.target) } : g))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Savings</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6">
          <p className="text-sm opacity-80">Total Savings</p>
          <p className="text-3xl font-bold mt-1">Rs. {totalSaved.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Active Goals</p>
          <p className="text-2xl font-bold mt-1">{goals.length}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold mt-1">{goals.filter((g) => g.saved >= g.target).length}</p>
        </div>
      </div>

      {/* New Goal Form */}
      {showForm && (
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Create New Goal</h3>
          <form onSubmit={handleAdd} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground">Goal Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. New Phone"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground">Target Amount (Rs.)</label>
              <input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Create
            </button>
          </form>
        </div>
      )}

      {/* Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percent = Math.round((goal.saved / goal.target) * 100);
          return (
            <div key={goal.id} className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{goal.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Rs. {goal.saved.toLocaleString()} / Rs. {goal.target.toLocaleString()}
                  </p>
                </div>
                <span className="text-primary font-bold">{percent}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-3">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percent}%` }} />
              </div>
              {percent < 100 && (
                <button
                  onClick={() => handleAddFunds(goal.id)}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  + Add Funds
                </button>
              )}
              {percent >= 100 && <p className="text-sm text-success font-medium">✓ Goal Reached!</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;
