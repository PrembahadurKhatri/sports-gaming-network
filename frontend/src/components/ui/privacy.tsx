import { useState } from "react";
import "./privacy.css";

const privacyPolicies = [
  {
    question: "1. Information We Collect",
    answer:
      "We collect your name, email address, profile picture, phone number (optional), location, sports preferences, skill level, and account information when you register on Sports & Gaming Network.",
  },
  {
    question: "2. How We Use Your Information",
    answer:
      "Your information is used to help you discover teammates, recommend nearby players and teams, improve user experience, send notifications, and maintain platform security.",
  },
  {
    question: "3. Location Information",
    answer:
      "If you allow location access, we use it to show nearby players, teams, grounds, and tournaments. You can disable location access anytime from your device settings.",
  },
  {
    question: "4. Sharing of Information",
    answer:
      "We never sell your personal information. Basic profile information may be visible to other users depending on your privacy settings.",
  },
  {
    question: "5. Account Security",
    answer:
      "Passwords are securely encrypted. We recommend using a strong password and never sharing your login credentials.",
  },
  {
    question: "6. Cookies",
    answer:
      "We use cookies to keep you logged in, remember your preferences, and improve website performance.",
  },
  {
    question: "7. Third-Party Services",
    answer:
      "PlayLink may use trusted third-party services such as Google Authentication, Cloudinary, or payment providers to improve functionality.",
  },
  {
    question: "8. User Content",
    answer:
      "Photos, team information, tournament details, and posts uploaded by users remain their responsibility. Offensive or illegal content may be removed.",
  },
  {
    question: "9. Data Retention",
    answer:
      "Your account information is stored until you request deletion or permanently delete your account.",
  },
  {
    question: "10. Contact Us",
    answer:
      "If you have any questions regarding this Privacy Policy, please contact us at support@playlink.com.",
  },
];

const Privacy = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="privacy-page">
      <h1 className="privacy-title bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Privacy Policy</h1>
      <p className="privacy-subtitle">
        Your privacy is important to us. Learn how Sports and Gaming Network collects, uses, and
        protects your information.
      </p>

      <div className="policies-container">
        {privacyPolicies.map((policy, index) => (
          <div key={index} className="privacy-card">
            <div
              className={`policies-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAnswer(index)}
            >
              <span>{policy.question}</span>

              <span className="plus">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="policies-answer">
                {policy.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;