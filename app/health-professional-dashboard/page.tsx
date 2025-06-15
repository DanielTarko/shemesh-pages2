"use client";
import { useState } from "react";
import Header from "../components/Header";

type Meeting = {
  id: string;
  clientName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
};

type AvailabilitySlot = {
  id: string;
  date: string;
  time: string;
  bookedBy: string | null;
};

type SessionNote = {
  id: string;
  clientName: string;
  date: string;
  note: string;
};

export default function HealthProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "calendar" | "notes" | "chat" | "settings">("home");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([]);
  const [selectedClientForChat, setSelectedClientForChat] = useState<string | null>(null);

  // Mock Data
  const upcomingMeetings: Meeting[] = [
    { id: "m1", clientName: "Alice Smith", date: "2024-03-22", time: "10:00 AM", status: "upcoming" },
    { id: "m2", clientName: "Bob Johnson", date: "2024-03-23", time: "02:00 PM", status: "upcoming" },
  ];

  const clientsForChat = [
    { id: "c1", name: "Alice Smith" },
    { id: "c2", name: "Bob Johnson" },
  ];

  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    for (let h = startHour; h <= endHour; h++) {
      slots.push(`${h}:00`);
      if (h < endHour) slots.push(`${h}:30`);
    }
    return slots;
  };

  const handleAddSessionNote = (clientName: string, note: string) => {
    const newNote: SessionNote = {
      id: `sn${sessionNotes.length + 1}`,
      clientName,
      date: new Date().toLocaleDateString(),
      note,
    };
    setSessionNotes([...sessionNotes, newNote]);
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="w-64 bg-white shadow-md p-6">
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "home" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Home
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "calendar" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Calendar & Availability
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "notes" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Session Notes
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "chat" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Chat
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "settings" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {activeTab === "home" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Welcome, Health Professional!</h1>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
              <div className="grid gap-4">
                {upcomingMeetings.length > 0 ? (
                  upcomingMeetings.map(meeting => (
                    <div key={meeting.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-xl font-medium">Meeting with {meeting.clientName}</h3>
                      <p className="text-gray-600">Date: {meeting.date} at {meeting.time}</p>
                      <p className="text-gray-600">Status: {meeting.status}</p>
                      <button className="mt-4 px-4 py-2 text-sm bg-[#ff7a01] text-white rounded-full hover:bg-[#ff9333] transition">
                        Join Meeting
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No upcoming meetings.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Calendar & Availability Management</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Date</h2>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a01]"
                />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {generateTimeSlots(selectedDate).map((timeSlot, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">Click on time slots to toggle availability.</p>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Session Notes</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                      type="text"
                      id="clientName"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700">Note</label>
                    <textarea
                      id="noteContent"
                      rows={5}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    ></textarea>
                  </div>
                  <button 
                    onClick={() => handleAddSessionNote("Mock Client", "This is a mock note content.")} // Replace with actual input values
                    className="px-6 py-2 bg-[#ff7a01] text-white rounded-md hover:bg-[#ff9333] transition">
                    Save Note
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">Existing Notes</h2>
              <div className="grid gap-4">
                {sessionNotes.length > 0 ? (
                  sessionNotes.map(note => (
                    <div key={note.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-xl font-medium">{note.clientName} - {note.date}</h3>
                      <p className="text-gray-600">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No session notes yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="flex h-[600px] bg-white rounded-lg shadow-sm border border-gray-100">
              {/* Chat List (Clients) */}
              <div className="w-1/3 border-r border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium">Conversations</h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {clientsForChat.map(client => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClientForChat(client.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition
                        ${selectedClientForChat === client.id ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        {/* <img src={client.image} alt={client.name} className="w-12 h-12 rounded-full object-cover" /> */}
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">{client.name.charAt(0)}</div>
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <p className="text-sm text-gray-500">Last message...</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col">
                {selectedClientForChat ? (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium">
                        {clientsForChat.find(c => c.id === selectedClientForChat)?.name}
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

          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-600">Settings content will go here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
