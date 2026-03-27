import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Oct", income: 45000, expense: 32000 },
  { month: "Nov", income: 52000, expense: 38000 },
  { month: "Dec", income: 48000, expense: 41000 },
  { month: "Jan", income: 55000, expense: 35000 },
  { month: "Feb", income: 60000, expense: 40000 },
  { month: "Mar", income: 58000, expense: 42000 },
];

const categoryData = [
  { name: "Food", value: 12000, color: "hsl(262, 83%, 58%)" },
  { name: "Transport", value: 5000, color: "hsl(280, 72%, 55%)" },
  { name: "Bills", value: 15000, color: "hsl(300, 65%, 50%)" },
  { name: "Shopping", value: 8000, color: "hsl(240, 60%, 55%)" },
  { name: "Other", value: 2000, color: "hsl(260, 15%, 70%)" },
];

const balanceTrend = [
  { day: "1", balance: 110000 },
  { day: "5", balance: 105000 },
  { day: "10", balance: 120000 },
  { day: "15", balance: 115000 },
  { day: "20", balance: 125000 },
  { day: "25", balance: 128450 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-2xl font-bold mt-1">Rs. 318,000</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold mt-1">Rs. 228,000</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Net Savings</p>
          <p className="text-2xl font-bold mt-1 text-success">Rs. 90,000</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Avg Monthly Spend</p>
          <p className="text-2xl font-bold mt-1">Rs. 38,000</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="income" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="hsl(260, 15%, 78%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-lg mb-4">Spending by Category</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                  <span className="text-muted-foreground ml-auto">Rs. {cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Balance trend */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-bold text-lg mb-4">Balance Trend (This Month)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={balanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="hsl(228, 89%, 55%)" strokeWidth={2.5} dot={{ fill: "hsl(228, 89%, 55%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
