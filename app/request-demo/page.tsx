"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RequestDemo from "../components/RequestDemo";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans">
      <Header />
      <RequestDemo />
      <Footer/>
    </div>
  );
}