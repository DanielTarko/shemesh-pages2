"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

type Answers = {
    [key: string]: string | string[];
};

type Step = {
    type: "radio" | "checkbox" | "text" | "select" | "file";
    question: string;
    sub?: string;
    options?: string[] | ((answers: Answers) => string[]);
    key: string;
    placeholder?: string;
    optional?: boolean;
    showIf?: (answers: Answers) => boolean;
};

const steps: Step[] = [
    // SECTION 1: Basic Info
    {
        type: "text",
        question: "Full name",
        key: "fullName",
    },
    {
        type: "text",
        question: "Email address",
        key: "email",
    },
    {
        type: "text",
        question: "Phone number",
        key: "phone",
        optional: true
    },
    {
        type: "select",
        question: "Location / Time zone",
        key: "timezone",
        options: [
            "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00",
            "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00",
            "UTC-02:00", "UTC-01:00", "UTC+00:00", "UTC+01:00", "UTC+02:00",
            "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+05:30", "UTC+06:00",
            "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
            "UTC+12:00"
        ]
    },
    {
        type: "checkbox",
        question: "Languages spoken fluently",
        key: "languages",
        options: [
            "English", "Spanish", "French", "German", "Mandarin",
            "Arabic", "Hebrew", "Russian", "Portuguese", "Other"
        ]
    },

    // SECTION 2: Coaching Credentials
    {
        type: "checkbox",
        question: "What type of coach are you?",
        sub: "Select all that apply",
        key: "coachType",
        options: [
            "Life Coach",
            "Career Coach",
            "Executive / Leadership Coach",
            "Health & Wellness Coach",
            "Financial Coach",
            "Relationship Coach",
            "Mindset / Confidence Coach",
            "Purpose / Spiritual Coach",
            "Student / Academic Coach",
            "Other"
        ]
    },
    {
        type: "radio",
        question: "Are you certified?",
        key: "certification",
        options: [
            "Yes, I have ICF or equivalent certification",
            "Yes, I'm certified but not through ICF",
            "No formal certification, but I have significant experience",
            "Currently in training"
        ]
    },
    {
        type: "text",
        question: "Please list your certifications (if any)",
        key: "certifications",
        placeholder: "List your certifications and credentials"
    },
    {
        type: "radio",
        question: "How many years have you been coaching professionally?",
        key: "experience",
        options: [
            "Less than 1 year",
            "1–3 years",
            "3–5 years",
            "5+ years"
        ]
    },
    {
        type: "text",
        question: "Do you have a specialty or niche you focus on?",
        key: "specialty",
        optional: true,
        placeholder: "Describe your specialty or niche"
    },

    // SECTION 3: Logistics & Preferences
    {
        type: "checkbox",
        question: "What's your typical price per session (USD)?",
        key: "pricing",
        options: [
            "Under $60",
            "$60–$90",
            "$90–$120",
            "$120+",
            "I offer sliding scale options",
            "I offer package rates"
        ]
    },
    {
        type: "checkbox",
        question: "What formats do you offer?",
        sub: "Select all that apply",
        key: "formats",
        options: [
            "Video",
            "Phone",
            "Messaging",
            "In-person (location-specific)"
        ]
    },
    {
        type: "checkbox",
        question: "When are you generally available for sessions?",
        sub: "Select all that apply",
        key: "availability",
        options: [
            "Weekday mornings",
            "Weekday afternoons",
            "Weekday evenings",
            "Weekends",
            "Flexible"
        ]
    },
    {
        type: "text",
        question: "Do you have any gender or religious preference for clients?",
        key: "clientPreferences",
        optional: true,
        placeholder: "e.g. 'Prefer women clients' / 'Open to all faiths'"
    },

    // SECTION 4: Coaching Style & Values
    {
        type: "checkbox",
        question: "How would you describe your coaching style?",
        sub: "Select up to 2",
        key: "coachingStyle",
        options: [
            "Gentle & supportive",
            "Structured & action-oriented",
            "Reflective & insight-based",
            "Challenging & direct",
            "Highly intuitive",
            "Trauma-informed",
            "Spiritually integrated",
            "Results-focused"
        ]
    },
    {
        type: "text",
        question: "What are the top 3 topics you love helping clients with?",
        key: "topics",
        placeholder: "e.g. 'Career transitions, confidence, purpose discovery'"
    },
    {
        type: "text",
        question: "What kind of clients do you work best with?",
        key: "idealClients",
        placeholder: "Describe your ideal clients"
    },
    {
        type: "text",
        question: "Any types of clients or issues you don't work with?",
        key: "clientLimitations",
        optional: true,
        placeholder: "e.g. 'I don't work with trauma or clinical depression'"
    },

    // SECTION 5: Admin & Agreement
    {
        type: "radio",
        question: "Do you offer a free consultation call before onboarding clients?",
        key: "freeConsultation",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        type: "checkbox",
        question: "Do you agree to our basic client-matching policies?",
        key: "policies",
        options: [
            "I agree to respond to client matches within 48 hours",
            "I agree to uphold confidentiality and professionalism",
            "I understand that therapy and coaching must be clearly distinguished",
            "I agree to flag any cases I feel are not a fit for coaching (e.g. clinical issues)"
        ]
    },
    {
        type: "file",
        question: "Please upload a photo and short bio (for client matching)",
        key: "photoAndBio",
        placeholder: "Upload your photo and write a short bio"
    }
];

const orange = "#ff7a01";

export default function HealthProfessionalOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showIntro, setShowIntro] = useState(true);

  const getVisibleSteps = () => {
    return steps.filter(s => !s.showIf || s.showIf(answers));
  };

  const visibleSteps = getVisibleSteps();
  const current = visibleSteps[step];

  const isStepValid = (): boolean => {
    if (!current) return false;
    if (current.optional) return true;
    
    const value = answers[current.key];
    
    switch (current.type) {
      case "text":
        return typeof value === "string" && value.trim().length > 0;
      case "radio":
        return typeof value === "string" && value.length > 0;
      case "checkbox":
        return Array.isArray(value) && value.length > 0;
      case "select":
        return typeof value === "string" && value.length > 0;
      case "file":
        return typeof value === "string" && value.length > 0;
      default:
        return false;
    }
  };

  const handleChange = (key: string, value: string) => {
    setAnswers(a => ({ ...a, [key]: value }));
  };

  const handleCheckbox = (key: string, option: string) => {
    setAnswers(a => {
      const currentValues = (a[key] as string[]) || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(o => o !== option)
        : [...currentValues, option];
      return { ...a, [key]: newValues };
    });
  };

  const handleFileUpload = (key: string, file: File) => {
    // Here you would typically handle file upload to your storage
    // For now, we'll just store the file name
    setAnswers(a => ({ ...a, [key]: file.name }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the answers to your backend
      // await fetch('/api/professional-onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(answers)
      // });

      router.push('/professional-dashboard');
    } catch (error) {
      console.error('Error submitting onboarding answers:', error);
    }
  };

  const handleNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setStep(s => Math.min(visibleSteps.length - 1, s + 1));
    }
  };

  const isFirst = step === 0;
  const isLast = step === visibleSteps.length - 1;
  const isCurrentStepValid = isStepValid();

  const progress = step / (visibleSteps.length - 1);
  const indicatorSize = 150;

  const getOptions = (step: Step): string[] => {
    if (!step.options) return [];
    if (typeof step.options === 'function') {
      return step.options(answers);
    }
    return step.options;
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans">
      <Header />
      {showIntro ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full">
          <div className="text-3xl md:text-4xl font-medium text-center mb-10 text-[#ff7a01] max-w-2xl">
            Welcome to our professional network! Let's get to know you better.
          </div>
          <button
            onClick={() => setShowIntro(false)}
            className="mt-4 px-10 py-5 rounded-full bg-[#ff7a01] text-white text-2xl font-medium shadow hover:bg-[#ff9333] transition"
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          {/* Sticky Progress Bar */}
          <div className="w-full flex flex-col items-center fixed top-[80px] left-0 z-50 bg-[#faf8f8] pt-4 pb-8">
            <div className="relative w-full max-w-4xl h-[48px] flex items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[8px] rounded-full bg-[#ffe5c2] overflow-hidden">
                <motion.div
                    className="h-full bg-[#ff7a01] rounded-full"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `calc(${progress * 100}% - ${indicatorSize / 2}px)`,
                  width: indicatorSize,
                  height: indicatorSize,
                  zIndex: 10,
                  pointerEvents: "none"
                }}
                animate={{ left: `calc(${progress * 100}% - ${indicatorSize / 2}px)` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <Image
                  src="/rocket.png"
                  alt="Progress"
                  width={indicatorSize}
                  height={indicatorSize}
                  className="drop-shadow-lg"
                  priority
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-[180px] pb-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
                
                <h2 className="text-4xl md:text-5xl font-medium text-center mb-8" style={{ color: orange }}>
                  {current.question}
                </h2>
                {current.sub && (
                  <div className="text-lg text-gray-600 mb-4 text-center">{current.sub}</div>
                )}

                {/* Text Input */}
                {current.type === "text" && (
                  <input
                    type="text"
                    placeholder={current.placeholder}
                    value={answers[current.key] as string || ""}
                    onChange={e => handleChange(current.key, e.target.value)}
                    className="w-[400px] max-w-full text-center text-2xl border-2 border-[#ff7a01] rounded-none py-8 px-4 mb-8 bg-white placeholder-gray-400 focus:outline-none focus:border-[#ff7a01] transition"
                  />
                )}

                {/* Checkbox Group */}
                {current.type === "checkbox" && (
                  <div className="flex flex-col gap-4 items-start mx-auto mb-8">
                    {getOptions(current).map((option: string) => (
                      <label key={option} className="flex items-center gap-4 text-2xl cursor-pointer">
                        <span
                          className={`w-7 h-7 border-2 rounded-sm flex items-center justify-center transition-all duration-200
                            ${(answers[current.key] as string[])?.includes(option) ? 'border-[#ff7a01] bg-[#ff7a01]' : 'border-[#ff7a01] bg-white'}
                          `}
                        >
                          {(answers[current.key] as string[])?.includes(option) && (
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                              <polyline points="4,11 8,15 16,6" stroke="white" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={(answers[current.key] as string[])?.includes(option) || false}
                          onChange={() => handleCheckbox(current.key, option)}
                          className="hidden"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Radio Group */}
                {current.type === "radio" && (
                  <div className="flex flex-col gap-4 items-start mx-auto mb-8">
                    {getOptions(current).map((option: string) => (
                      <label key={option} className="flex items-center gap-4 text-2xl cursor-pointer">
                        <span
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200
                            ${answers[current.key] === option ? 'border-[#ff7a01]' : 'border-gray-400'}
                          `}
                        >
                          {answers[current.key] === option && (
                            <span className="w-4 h-4 rounded-full bg-[#ff7a01] block"></span>
                          )}
                        </span>
                        <input
                          type="radio"
                          checked={answers[current.key] === option}
                          onChange={() => handleChange(current.key, option)}
                          className="hidden"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Select Dropdown */}
                {current.type === "select" && (
                  <select
                    value={answers[current.key] as string || ""}
                    onChange={e => handleChange(current.key, e.target.value)}
                    className="w-[400px] max-w-full text-center text-2xl border-2 border-gray-400 py-4 px-4 mb-8 bg-white focus:outline-none focus:border-[#ff7a01] transition"
                  >
                    <option value="" disabled>Select an option</option>
                    {getOptions(current).map((option: string) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {/* File Upload */}
                {current.type === "file" && (
                  <div className="flex flex-col items-center gap-4 w-[400px] max-w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(current.key, file);
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="w-full text-center text-2xl border-2 border-[#ff7a01] rounded-none py-8 px-4 mb-4 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      {answers[current.key] ? 'Change Photo' : 'Upload Photo'}
                    </label>
                    {answers[current.key] && (
                      <div className="text-lg text-gray-600">
                        Selected: {answers[current.key]}
                      </div>
                    )}
                    <textarea
                      placeholder="Write a short bio..."
                      value={answers[`${current.key}_bio`] as string || ""}
                      onChange={e => handleChange(`${current.key}_bio`, e.target.value)}
                      className="w-full text-center text-xl border-2 border-[#ff7a01] rounded-none py-4 px-4 mb-8 bg-white placeholder-gray-400 focus:outline-none focus:border-[#ff7a01] transition min-h-[120px]"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Navigation Buttons */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-[#faf8f8] py-6 flex justify-center">
            <div className="w-full max-w-4xl flex justify-between items-center">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={isFirst}
                className={`rounded-full px-12 py-6 text-2xl font-medium transition
                  ${isFirst
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff7a01] text-white hover:bg-[#ff7a10]'}
                `}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isCurrentStepValid}
                className={`rounded-full px-12 py-6 text-2xl font-medium transition
                  ${!isCurrentStepValid
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff7a01] text-white hover:bg-[#ff7a10]'}
                `}
              >
                {isLast ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}