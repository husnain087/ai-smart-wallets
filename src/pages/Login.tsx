import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, ArrowLeft } from "lucide-react";

const OTP_LENGTH = 6;

type AuthStep = "form" | "otp";
type AuthMode = "signin" | "signup";
type ContactMethod = "email" | "phone";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(searchParams.get("mode") === "signup" ? "signup" : "signin");
  const [step, setStep] = useState<AuthStep>("form");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // OTP
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "signup") setMode("signup");
  }, [searchParams]);

  const getContact = () => (contactMethod === "email" ? email : phone);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName, phone },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setStep("otp");
      setMessage(`Account created! Enter the 6-digit code sent to ${email}.`);
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (contactMethod === "email") {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setError(error.message);
      } else {
        setStep("otp");
        setMessage(`OTP sent to ${email}. Enter it below.`);
      }
    } else {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (error) {
        setError(error.message);
      } else {
        setStep("otp");
        setMessage(`OTP sent to ${formattedPhone}. Enter it below.`);
      }
    }
    setLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "signup" });
      if (error) setError(error.message);
    } else {
      if (contactMethod === "email") {
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
        if (error) setError(error.message);
      } else {
        const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
        const { error } = await supabase.auth.verifyOtp({ phone: formattedPhone, token: code, type: "sms" });
        if (error) setError(error.message);
      }
    }
    setLoading(false);
  };

  const resetToForm = () => {
    setStep("form");
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setMessage("");
  };

  // OTP Screen
  if (step === "otp") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <h1 className="text-2xl font-bold">SmartWallet AI</h1>
            </div>

            <h2 className="text-lg font-semibold text-center mb-2">Verify Your {contactMethod === "email" ? "Email" : "Phone"}</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Enter the 6-digit code sent to <strong>{contactMethod === "email" ? email : phone}</strong>
            </p>

            {error && <div className="mb-4 p-3 rounded-xl bg-destructive/10 text-destructive text-sm text-center">{error}</div>}
            {message && <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary text-sm text-center">{message}</div>}

            <div className="flex justify-center gap-3 mb-6" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.join("").length !== OTP_LENGTH}
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Sign In"}
            </button>

            <button onClick={resetToForm} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Form
  if (mode === "signup") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <h1 className="text-2xl font-bold">SmartWallet AI</h1>
            </div>

            <h2 className="text-lg font-semibold text-center mb-6">Create your account</h2>

            {error && <div className="mb-4 p-3 rounded-xl bg-destructive/10 text-destructive text-sm text-center">{error}</div>}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 chars)"
                  minLength={6}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </form>

            <button
              onClick={() => { setMode("signin"); setError(""); setMessage(""); }}
              className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sign In Form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <h1 className="text-2xl font-bold">SmartWallet AI</h1>
          </div>

          <h2 className="text-lg font-semibold text-center mb-6">Sign in to your account</h2>

          {error && <div className="mb-4 p-3 rounded-xl bg-destructive/10 text-destructive text-sm text-center">{error}</div>}

          {/* Contact method toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setContactMethod("email")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                contactMethod === "email"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setContactMethod("phone")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                contactMethod === "phone"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {contactMethod === "email" ? (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <button
            onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
