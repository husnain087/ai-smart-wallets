import { useState } from "react";
import { User, Mail, Phone, Shield, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { signOut, user } = useAuth();
  const [name, setName] = useState("Muhammad Ali");
  const [email, setEmail] = useState("m.ali@email.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Profile</h2>

      {/* Avatar & Info */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
            MA
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">Premium Account • **** 4589</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            {editing ? (
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            ) : (
              <p className="mt-1 text-sm">{name}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            {editing ? (
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            ) : (
              <p className="mt-1 text-sm">{email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Phone size={14} /> Phone
            </label>
            {editing ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            ) : (
              <p className="mt-1 text-sm">{phone}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          {editing ? (
            <div className="flex gap-3">
              <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">Save Changes</button>
              <button onClick={() => setEditing(false)} className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">Edit Profile</button>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-1">
        <h3 className="font-bold text-lg mb-3">Settings</h3>
        {[
          { icon: Shield, label: "Security & Privacy", desc: "Two-factor auth, password" },
          { icon: Bell, label: "Notifications", desc: "Email, push, SMS preferences" },
          { icon: LogOut, label: "Log Out", desc: "Sign out of your account" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.label === "Log Out" ? signOut : undefined}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            <item.icon size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
