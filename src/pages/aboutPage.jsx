import {
  HiOutlineLightBulb,
  HiOutlineStar,
  HiOutlineGlobe,
  HiOutlineUsers,
} from "react-icons/hi";
import { BsStars } from "react-icons/bs";

// 🔹 Shared Card Component
const ValueCard = ({ icon: Icon, title, description, delay, color }) => (
  <div
    className={`p-8 rounded-2xl bg-white/90 border border-gray-200 backdrop-blur 
               hover:border-${color}-500 hover:shadow-lg hover:shadow-${color}-200 
               hover:-translate-y-1 transition-all duration-500 cursor-pointer text-center md:text-left`}
    style={{ animationDelay: delay }}
  >
    <div className="flex justify-center md:justify-start">
      <Icon className={`text-4xl text-${color}-500 mb-4 drop-shadow-md`} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-[15px] leading-relaxed">{description}</p>
  </div>
);

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const coreValues = [
    {
      icon: HiOutlineStar,
      title: "Quality First",
      description:
        "We prioritize clean code, robust testing, and attention to detail to ensure lasting reliability.",
      color: "yellow",
    },
    {
      icon: HiOutlineGlobe,
      title: "Global Scalability",
      description:
        "Designing architecture that performs flawlessly, whether serving one user or millions worldwide.",
      color: "blue",
    },
    {
      icon: HiOutlineUsers,
      title: "User-Centric Design",
      description:
        "Technology should feel intuitive. We focus on seamless UX and delightful interactions.",
      color: "rose",
    },
  ];

  const philosophy = [
    {
      icon: HiOutlineLightBulb,
      title: "Vision: Smarter Experiences",
      description:
        "To build elegant, future-forward digital tools that simplify complex tasks.",
      color: "violet",
    },
    {
      icon: BsStars,
      title: "Mission: Seamless Delivery",
      description:
        "Delivering secure, lightning-fast technology that provides clear value to every user.",
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 flex flex-col items-center px-4 sm:px-6 py-20 text-gray-800 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl text-center">
        <span
          className="px-4 py-1 text-sm font-semibold uppercase tracking-widest
                         text-blue-600 bg-blue-100 rounded-full border border-blue-300"
        >
          Our Story
        </span>

        <h1 className="mt-4 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Crafting Digital Excellence
        </h1>

        <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          We don't just write code — we build **smooth, enjoyable and
          high-performance** digital products that feel effortless to use.
        </p>
      </div>

      <hr className="w-24 h-1 bg-blue-500 rounded mt-12 mb-16 opacity-70" />

      {/* Vision / Mission */}
      <section className="w-full max-w-6xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {philosophy.map((item, index) => (
            <ValueCard key={index} {...item} delay={`${index * 200}ms`} />
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full max-w-6xl pt-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Core Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <ValueCard key={index} {...value} delay={`${index * 250}ms`} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 w-full max-w-4xl">
        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Powered by People
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our culture is built on **learning, transparency & innovation.** We
            push boundaries and consistently deliver meaningful solutions.
          </p>
          <a
            href="/careers"
            className="px-8 py-3 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 transition shadow-lg"
          >
            Join Our Team
          </a>
        </div>
      </section>

      {/* Footer */}
      <p className="mt-24 text-gray-500 text-sm tracking-wider">
        © {currentYear} Designed with Passion & Precision ✦ All Rights Reserved
      </p>
    </div>
  );
}
