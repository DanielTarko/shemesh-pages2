import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
    {
      image: "/handshake.webp",
      name: "Rina S.",
      company: "Mom in Modiin",
      quote: "I genuinely feel like a better version of myself — as a mother, wife, and woman. I wish I’d found Shemesh sooner.",
    },
    {
      image: "/handshake.webp",
      name: "Josh D.",
      company: "Former Lone Soldier, Tel Aviv",
      quote: "it honestly changed everything. My therapist didn’t just listen — she understood.",
    },
    {
      image: "/handshake.webp",
      name: "Leah R.",
      company: "IDC Herzliya Student",
      quote: "I feel more grounded, more myself, and more hopeful than I have in a long time.",
    },
  ];

export default function RequestDemo() {

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 500); // Half second fade out, then change content
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[testimonialIdx];
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    employees: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Add your submit logic here
  };
  
  return (
    <div className="w-full flex items-center justify-center py-16 px-2">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center">
          {/* Testimonial Card */}
          <div className="flex-1 p-8 flex flex-col items-center max-w-lg relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff7a01] text-center mb-6">
              Find out if we're a good fit
            </h2>
            <div className="w-full flex flex-col items-center">
              <div className="relative w-80 h-80 mb-6 rounded-2xl overflow-hidden border-4 border-[#ffe036]">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  fill 
                  className={`object-cover transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              <p className={`italic text-[#3a2e1f] text-lg text-center mb-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {testimonial.quote}
              </p>
              <div className={`text-[#ff7a01] font-bold mb-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {testimonial.name}
              </div>
              <div className={`text-[#3a2e1f] text-sm mb-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {testimonial.company}
              </div>
              <div className="flex gap-2 justify-center items-center mt-2">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === testimonialIdx ? "bg-[#ff7a01]" : "bg-[#ffe036] opacity-60"
                    } inline-block`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl p-8 flex flex-col gap-4 max-w-lg shadow-lg border border-[#ffe036]">
            <h3 className="text-1xl font-extrabold text-[#ff7a01] mb-4">Please complete this form and a team member will be in touch with your shortly!</h3>
            <div className="flex gap-3">
              <input name="firstName" required placeholder="First Name *" className="flex-1 p-3 rounded-md  text-[#3a2e1f] border border-[#ffe036]" value={form.firstName} onChange={handleChange} />
              <input name="lastName" required placeholder="Last Name *" className="flex-1 p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.lastName} onChange={handleChange} />
            </div>
            <input name="company" required placeholder="Company Name *" className="p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.company} onChange={handleChange} />
            <input name="country" required placeholder="Country *" className="p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.country} onChange={handleChange} />
            <input name="employees" required placeholder="Number of Employees *" className="p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.employees} onChange={handleChange} />
            <input name="email" required type="email" placeholder="Business Email *" className="p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.email} onChange={handleChange} />
            <input name="phone" placeholder="Mobile number" className="p-3 rounded-md text-[#3a2e1f] border border-[#ffe036]" value={form.phone} onChange={handleChange} />
            <textarea name="message" placeholder="How can we help?" className="p-3 rounded-md text-[#3a2e1f] min-h-[80px] border border-[#ffe036]" value={form.message} onChange={handleChange} />
            <button type="submit" className="mt-2 bg-[#ff7a01] text-white font-bold py-3 rounded-md text-lg hover:bg-[#ff9333] transition">Submit</button>
            {submitted && <div className="text-[#ff7a01] text-center font-semibold mt-2">Thank you! We'll be in touch soon.</div>}
          </form>
        </div>
      </div>
  );
}