import { useState } from "react";
import {
    Crown,
    Check,
    CreditCard,
    ShieldCheck,
    Zap,
} from "lucide-react";

export default function Membership() {
    const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
    const [payment, setPayment] = useState("khalti");

    const price = plan === "monthly" ? "Rs. 199" : "Rs. 1,999";

    const handleContinue = () => {
        alert(
            `Selected Plan: ${plan}\nPayment Method: ${payment}\n\nPayment integration coming soon!`
        );
    };

    const paymentMethods = [
        {
            id: "khalti",
            name: "Khalti",
            image: "https://dao578ztqooau.cloudfront.net/static/img/logo1.png"
        },
        {
            id: "esewa",
            name: "eSewa",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
        },
        {
            id: "fonepay",
            name: "Fonepay",
            image: "https://play-lh.googleusercontent.com/9Gn2R4yJ-lkoqeoIhj4ihYYU5Mli-Wn_GOUgNoqGSv6rbySeYzSH_3xH3Ve9yergDwZ2D4UyWwCosuePwBDx0g"
        },
    ];

    const features = [
        "Unlimited Team Creation",
        "Priority Match Requests",
        "Premium Badge",
        "Tournament Promotion",
        "Ad-Free Experience",
        "Premium Support",
        "Unlimited Blog Access",
        "Exclusive Features",
    ];

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-16 px-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="text-center">
                    <Crown
                        size={60}
                        className="mx-auto text-yellow-500"
                    />

                    <h1 className="mt-5 text-5xl font-black dark:text-white">
                        Premium Membership
                    </h1>

                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Unlock powerful features and take your sports experience
                        to the next level.
                    </p>
                </div>

                {/* Pricing */}
                <div className="mt-15 grid gap-8 lg:grid-cols-2">

                    {/* Free */}
                    <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl">

                        <h2 className="text-3xl font-bold dark:text-white">
                            Free
                        </h2>

                        <h1 className="mt-5 text-5xl font-black">
                            Rs.0
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Forever Free
                        </p>

                        <div className="mt-10 space-y-4">

                            <div className="flex items-center gap-3">
                                <Check className="text-green-500" />
                                Player Registration
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-green-500" />
                                Team Registration
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-green-500" />
                                Browse Blogs
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-green-500" />
                                Find Matches
                            </div>

                        </div>

                    </div>

                    {/* Premium */}
                    <div className="rounded-3xl border-4 border-cyan-500 bg-white dark:bg-slate-900 p-8 shadow-2xl">

                        <div className="inline-flex items-center rounded-full bg-cyan-600 px-4 py-2 text-white font-semibold">
                            <Zap size={18} className="mr-2" />
                            Most Popular
                        </div>

                        <h2 className="mt-6 text-3xl font-bold dark:text-white">
                            Premium
                        </h2>

                        <h1 className="mt-5 text-5xl font-black text-cyan-600">
                            {price}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {plan === "monthly"
                                ? "per month"
                                : "per year"}
                        </p>

                        {/* Plan */}
                        <div className="mt-8">

                            <label className="font-semibold dark:text-white">
                                Choose Plan
                            </label>

                            <div className="mt-3 flex gap-4">

                                <button
                                    onClick={() => setPlan("monthly")}
                                    className={`flex-1 rounded-xl py-3 font-semibold transition ${plan === "monthly"
                                            ? "bg-cyan-600 text-white"
                                            : "bg-gray-200 dark:bg-slate-800 dark:text-white"
                                        }`}
                                >
                                    Monthly
                                </button>

                                <button
                                    onClick={() => setPlan("yearly")}
                                    className={`flex-1 rounded-xl py-3 font-semibold transition ${plan === "yearly"
                                            ? "bg-cyan-600 text-white"
                                            : "bg-gray-200 dark:bg-slate-800 dark:text-white"
                                        }`}
                                >
                                    Yearly
                                </button>

                            </div>

                        </div>

                        {/* Features */}

                        <div className="mt-10 space-y-4">

                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3"
                                >
                                    <Check className="text-green-500" />
                                    <span className="dark:text-white">
                                        {feature}
                                    </span>
                                </div>
                            ))}

                        </div>

                        {/* Payment */}

                        <div className="mt-10">

                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold dark:text-white">
                                <CreditCard />
                                Payment Method
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                {paymentMethods.map((item) => (

                                    <button
                                        key={item.id}
                                        onClick={() => setPayment(item.id)}
                                        className={`rounded-2xl border-2 p-5 transition-all ${payment === item.id
                                                ? "border-cyan-600 ring-2 ring-cyan-300"
                                                : item.color
                                            }`}
                                    >

                                        <div className="flex justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-14 w-auto object-contain"
                                            />
                                        </div>

                                        <div className="mt-2 font-semibold">
                                            {item.name}
                                        </div>

                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* Continue */}

                        <button
                            onClick={handleContinue}
                            className="mt-10 w-full rounded-2xl bg-cyan-600 py-4 text-lg font-bold text-white hover:bg-cyan-700 transition"
                        >
                            Continue to Payment
                        </button>

                        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <ShieldCheck size={18} />
                            Secure Payment
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}