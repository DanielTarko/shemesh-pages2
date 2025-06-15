"use client";
import { useState } from "react";
import Header from "../components/Header"; // Assuming a shared Header component
import Link from "next/link";
import Image from "next/image";

type Employee = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  sessionsBooked: number;
};

type UsageData = {
  totalEmployees: number;
  activeEmployees: number;
  totalSessionsBooked: number;
  averageSessionsPerEmployee: number;
  monthlyActiveUsers: number;
};

type BillingInfo = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "employees" | "settings">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    cardNumber: "**** **** **** 1234",
    expirationDate: "12/25",
    cvv: "***",
    billingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
    },
  });
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");

  // Mock Data
  const employees: Employee[] = [
    { id: "e1", name: "Alice Smith", email: "alice.s@example.com", status: "Active", sessionsBooked: 5 },
    { id: "e2", name: "Bob Johnson", email: "bob.j@example.com", status: "Inactive", sessionsBooked: 0 },
    { id: "e3", name: "Charlie Brown", email: "charlie.b@example.com", status: "Active", sessionsBooked: 12 },
    { id: "e4", name: "Diana Prince", email: "diana.p@example.com", status: "Active", sessionsBooked: 8 },
    { id: "e5", name: "Eve Adams", email: "eve.a@example.com", status: "Inactive", sessionsBooked: 2 },
  ];

  const usageData: UsageData = {
    totalEmployees: 50,
    activeEmployees: 35,
    totalSessionsBooked: 120,
    averageSessionsPerEmployee: 2.4,
    monthlyActiveUsers: 30,
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    
  };


  const handleAccountSettings = () => {
 
  };

  const handleAddEmployee = () => {
    if (newEmployeeName.trim() === "" || newEmployeeEmail.trim() === "") return;

    const newEmployee: Employee = {
      id: `e${employees.length + 1}`,
      name: newEmployeeName,
      email: newEmployeeEmail,
      status: "Active", // Default status for new employees
      sessionsBooked: 0,
    };

    // In a real application, you would send this to your backend and then update state
    // For now, we'll just add it to the mock data. Note: this won't persist on refresh.
    employees.push(newEmployee); // Directly modify mock array for simplicity

    setNewEmployeeName("");
    setNewEmployeeEmail("");
    setShowAddEmployeeModal(false);
    
  };
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Link href="/" >
            <Image src="/orangelogo.png" alt="Unmind Logo" width={90} height={32} />
        </Link>
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

      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="w-64 bg-white shadow-md p-6">
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "dashboard" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Dashboard
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("employees")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeTab === "employees" ? "bg-[#ff7a01] text-white" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  Employees
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
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-500">Total Employees</h3>
                  <p className="text-4xl font-bold text-[#ff7a01] mt-2">{usageData.totalEmployees}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-500">Active Employees</h3>
                  <p className="text-4xl font-bold text-[#ff7a01] mt-2">{usageData.activeEmployees}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-500">Total Sessions Booked</h3>
                  <p className="text-4xl font-bold text-[#ff7a01] mt-2">{usageData.totalSessionsBooked}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-500">Avg. Sessions per Employee</h3>
                  <p className="text-4xl font-bold text-[#ff7a01] mt-2">{usageData.averageSessionsPerEmployee}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-500">Monthly Active Users</h3>
                  <p className="text-4xl font-bold text-[#ff7a01] mt-2">{usageData.monthlyActiveUsers}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Employees</h1>
              <div className="flex justify-between items-center mb-6">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-[#ff7a01]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  onClick={() => setShowAddEmployeeModal(true)}
                  className="px-6 py-2 bg-[#ff7a01] text-white rounded-md hover:bg-[#ff9333] transition">
                  + Add Employee
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions Booked</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{employee.sessionsBooked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={billingInfo.cardNumber}
                      onChange={(e) => setBillingInfo({ ...billingInfo, cardNumber: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                      type="text"
                      id="expirationDate"
                      value={billingInfo.expirationDate}
                      onChange={(e) => setBillingInfo({ ...billingInfo, expirationDate: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      value={billingInfo.cvv}
                      onChange={(e) => setBillingInfo({ ...billingInfo, cvv: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Billing Address</h3>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                    <input
                      type="text"
                      id="street"
                      value={billingInfo.billingAddress.street}
                      onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: { ...billingInfo.billingAddress, street: e.target.value } })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      value={billingInfo.billingAddress.city}
                      onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: { ...billingInfo.billingAddress, city: e.target.value } })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      id="state"
                      value={billingInfo.billingAddress.state}
                      onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: { ...billingInfo.billingAddress, state: e.target.value } })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      id="zip"
                      value={billingInfo.billingAddress.zip}
                      onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: { ...billingInfo.billingAddress, zip: e.target.value } })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                    />
                  </div>
                  <div className="mt-6">
                    <button className="px-6 py-2 bg-[#ff7a01] text-white rounded-md hover:bg-[#ff9333] transition">
                      Update Billing Information
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="employeeName"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="employeeEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="employeeEmail"
                  value={newEmployeeEmail}
                  onChange={(e) => setNewEmployeeEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff7a01] focus:border-[#ff7a01] sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-[#ff7a01] text-white rounded-md hover:bg-[#ff9333] transition"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
