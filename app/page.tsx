"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header"
import Link from "next/link";
import RequestDemo from "./components/RequestDemo";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  
  const carouselItems = [
    {
      image: "/handshake.webp",
      tag: "Fast mental health support",
      title: "Equip your people with the skills, mindsets, and habits to overcome their biggest personal and professional challenges.",
    },
    {
      image: "/handshake.webp",
      tag: "Fast coaching support",
      title: "Strategies for resilient leadership",
    },
    {
      image: "/handshake.webp",
      tag: "Group Coaching",
      title: "'I've been really overwhelmed with my workload lately…'",
    },
    {
      image: "/handshake.webp",
      tag: "Upskill your leaders",
      title: "'I've been really overwhelmed with my workload lately…'",
    },
    {
      image: "/handshake.webp",
      tag: "Upskill your leaders",
      title: "'I've been really overwhelmed with my workload lately…'",
    },
  ];

  // Impact slider state
  const [employees, setEmployees] = useState(100000);
  const struggling = Math.round(0.1667 * employees);
  const daysLost = Math.round(4.300860 * employees);
  const annualCost = Math.round(employees * 1700);

  return (
    <div className="bg-[#faf8f8] font-sans min-h-screen w-full flex flex-col items-center">
        {/* Header */}
        <Header/>
        {/* Hero Section */}
        <section className="w-full max-w-7xl flex flex-col items-center text-center py-22 px-4">
          <h1 className="text-4xl md:text-7xl font-extrabold text-[#ff7a01] leading-tight mb-6">Keeping Your Staff<br />At Their Best</h1>
          <p className="text-[#3a2e1f] text-lg max-w-2xl mb-8">Shemesh Health is your global wellbeing partner, connecting your people with fast proactive support when they need it to perform at their best.</p>
          <Link href="/request-demo" className="bg-[#ff7a01] text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-[#ff9333] transition">Request a demo</Link>
        </section>

        {/* Events/Features Marquee */}
        <section className="w-full flex flex-col items-center mb-12">
          <div className="overflow-hidden w-full">
            <div className="flex items-stretch animate-marquee whitespace-nowrap">
              {[...carouselItems, ...carouselItems].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-4 min-w-[260px] w-[450px] mx-3 flex flex-col items-start flex-shrink-0"
                >
                  <Image src={item.image} alt={item.tag} width={400} height={400} className="rounded-lg mb-3 object-cover w-full h-80" />
                  <span className="text-xs bg-[#f3ffa8] text-[#ff7a01] px-2 py-1 rounded mb-2 font-semibold">{item.tag}</span>
                  <div className="text-sm text-[#3a2e1f] font-medium mb-1">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}</style>
        </section>
      
        {/* Platform Overview */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl mb-16 px-4 pt-10"
        >
          <h2 className="text-5xl font-bold text-[#ff7a01] text-center mb-4">Our platform</h2>
          <p className="text-center text-[#7a6a58]">Affordable, High-Quality Therapy and Counseling</p>
          <p className="text-center text-[#7a6a58] mb-8">​Connecting Your Team with Leading South African Mental Health Experts</p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl mb-16 px-4 pb-10"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center">
              <h3 className="font-semibold text-[#ff7a01] mb-2 text-lg">Therapist Fit</h3>
              <p className="text-[#7a6a58] text-sm mb-4 text-center">We match your people with the best therapist for their unique needs and preferences. No more guesswork—just personalized care from a professional who truly understands them.</p>
              <Image src="/handshake.webp" alt="For Individuals" width={220} height={120} className="rounded-lg" />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center">
              <h3 className="font-semibold text-[#ff7a01] mb-2 text-lg">Convenient</h3>
              <p className="text-[#7a6a58] text-sm mb-4 text-center">Start your therapy journey in just 2 minutes. Say goodbye to endless searching and hello to quick, seamless support tailored to you.</p>
              <Image src="/handshake.webp" alt="For Leaders" width={220} height={120} className="rounded-lg" />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center">
              <h3 className="font-semibold text-[#ff7a01] mb-2 text-lg">Affordable</h3>
              <p className="text-[#7a6a58] text-sm mb-4 text-center">Therapy shouldn't break the bank. With sessions starting at just $59, we make mental health care accessible to everyone.</p>
              <Image src="/handshake.webp" alt="For Organizations" width={220} height={120} className="rounded-lg" />
            </div>
          </div>
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl px-4 mb-10"
        >
          <h2 className="text-5xl font-bold text-[#ff7a01] text-center mb-2">Our impact</h2>
          <p className="text-center text-[#7a6a58] mb-6">Mentally healthy companies are competitive companies—every dollar invested in mental health pays back.</p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl mb-16 px-4"
        >
          <div className="bg-[#ffe036] rounded-xl p-8 flex flex-col items-center mb-8 relative">
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-2xl font-bold text-black">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path d="M3 17L9 11L13 15L21 7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7H21V11" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>How much could Shemesh save your organization?</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-full my-10">
              <span className="text-5xl font-extrabold text-black">{employees.toLocaleString()}</span>
              <span className="text-xl text-black">employees</span>
              <input
                type="range"
                min={100}
                max={200000}
                step={100}
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full mt-6 accent-[#ff7a01] h-2 rounded-lg appearance-none bg-black/40"
              />
            </div>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mt-4">
              <div className="flex-1 text-center">
                <div className="text-5xl font-extrabold text-black mb-2">{struggling.toLocaleString()}</div>
                <div className="text-lg text-black font-medium">employees are struggling with a mental health issue</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-5xl font-extrabold text-black mb-2">{daysLost.toLocaleString()}</div>
                <div className="text-lg text-black font-medium">days are lost every year to work-related mental ill-health</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-5xl font-extrabold text-black mb-2">${(annualCost/1e6).toFixed(1)}M</div>
                <div className="text-lg text-black font-medium">the annual cost of mental ill-health to organizations</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Evidence Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl mb-10 px-4"
        >
          <h2 className="text-5xl font-bold text-[#ff7a01] text-center mb-2">Our evidence</h2>
          <p className="text-center text-[#7a6a58] mb-6">Proven results make us the trusted choice for transforming workplace mental health.</p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-7xl mb-20 px-4"
        >
          <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex-1 text-center flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-[#ff7a01] mb-1">1,440</div>
              <div className="text-[#3a2e1f] text-sm">times faster than the industry standard at finding clients a matching therapist</div>
              <Image src="/clock.avif" alt="Scientist" width={180} height={120} className="rounded-lg mt-5" />
            </div>
            <div className="flex-1 text-center flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-[#ff7a01] mb-1">92%</div>
              <div className="text-[#3a2e1f] text-sm">of Shemesh clients stay with us</div>
              <Image src="/pie.avif" alt="Scientist" width={180} height={120} className="rounded-lg mt-5" />
            </div>
            <div className="flex-1 text-center flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-[#ff7a01] mb-1">30.6-34.1%</div>
              <div className="text-[#3a2e1f] text-sm">cheaper than other standard online therapy sessions</div>
              <Image src="/bars.avif" alt="Scientist" width={180} height={120} className="rounded-lg mt-5" />
            </div>
          </div>
          </motion.section>

        <RequestDemo />

        {/* Footer */}
        <Footer/>
    </div>
  );
}
