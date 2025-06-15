"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Answers = {
    [key: string]: string | string[];
};

type PathType = 'therapist' | 'coach' | 'unsure';

type Step = {
    type: "radio" | "checkbox" | "text" | "select" | "button";
    question: string;
    sub?: string;
    options?: string[] | ((answers: Answers) => string[]);
    key: string;
    showIf?: (answers: Answers) => boolean;
    dynamicOptions?: (answers: Answers) => string[];
    dynamicQuestion?: (answers: Answers) => string;
    placeholder?: string;
    optional?: boolean;
};

const steps: Step[] = [
    {
        type: "radio",
        question: "What kind of support are you looking for right now?",
        options: [
          "I know I need a therapist",
          "I know I want a coach",
          "I'm not sure – help me figure it out"
        ],
        key: "pathSelection"
    },
    {
        type: "checkbox",
        question: "Which of these statements feels most true for you right now?",
        sub: "Select up to 3",
        options: [
          "I've been feeling anxious, down, or emotionally overwhelmed",
          "I want to build new habits and achieve personal goals",
          "I'm struggling with past experiences or trauma",
          "I want to improve my performance, mindset, or productivity",
          "I feel stuck and want clarity about my purpose or life direction",
          "I might need emotional healing before moving forward",
          "I'm functioning okay but want accountability to grow"
        ],
        key: "currentState",
        showIf: (answers: Answers) => answers.pathSelection === "I'm not sure – help me figure it out"
    },
    {
        type: "radio",
        question: "Based on your answers, you may benefit most from working with a",
        sub: "It's okay if you change your mind later",
        key: "recommendedPath",
        showIf: (answers: Answers) => answers.pathSelection === "I'm not sure – help me figure it out",
        dynamicQuestion: (answers: Answers) => {
            const emotionalOptions = [
                "I've been feeling anxious, down, or emotionally overwhelmed",
                "I'm struggling with past experiences or trauma",
                "I might need emotional healing before moving forward"
            ];
            const goalOptions = [
                "I want to build new habits and achieve personal goals",
                "I want to improve my performance, mindset, or productivity",
                "I'm functioning okay but want accountability to grow"
            ];
            
            const selected = answers.currentState as string[] || [];
            const emotionalCount = selected.filter(opt => emotionalOptions.includes(opt)).length;
            const goalCount = selected.filter(opt => goalOptions.includes(opt)).length;
            
            const recommendation = emotionalCount > goalCount ? "Therapist" : "Coach";
            return `Based on your answers, you may benefit most from working with a ${recommendation}. Does this recommendation feel right for you?`;
        },
        options: ["Yes", "No"]
    },
    {
        type: "radio",
        question: "Your age range:",
        options: [
            "Under 18",
            "18–24",
            "25–34",
            "35–44",
            "45+"
        ],
        key: "ageRange"
    },
    {
        type: "select",
        question: "Your time zone:",
        options: [
            "UTC-12:00",
            "UTC-11:00",
            "UTC-10:00",
            "UTC-09:00",
            "UTC-08:00",
            "UTC-07:00",
            "UTC-06:00",
            "UTC-05:00",
            "UTC-04:00",
            "UTC-03:00",
            "UTC-02:00",
            "UTC-01:00",
            "UTC+00:00",
            "UTC+01:00",
            "UTC+02:00",
            "UTC+03:00",
            "UTC+04:00",
            "UTC+05:00",
            "UTC+05:30",
            "UTC+06:00",
            "UTC+07:00",
            "UTC+08:00",
            "UTC+09:00",
            "UTC+10:00",
            "UTC+11:00",
            "UTC+12:00"
        ],
        key: "timezone"
    },
    {
        type: "checkbox",
        question: "When are you generally available for sessions?",
        sub: "select all that apply",
        options: [
            "Mornings",
            "Afternoons",
            "Evenings",
            "Weekends"
        ],
        key: "availability"
    },
    {
        type: "radio",
        question: "Do you prefer working with someone who shares your gender identity?",
        options: [
            "Male",
            "Female",
            "No preference"
        ],
        key: "genderPreference"
    },
    {
        type: "checkbox",
        question: "What are the main areas you'd like to focus on?",
        sub: "Select up to 3",
        options: (answers: Answers) => {
            const isTherapist = answers.pathSelection === "I know I need a therapist" || 
                              (answers.recommendedPath === "Therapist" && answers.confirmRecommendation === "Yes");
            
            return isTherapist ? [
                "Anxiety / Stress",
                "Depression / Mood",
                "Trauma / PTSD",
                "Relationships",
                "Grief or Loss",
                "Self-esteem",
                "Family or Parenting",
                "Life transitions",
                "Identity / Immigration",
                "Addiction or compulsions"
            ] : [
                "Career / Business clarity",
                "Productivity & time management",
                "Confidence & mindset",
                "Life purpose & direction",
                "Leadership or performance",
                "Wellness / Healthy habits",
                "Financial habits",
                "Relationship skills (non-clinical)",
                "Spiritual growth",
                "Student success / study skills"
            ];
        },
        key: "focusAreas"
    },
    {
        type: "radio",
        question: "What kind of approach works best for you?",
        options: [
            "Gentle & supportive",
            "Structured & action-oriented",
            "Insightful & reflective",
            "I'm not sure – open to anything"
        ],
        key: "approachPreference"
    },
    {
        type: "text",
        question: "What's your main goal for working with a {role}?",
        placeholder: "Example: 'I want to stop feeling anxious all the time' or 'I want help transitioning careers and staying accountable'",
        key: "mainGoal",
        dynamicQuestion: (answers: Answers) => {
            const isTherapist = answers.pathSelection === "I know I need a therapist" || 
                              (answers.recommendedPath === "Therapist" && answers.confirmRecommendation === "Yes");
            return `What's your main goal for working with a ${isTherapist ? 'Therapist' : 'Coach'}?`;
        }
    },
    {
        type: "text",
        question: "Anything else we should know to help match you better?",
        placeholder: "Optional - Share any additional information that might help us match you better",
        key: "additionalNotes",
        optional: true
    }
];

const orange = "#ff7a01";
const green = "#184d2b";

export default function UserOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showIntro, setShowIntro] = useState(true);
  const [showOurApproachDetails, setShowOurApproachDetails] = useState(false);

  const getVisibleSteps = () => {
    return steps.filter(s => !s.showIf || s.showIf(answers));
  };

  const visibleSteps = getVisibleSteps();
  const current = visibleSteps[step];

  const isStepValid = (): boolean => {
    if (!current) return false;
    
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

  const getQuestion = (step: Step): string => {
    if (step.dynamicQuestion) {
      return step.dynamicQuestion(answers);
    }
    return step.question;
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the answers to your backend
      // For example:
      // await fetch('/api/onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(answers)
      // });

      // For now, we'll just navigate to the next page
      router.push('/user-dashboard'); // or wherever you want to navigate to
    } catch (error) {
      console.error('Error submitting onboarding answers:', error);
      // Handle error appropriately
    }
  };

  const handleNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setStep(s => Math.min(visibleSteps.length - 1, s + 1));
    }
  };

  const handleNextIntro = () => {
    if (!showOurApproachDetails) {
      setShowOurApproachDetails(true);
    } else {
      setShowIntro(false);
      setShowOurApproachDetails(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f8] font-sans flex flex-col items-center">
      {showIntro ? (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          {/* Left Section - Text */}
          <div className="flex-1 flex flex-col justify-center p-16">
            <AnimatePresence mode="wait">
              {!showOurApproachDetails ? (
                <motion.div
                  key="initial-intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-medium text-[#184d2b] mb-8 leading-tight">
                    Welcome, Eitan! It only takes minutes, to get connected with great care.
                  </h1>
                  <div className="space-y-6 text-lg text-gray-700">
                    <div className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center border-2 border-[#184d2b] text-[#184d2b] rounded-full mr-4 mt-1 font-semibold">✓</span>
                      <div>
                        <p className="font-semibold">First, we'll explain Shemesh Health's approach</p>
                        <p>We recognize there isn't a one-size fits all model for mental health needs. That's why we take the time to get to know each other.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center border-2 border-[#184d2b] text-[#184d2b] rounded-full mr-4 mt-1 font-semibold">2</span>
                      <div>
                        <p className="font-semibold">Then, we'd like to talk about you</p>
                        <p>We'll ask you questions about your well-being and lifestyle preferences. Getting the right type of care means being honest with yourself and us.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center border-2 border-[#184d2b] text-[#184d2b] rounded-full mr-4 mt-1 font-semibold">3</span>
                      <div>
                        <p className="font-semibold">Last, you'll be matched to care on your schedule</p>
                        <p>Feeling your best shouldn't be stressful. We'll recommend you the highest clinical quality of care based on your unique needs.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="approach-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-medium text-[#184d2b] mb-8 leading-tight">
                    Our Approach to Your Well-being
                  </h1>
                  <div className="space-y-6 text-lg text-gray-700">
                    <p>At Shemesh Health, we believe in a personalized and holistic approach to mental health. We combine evidence-based practices with compassionate care to support you on your unique journey.</p>
                    <p>Our network includes diverse therapists and coaches specializing in a wide range of areas, ensuring you find the right fit for your specific needs and goals.</p>
                    <p>We prioritize your comfort and progress, offering flexible scheduling and a secure platform for confidential sessions. Your well-being is our top priority, and we're committed to providing the highest quality of care.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-12 flex items-center">
              <button
                onClick={showOurApproachDetails ? handleNextIntro : ()=>{setShowOurApproachDetails(true)}}
                className="px-8 py-4 rounded-md bg-[#ff7a01] text-white text-lg font-medium shadow hover:bg-[#ff9333] transition"
              >
                {!showOurApproachDetails ? "Next" : "Continue to Questions"}
              </button>
              <span className="ml-6 text-gray-600">
                {!showOurApproachDetails ? "Let's get to know each other" : "Understand our philosophy"}
              </span>
            </div>
          </div>

          {/* Right Section - Images */}
          <div className="flex-1 bg-gray-200 flex flex-col items-center justify-center p-8 md:p-16">
            {/* Placeholder for main image */}
            <Image src={"/handshake.webp"} alt="image" width="200" height="100" className="w-full h-64 md:h-96 bg-gray-400 rounded-lg mb-4"/>
            <div className="flex w-full gap-4">
              {/* Placeholders for smaller images */}
              <Image src={"/handshake.webp"} alt="image" width="200" height="100" className="w-1/2 h-32 bg-gray-400 rounded-lg"/>
              <Image src={"/handshake.webp"} alt="image" width="200" height="100" className="w-1/2 h-32 bg-gray-400 rounded-lg"/>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Sticky Progress Bar */}
          <div className="w-full flex flex-col items-center fixed top-0 left-0 z-50 bg-[#faf8f8] pt-4 pb-8">
            <div className="relative w-full max-w-4xl h-[48px] flex items-center">
              {/* Progress Bar */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[8px] rounded-full bg-[#ffe5c2] overflow-hidden">
                <motion.div
                    className="h-full bg-[#ff7a01] rounded-full"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
              {/* PNG Indicator */}
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
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-[90px] pb-[120px]">
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
                  {getQuestion(current)}
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