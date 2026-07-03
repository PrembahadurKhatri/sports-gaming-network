import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MapIcon } from "lucide-react";
import axios from "axios";
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/contact",
      formData
    );

    alert(res.data.message);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error: any) {
    alert(
      error.response?.data?.message || "Failed to send message."
      //error.response?.data?.message means if error response exists and has data and message ,
      // the value will be used, otherwise it will use the default message "Failed to send message."
    );
  }
};
    return (
        <div className="min-h-screen  text-black">
            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-16 text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                    Contact Us
                </h1>

                <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                    Have questions, suggestions, or need support? We'd love to hear from
                    you. Our team is always ready to help the sports community.
                </p>
            </section>

            {/* Main */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-2">
                {/* Left */}
                <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100">
                    <h2 className="mb-8 text-3xl font-bold">Get in Touch</h2>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <Mail className="text-cyan-400" size={28} />
                            <div>
                                <h3 className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Email</h3>
                                <p style={{ color: "cyan" }}>
                                    <a target="_blank" href="mailto:sahilkhatrii750@gmail.com" className="text-gray-600 hover:underline">
                                        sahilkhatrii750@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="text-cyan-400" size={28} />
                            <div>
                                <h3 className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Phone</h3>
                                <p ><a target="_blank" href="tel:+977-9827169125" className="text-gray-600 hover:underline">+977-9827169125</a> </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="text-cyan-400" size={28} />
                            <div>
                                <h3 className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Office</h3>
                                <p style={{ color: "black" }}>
                                    Pokhara, Gandaki, Nepal
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapIcon className="text-cyan-400 mt-1" size={28} />

                            <div className="w-full">
                                <h3 className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Our Location</h3>

                                <div className="mt-4 overflow-hidden rounded-2xl border shadow-lg">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1066.720705163854!2d84.02101792853377!3d28.205551998487504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDEyJzIwLjAiTiA4NMKwMDEnMTguMCJF!5e1!3m2!1sen!2snp!4v1782993451210!5m2!1sen!2snp"
                                        className="w-full h-72"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        title="PlayLink Location"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="text-cyan-400" size={28} />
                            <div>
                                <h3 className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Support Hours</h3>
                                <p style={{ color: "black" }}>
                                    Sunday - Friday
                                    <br />
                                    9:00 AM - 6:00 PM (NPT)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100">
                    <h2 className="mb-8 text-3xl font-bold">Send Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border
                              text-black
                            dark:bg-slate-900
                            dark:text-white
                             placeholder:text-gray-400
                        dark:placeholder:text-gray-200 
                            p-4 outline-none focus:border-cyan-400"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border bg-white
                            text-black
                            dark:bg-slate-900
                            dark:text-white
                             placeholder:text-gray-400
                        dark:placeholder:text-gray-200 
                         p-4 outline-none focus:border-cyan-400"
                            required
                        />

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full rounded-xl 
                              text-black
                            dark:bg-slate-900
                            dark:text-white
                             placeholder:text-gray-400
                        dark:placeholder:text-gray-200 
                            border placeholder-cyan-400  p-4 outline-none focus:border-cyan-400"
                            required
                        >
                            <option value="">Select Subject</option>
                            <option>General Inquiry</option>
                            <option>Report a Bug</option>
                            <option>Tournament Support</option>
                            <option>Ground Booking</option>
                            <option>Team Registration</option>
                            <option>Partnership</option>
                            <option>Feedback</option>
                        </select>

                        <textarea
                            rows={6}
                            name="message"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full rounded-xl border 
                              text-black
                            dark:bg-slate-900
                            dark:text-white
                             placeholder:text-gray-400
                        dark:placeholder:text-gray-200 
                            p-4 outline-none focus:border-cyan-400"
                            required
                        />

                        <button
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-semibold transition hover:scale-[1.02]"
                        >
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-6xl px-6 pb-20">
                <h2 className="mb-10 text-center text-4xl font-bold">
                    Frequently Asked Questions
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-cyan-400">
                            How do I join a team?
                        </h3>

                        <a className="mt-3 text-gray-400 ">
                            Register as a player, complete your profile, then browse available
                            teams and send a join request.
                        </a>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-cyan-400">
                            How do I book a ground?
                        </h3>

                        <a className="mt-3 text-gray-400">
                            Visit the Grounds page, choose your preferred venue, select an
                            available time slot, and confirm your booking.
                        </a>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-cyan-400">
                            How can I register a tournament?
                        </h3>

                        <a className="mt-3 text-gray-400">
                            Register as a Tournament Organizer and create your tournament from
                            your dashboard.
                        </a>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-cyan-400">
                            Can I edit my player profile?
                        </h3>

                        <a className="mt-3 text-gray-400">
                            Yes. You can update your profile, sports, positions, skill level,
                            and availability anytime from your account settings.
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}