import { useState } from "react";
import {
    Crown,
    Check,
    CreditCard,
    ShieldCheck,
    Zap,
    ArrowRight,
    Star,
    Sparkles,
    User,
    Lock
} from "lucide-react";

export default function Membership() {
    const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
    const [payment, setPayment] = useState("khalti");

    const price = plan === "monthly" ? "Rs. 199" : "Rs. 1,999";
    const oldPrice = plan === "monthly" ? "Rs. 249" : "Rs. 2,999";
    const discount = plan === "monthly" ? "Save 20%" : "Save 33% + 2 Months Free";

    const handleContinue = () => {
        alert(
            `Selected Plan: ${plan}\nPayment Method: ${payment}\n\nPayment integration coming soon!`
        );
    };

    const paymentMethods = [
        {
            id: "khalti",
            name: "Khalti Wallet",
            image: "https://dao578ztqooau.cloudfront.net/static/img/logo1.png",
            hoverBorder: "hover:border-purple-500/50 hover:bg-purple-50/10",
            selectedRing: "ring-4 ring-purple-500/20 border-purple-600 dark:border-purple-500 bg-purple-500/[0.04]"
        },
        {
            id: "esewa",
            name: "eSewa Mobile",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp",
            hoverBorder: "hover:border-green-500/50 hover:bg-green-50/10",
            selectedRing: "ring-4 ring-green-500/20 border-green-600 dark:border-green-500 bg-green-500/[0.04]"
        },
        {
            id: "fonepay",
            name: "Fonepay QR",
            image: "https://play-lh.googleusercontent.com/9Gn2R4yJ-lkoqeoIhj4ihYYU5Mli-Wn_GOUgNoqGSv6rbySeYzSH_3xH3Ve9yergDwZ2D4UyWwCosuePwBDx0g",
            hoverBorder: "hover:border-red-500/50 hover:bg-red-50/10",
            selectedRing: "ring-4 ring-red-500/20 border-red-600 dark:border-red-500 bg-red-500/[0.04]"
        },
    ];

    const freeFeatures = [
        "Create standard player profile",
        "Browse teams and request to join",
        "Search nearby matches & grounds",
        "Track basic game scoreboard stats",
        "Read articles on community blogs"
    ];

    const premiumFeatures = [
        "Create & manage unlimited teams",
        "Priority requests for matches & trials",
        "Golden Verified Player badge",
        "Organize tournaments with match brackets",
        "Ad-free premium platform access",
        "Dedicated VIP Customer Support desk",
        "Publish unlimited blog articles",
        "Early invitations to new game modes",
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
            {/* Deluxe background light fields */}
            <div className="absolute top-[-10%] left-[-10%] size-[600px] rounded-full bg-amber-500/5 dark:bg-amber-500/[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] size-[650px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-purple-500/5 dark:bg-purple-500/[0.02] blur-[130px] pointer-events-none" />

            {/* Custom Grid Layout Cover */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="mx-auto max-w-5xl relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="relative inline-flex items-center justify-center p-3 bg-gradient-to-br from-amber-500/10 to-yellow-500/20 rounded-2xl border border-amber-500/30 mb-6 shadow-lg shadow-amber-500/10">
                        <Crown className="text-amber-500 size-9 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-bounce" />
                        <Sparkles className="absolute -top-1.5 -right-1.5 size-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.1]">
                        Unlock{" "}
                        <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-sm font-black">
                            Sports Premium
                        </span>
                    </h1>

                    <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                        Elevate your amateur sports experience. Form squads, manage events, host tournaments, and claim verified leaderboards across Nepal.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch max-w-5xl mx-auto">
                    
                    {/* Free Card */}
                    <div className="lg:col-span-5 rounded-3xl bg-white/70 dark:bg-slate-900/40 p-8 shadow-xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between h-full relative group hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    <User size={16} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Starter</h2>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Discover players & play basic friendly games</p>
                            
                            <div className="mt-6 flex items-baseline">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">Rs. 0</span>
                                <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold ml-2">/ Forever Free</span>
                            </div>

                            {/* Features list */}
                            <div className="mt-8 space-y-4">
                                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Plan Highlights:</p>
                                {freeFeatures.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                        <div className="size-4.5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="text-slate-500 dark:text-slate-400 size-3" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                            <button className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800/60 py-3.5 text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed select-none transition-colors border border-slate-200/20" disabled>
                                Active Starter Tier
                            </button>
                        </div>
                    </div>

                    {/* Premium Card */}
                    <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/80 dark:border-amber-500/60 shadow-2xl p-8 relative flex flex-col justify-between h-full hover:shadow-amber-500/[0.03] transition-all duration-300">
                        {/* Premium Ribbon */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-1 text-slate-950 text-[10px] font-extrabold tracking-wider uppercase shadow-md shadow-amber-500/25">
                                <Zap size={11} className="fill-slate-950 animate-bounce" /> Recommended
                            </span>
                        </div>

                        <div>
                            {/* Card Heading & Plan Switcher */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        Premium Pass <Star className="size-5 fill-amber-500 text-amber-500 animate-spin-slow" />
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Unlock fully loaded team management tools</p>
                                </div>

                                {/* Slider tab select buttons */}
                                <div className="flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 self-start sm:self-center">
                                    <button
                                        onClick={() => setPlan("monthly")}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                                            plan === "monthly"
                                                ? "bg-white dark:bg-slate-800 text-amber-500 shadow-sm"
                                                : "text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                        }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setPlan("yearly")}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                                            plan === "yearly"
                                                ? "bg-white dark:bg-slate-800 text-amber-500 shadow-sm"
                                                : "text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                        }`}
                                    >
                                        Yearly
                                    </button>
                                </div>
                            </div>

                            {/* Price Label */}
                            <div className="flex flex-wrap items-baseline gap-2 pb-6 border-b border-slate-100 dark:border-slate-850">
                                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white transition-all">
                                    {price}
                                </span>
                                <span className="text-slate-400 dark:text-slate-500 line-through text-xs sm:text-sm font-semibold">
                                    {oldPrice}
                                </span>
                                <span className="inline-flex items-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold px-2 py-0.5 border border-amber-500/20">
                                    {discount}
                                </span>
                            </div>

                            {/* Premium Features Grid */}
                            <div className="mt-6 space-y-3.5">
                                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">All Premium Access:</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {premiumFeatures.map((feature) => (
                                        <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                            <div className="size-4.5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="text-amber-500 size-3 font-bold" />
                                            </div>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Selector */}
                            <div className="mt-8 border-t border-slate-100 dark:border-slate-850 pt-6">
                                <h3 className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-slate-450 dark:text-slate-500 mb-4">
                                    <CreditCard size={13} className="text-slate-400 shrink-0" />
                                    Choose Payment gateway
                                </h3>

                                <div className="grid grid-cols-3 gap-3">
                                    {paymentMethods.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setPayment(item.id)}
                                            className={`rounded-2xl border p-3 flex flex-col items-center justify-center gap-2.5 transition-all duration-300 bg-slate-50/40 dark:bg-slate-950/20 cursor-pointer ${
                                                payment === item.id
                                                    ? `${item.selectedRing} scale-102 border-slate-800/80`
                                                    : `border-slate-200 dark:border-slate-800 ${item.hoverBorder} opacity-75 hover:opacity-100`
                                            }`}
                                        >
                                            <div className="h-9 w-full flex items-center justify-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="max-h-full max-w-[80%] object-contain rounded-md"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">
                                                {item.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Confirmation */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-850">
                            <button
                                onClick={handleContinue}
                                className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-sm font-extrabold py-4 transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                Activate Membership Plan <ArrowRight size={16} />
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                                <Lock size={12} className="text-emerald-500" />
                                <span>Secured 128-bit SSL encrypted transaction gateway</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
