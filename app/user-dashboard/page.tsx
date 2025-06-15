"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Therapist = {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  availability: string[];
  image: string;
  bio: string;
  education: string[];
  experience: string;
  languages: string[];
  approach: string;
  certifications: string[];
  sessionLength: string;
  sessionPrice: number;
};

type Session = {
  id: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
};

type TimeSlot = {
  time: string;
  available: boolean;
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"sessions" | "therapists" | "chat" | "home">("sessions");
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTherapistForBooking, setSelectedTherapistForBooking] = useState<Therapist | null>(null);
  const [selectedTherapistForProfile, setSelectedTherapistForProfile] = useState<Therapist | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data - replace with actual data from your backend
  const therapists: Therapist[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      availability: ["Mon", "Wed", "Fri"],
      image: "/therapist.jpg",
      bio: "Licensed therapist with 10+ years of experience specializing in anxiety and depression.",
      education: [
        "Ph.D. in Clinical Psychology, Stanford University",
        "M.A. in Counseling Psychology, Columbia University",
        "B.A. in Psychology, University of California, Berkeley"
      ],
      experience: "10+ years of clinical experience working with adults and adolescents in private practice and hospital settings.",
      languages: ["English", "Spanish"],
      approach: "I take an integrative approach combining Cognitive Behavioral Therapy (CBT), Mindfulness, and Psychodynamic principles. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings.",
      certifications: [
        "Licensed Clinical Psychologist",
        "Certified CBT Practitioner",
        "Trauma-Informed Care Specialist"
      ],
      sessionLength: "50 minutes",
      sessionPrice: 150,
    },
    {
        id: "2",
        name: "Dr. Sarah Johnson",
        specialization: ["Anxiety", "Depression", "Trauma"],
        rating: 4.9,
        availability: ["Mon", "Wed", "Fri"],
        image: "/therapist.jpg",
        bio: "Licensed therapist with 10+ years of experience specializing in anxiety and depression.",
        education: [
          "Ph.D. in Clinical Psychology, Stanford University",
          "M.A. in Counseling Psychology, Columbia University",
          "B.A. in Psychology, University of California, Berkeley"
        ],
        experience: "10+ years of clinical experience working with adults and adolescents in private practice and hospital settings.",
        languages: ["English", "Spanish"],
        approach: "I take an integrative approach combining Cognitive Behavioral Therapy (CBT), Mindfulness, and Psychodynamic principles. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings.",
        certifications: [
          "Licensed Clinical Psychologist",
          "Certified CBT Practitioner",
          "Trauma-Informed Care Specialist"
        ],
        sessionLength: "50 minutes",
        sessionPrice: 150,
      },
      {
        id: "3",
        name: "Dr. Sarah Johnson",
        specialization: ["Anxiety", "Depression", "Trauma"],
        rating: 4.9,
        availability: ["Mon", "Wed", "Fri"],
        image: "/therapist.jpg",
        bio: "Licensed therapist with 10+ years of experience specializing in anxiety and depression.",
        education: [
          "Ph.D. in Clinical Psychology, Stanford University",
          "M.A. in Counseling Psychology, Columbia University",
          "B.A. in Psychology, University of California, Berkeley"
        ],
        experience: "10+ years of clinical experience working with adults and adolescents in private practice and hospital settings.",
        languages: ["English", "Spanish"],
        approach: "I take an integrative approach combining Cognitive Behavioral Therapy (CBT), Mindfulness, and Psychodynamic principles. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings.",
        certifications: [
          "Licensed Clinical Psychologist",
          "Certified CBT Practitioner",
          "Trauma-Informed Care Specialist"
        ],
        sessionLength: "50 minutes",
        sessionPrice: 150
      },
      {
        id: "4",
        name: "Dr. Sarah Johnson",
        specialization: ["Anxiety", "Depression", "Trauma"],
        rating: 4.9,
        availability: ["Mon", "Wed", "Fri"],
        image: "/therapist.jpg",
        bio: "Licensed therapist with 10+ years of experience specializing in anxiety and depression.",
        education: [
          "Ph.D. in Clinical Psychology, Stanford University",
          "M.A. in Counseling Psychology, Columbia University",
          "B.A. in Psychology, University of California, Berkeley"
        ],
        experience: "10+ years of clinical experience working with adults and adolescents in private practice and hospital settings.",
        languages: ["English", "Spanish"],
        approach: "I take an integrative approach combining Cognitive Behavioral Therapy (CBT), Mindfulness, and Psychodynamic principles. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings.",
        certifications: [
          "Licensed Clinical Psychologist",
          "Certified CBT Practitioner",
          "Trauma-Informed Care Specialist"
        ],
        sessionLength: "50 minutes",
        sessionPrice: 150
      },
      {
        id: "5",
        name: "Dr. Sarah Johnson",
        specialization: ["Anxiety", "Depression", "Trauma"],
        rating: 4.9,
        availability: ["Mon", "Wed", "Fri"],
        image: "/therapist.jpg",
        bio: "Licensed therapist with 10+ years of experience specializing in anxiety and depression.",
        education: [
          "Ph.D. in Clinical Psychology, Stanford University",
          "M.A. in Counseling Psychology, Columbia University",
          "B.A. in Psychology, University of California, Berkeley"
        ],
        experience: "10+ years of clinical experience working with adults and adolescents in private practice and hospital settings.",
        languages: ["English", "Spanish"],
        approach: "I take an integrative approach combining Cognitive Behavioral Therapy (CBT), Mindfulness, and Psychodynamic principles. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings.",
        certifications: [
          "Licensed Clinical Psychologist",
          "Certified CBT Practitioner",
          "Trauma-Informed Care Specialist"
        ],
        sessionLength: "50 minutes",
        sessionPrice: 150
      },
    // Add more therapists...
  ];

  const sessions: Session[] = [
    {
      id: "1",
      therapistId: "1",
      therapistName: "Dr. Sarah Johnson",
      date: "2024-03-20",
      time: "14:00",
      status: "upcoming"
    },
    // Add more sessions...
  ];

  // Generate time slots for the selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const hours = [9, 10, 11, 13, 14, 15, 16, 17]; // 9 AM to 5 PM, excluding 12 PM
    
    for (const hour of hours) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.3 // Mock availability - replace with actual logic
      });
      slots.push({
        time: `${hour}:30`,
        available: Math.random() > 0.3
      });
    }
    
    return slots;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const handleBookSession = (therapist: Therapist) => {
    setSelectedTherapistForBooking(therapist);
    setShowBookingModal(true);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTimeSlot && selectedTherapistForBooking) {
      // Here you would typically make an API call to book the session
      console.log('Booking session:', {
        therapist: selectedTherapistForBooking.name,
        date: selectedDate,
        time: selectedTimeSlot
      });
      
      // Close modal and reset state
      setShowBookingModal(false);
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setSelectedTherapistForBooking(null);
    }
  };

  const handleViewProfile = (therapist: Therapist) => {
    setSelectedTherapistForProfile(therapist);
    setShowProfileModal(true);
  };


  const handleLogout = () => {
    
  };


  const handleAccountSettings = () => {
 
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Link href="/" >
            <Image src="/orangelogo.png" alt="Unmind Logo" width={90} height={32} />
        </Link>
      </div>
      <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-6 py-3 text-lg font-medium transition-colors
              ${activeTab === "home" 
                ? "text-[#ff7a01] border-b-2 border-[#ff7a01]" 
                : "text-gray-500 hover:text-gray-700"}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("sessions")}
            className={`px-6 py-3 text-lg font-medium transition-colors
              ${activeTab === "sessions" 
                ? "text-[#ff7a01] border-b-2 border-[#ff7a01]" 
                : "text-gray-500 hover:text-gray-700"}`}
          >
            My Sessions
          </button>
          <button
            onClick={() => setActiveTab("therapists")}
            className={`px-6 py-3 text-lg font-medium transition-colors
              ${activeTab === "therapists" 
                ? "text-[#ff7a01] border-b-2 border-[#ff7a01]" 
                : "text-gray-500 hover:text-gray-700"}`}
          >
            Find Therapists
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-3 text-lg font-medium transition-colors
              ${activeTab === "chat" 
                ? "text-[#ff7a01] border-b-2 border-[#ff7a01]" 
                : "text-gray-500 hover:text-gray-700"}`}
          >
            Chat
          </button>
        </div>
      <div className="flex gap-2 items-center">
        <p className="text-sm  px-5 font-medium">Hi Eitan!</p>
        {/* User Profile Button with Dropdown */}
       
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="relative w-12 h-12 rounded-full bg-[#ff7a01] flex items-center justify-center shadow-lg hover:bg-[#ff9333] transition-colors"
          >
            <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="none" stroke="none"/>
                <circle cx="50" cy="35" r="15" fill="#FFFFFF"/>
                <path d="M25 75 Q25 60 35 60 L65 60 Q75 60 75 75 L75 85 Q75 90 70 90 L30 90 Q25 90 25 85 Z" fill="#FFFFFF"/>
            </svg>
          </button>
          {showUserMenu && (
            <div className="absolute right-8 top-20 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <button
                onClick={handleAccountSettings}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
      </div>
    </header>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        

        {/* Content Sections */}
        <div className="mt-8">
          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
              <div className="grid gap-4">
                {sessions.map(session => (
                  <div key={session.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-medium">{session.therapistName}</h3>
                        <p className="text-gray-600">
                          {new Date(session.date).toLocaleDateString()} at {session.time}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm bg-[#ff7a01] text-white rounded-full hover:bg-[#ff9333] transition">
                          Join Session
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Therapists Tab */}
          {activeTab === "therapists" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Available Therapists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map(therapist => (
                  <div key={therapist.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-medium">{therapist.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-600">{therapist.rating}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {therapist.specialization.map(spec => (
                            <span key={spec} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        <p className="mt-3 text-gray-600 text-sm">{therapist.bio}</p>
                        <div className="mt-4 flex space-x-3">
                          <button 
                            onClick={() => handleBookSession(therapist)}
                            className="px-4 py-2 text-sm bg-[#ff7a01] text-white rounded-full hover:bg-[#ff9333] transition"
                          >
                            Book Session
                          </button>
                          <button onClick={() => handleViewProfile(therapist)} className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="flex h-[600px] bg-white rounded-lg shadow-sm border border-gray-100">
              {/* Chat List */}
              <div className="w-1/3 border-r border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium">Conversations</h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {therapists.map(therapist => (
                    <button
                      key={therapist.id}
                      onClick={() => setSelectedTherapist(therapist.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition
                        ${selectedTherapist === therapist.id ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={therapist.image}
                          alt={therapist.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{therapist.name}</h4>
                          <p className="text-sm text-gray-500">Last message...</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col">
                {selectedTherapist ? (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium">
                        {therapists.find(t => t.id === selectedTherapist)?.name}
                      </h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      {/* Chat messages will go here */}
                      <div className="text-center text-gray-500 mt-4">
                        No messages yet. Start the conversation!
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#ff7a01]"
                        />
                        <button className="px-6 py-2 bg-[#ff7a01] text-white rounded-full hover:bg-[#ff9333] transition">
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a conversation to start chatting
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Book Session with {selectedTherapistForBooking?.name}
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Calendar */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Date</h3>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 text-center rounded-lg transition
                      ${selectedDate?.toDateString() === date.toDateString()
                        ? 'bg-[#ff7a01] text-white'
                        : 'hover:bg-gray-100'
                      }`}
                  >
                    <div className="text-sm font-medium">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg">
                      {date.getDate()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Select Time</h3>
                <div className="grid grid-cols-4 gap-2">
                  {generateTimeSlots(selectedDate).map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                      disabled={!slot.available}
                      className={`p-2 text-center rounded-lg transition
                        ${!slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTimeSlot === slot.time
                            ? 'bg-[#ff7a01] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <div className="flex justify-end">
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTimeSlot}
                className={`px-6 py-2 rounded-full transition
                  ${!selectedDate || !selectedTimeSlot
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff7a01] text-white hover:bg-[#ff9333]'
                  }`}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Therapist Profile Modal */}
      {showProfileModal && selectedTherapistForProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedTherapistForProfile.image}
                  alt={selectedTherapistForProfile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{selectedTherapistForProfile.name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{selectedTherapistForProfile.rating}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTherapistForProfile.specialization.map(spec => (
                      <span key={spec} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About Me</h3>
                  <p className="text-gray-600">{selectedTherapistForProfile.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Approach</h3>
                  <p className="text-gray-600">{selectedTherapistForProfile.approach}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTherapistForProfile.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Experience</h3>
                  <p className="text-gray-600">{selectedTherapistForProfile.experience}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Certifications</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTherapistForProfile.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapistForProfile.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Session Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Length:</span> {selectedTherapistForProfile.sessionLength}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span> ${selectedTherapistForProfile.sessionPrice}/session
                    </p>
                  </div>
                </div>

                

                <div>
                  <h3 className="text-lg font-medium mb-2">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapistForProfile.availability.map((day, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  handleBookSession(selectedTherapistForProfile);
                }}
                className="px-6 py-2 bg-[#ff7a01] text-white rounded-full hover:bg-[#ff9333] transition"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}