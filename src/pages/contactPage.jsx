import { useEffect, useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
  };

  return (
    <div className="min-h-screen px-6 md:px-14 py-12 bg-[#f7faff]">
      {/* Title */}
      <div
        className={`text-center mb-14 transition-all duration-700 ease-out transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-5xl font-bold tracking-tight text-secondary">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          We’d love to hear from you. Let’s talk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ---------- LEFT MODERN INFO SECTION ---------- */}
        <div
          className={`space-y-6 transform transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: mounted ? "120ms" : "0ms" }}
        >
          <img
            src="/contact.jpg"
            alt="Support Team"
            className="rounded-2xl w-full h-[380px] object-cover shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform duration-700 ease-out hover:scale-[1.02]"
          />

          <div className="bg-white p-6 rounded-2xl shadow-sm border transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              I-Computers.lk (Pvt) Ltd
            </h2>

            <div className="grid grid-cols-1 gap-3 text-gray-700 text-[15px]">
              <div className="flex items-center gap-3">
                <FiMapPin /> #401 Galle Rd, Colombo 00400
              </div>
              <div className="flex items-center gap-3">
                <FiPhone /> +94 773 000 000
              </div>
              <div className="flex items-center gap-3">
                <FiMail /> info@i-computers.lk
              </div>
              <div className="flex items-center gap-3">
                <FiClock /> Mon–Sat: <b>09:30 — 19:00</b>
              </div>
              <div className="flex items-center gap-3">
                <FiMessageSquare /> Support: +94 112 000 000
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href="https://wa.me/94773277277"
                target="_blank"
                className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="bg-secondary text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: ULTRA MODERN CONTACT FORM ---------- */}
        <form
          onSubmit={handleSubmit}
          className={`backdrop-blur-xl bg-white/70 border shadow-[0_8px_40px_rgba(0,0,0,0.06)] 
                     p-10 rounded-2xl space-y-5 transition-all duration-700 ease-out transform ${
                       mounted
                         ? "opacity-100 translate-y-0"
                         : "opacity-0 translate-y-8"
                     }`}
          style={{ transitionDelay: mounted ? "220ms" : "0ms" }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            Send a Message
          </h2>

          {["name", "email", "subject"].map((field, i) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border focus:border-accent focus:ring-2 
                         ring-accent/40 outline-none transition duration-300 text-[15px] focus:shadow-lg"
              style={{ transitionDelay: `${mounted ? 260 + i * 40 : 0}ms` }}
            />
          ))}

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:border-accent 
                       ring-accent/40 outline-none resize-none text-[15px] transition duration-300 focus:shadow-lg"
            style={{ transitionDelay: mounted ? "380ms" : "0ms" }}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg 
                       bg-gradient-to-r from-accent to-secondary hover:opacity-90 
                       active:scale-95 transition-all duration-300 hover:shadow-lg"
            style={{ transitionDelay: mounted ? "420ms" : "0ms" }}
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
