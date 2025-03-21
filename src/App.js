import React, { useState, useEffect } from "react";
import "./styles.css";

const levels = [
  {
    level: 1,
    attacks: [
      { id: 1, sender: "support@securebank.com", scenario: "We've detected suspicious activity on your account. Click here to verify your login immediately.", isThreat: true },
      { id: 2, sender: "promo@luckywinner.com", scenario: "Exclusive offer! You've been selected for a free iPhone giveaway. Claim now!", isThreat: true },
      { id: 3, sender: "security@company.com", scenario: "Urgent! We detected unusual activity. Reset your password now using this secure link.", isThreat: true },
      { id: 4, sender: "friend@example.com", scenario: "Hey! Check out this hilarious meme I found.", isThreat: false },
      { id: 5, sender: "it-support@company.com", scenario: "A critical security update is scheduled for tonight. Please connect to VPN to receive it.", isThreat: false },
      { id: 6, sender: "newsletter@news.com", scenario: "Daily news digest: Read today's top stories here.", isThreat: false },
      { id: 7, sender: "billing@streamflix.com", scenario: "Your payment failed. Update your details immediately to avoid service disruption.", isThreat: true },
    ],
  },
  {
    level: 2,
    attacks: [
      { id: 8, sender: "+44 7700 900123", scenario: "This is your mobile carrier. Click this link to claim a free data pack before it expires.", isThreat: true },
      { id: 9, sender: "+1 (555) 345-6789", scenario: "Your tax refund is ready! Click this link to claim it before the deadline.", isThreat: true },
      { id: 10, sender: "appstore@verified.com", scenario: "Your friend recommended this app. Download it from the official store here.", isThreat: false },
      { id: 11, sender: "+61 400 123 456", scenario: "A business partner has shared a confidential document. Open the attachment.", isThreat: true },
      { id: 12, sender: "hr@yourcompany.com", scenario: "We have updated our employee portal. Log in via the company intranet.", isThreat: false },
    ],
  },
  {
    level: 3,
    attacks: [
      { id: 13, sender: "+81 901 234 567 (Kenji Takahashi, Business Partner)", scenario: "Hey, can you send me the revenue report? It's urgent.", isThreat: true },
      { id: 14, sender: "refunds@gov-tax.com", scenario: "You are eligible for a $500 tax refund! Click here to claim now.", isThreat: true },
      { id: 15, sender: "+1 (555) 987-6543 (Emma from IT Security)", scenario: "Hey, can you share your screen? I need to check a security issue.", isThreat: true },
      { id: 16, sender: "Company IT Helpdesk <it-support@company.com>", scenario: "Reminder: Your work laptop requires a security update. Connect to VPN for an automatic update.", isThreat: false },
      { id: 17, sender: "Bank Customer Support <support@securebank.com>", scenario: "We have detected unusual transactions. Please verify your OTP now.", isThreat: true },
    ],
  },
  {
    level: 4,
    attacks: [
      { id: 18, sender: "sales@premiumsoftware.com", scenario: "Limited-time offer! Click here to get 90% off premium software!", isThreat: true },
      { id: 19, sender: "no-reply@bank-secure.com", scenario: "Your bank has updated its login page. Log in using this link.", isThreat: true },
      { id: 20, sender: "security@browser.com", scenario: "Your browser warns that this site may be unsafe. Do you want to proceed?", isThreat: true },
      { id: 21, sender: "offers@trustedbrand.com", scenario: "A reputable brand sends a legitimate promotional offer.", isThreat: false },
      { id: 22, sender: "billing@streamflix.com", scenario: "Update your payment details via the provided link to avoid service disruption.", isThreat: true },
    ],
  },
  {
    level: 5,
    attacks: [
      {
        id: 23,
        sender: "LinkedIn <notifications@linkedin.com>",
        scenario: "Someone viewed your profile! Your profile has been viewed 27 times in the last week. Upgrade to Premium to see who's interested in you.",
        isThreat: false
      },
      {
        id: 24,
        sender: "Microsoft 365 <security@microsoft.com>",
        scenario: "Your Microsoft 365 account password will expire in 24 hours. Click here to keep your current password: https://microsoft-365-security.com/retain-password",
        isThreat: true
      },
      {
        id: 25,
        sender: "CEO <ceo.name@company-corp.net>",
        scenario: "I need you to purchase some gift cards for our clients ASAP. This is urgent and confidential. Reply to this email for details.",
        isThreat: true
      },
      {
        id: 26,
        sender: "Zoom Meeting <no-reply@zoom.us>",
        scenario: "You have a scheduled meeting with HR in 5 minutes. Join now: https://zoom.us/j/123456789",
        isThreat: false
      },
      {
        id: 27,
        sender: "DocuSign <dse@docusign.net>",
        scenario: "URGENT: Please review and sign the updated company policy document within 24 hours to maintain system access.",
        isThreat: true
      }
    ]
  },
  {
    level: 6,
    attacks: [
      {
        id: 28,
        sender: "Security Team <security@company.com>",
        scenario: "We've detected unauthorized access to shared documents. Please verify your access by installing this security certificate: security-cert.exe",
        isThreat: true
      },
      {
        id: 29,
        sender: "GitHub <noreply@github.com>",
        scenario: "Security Alert: Your repository has 3 critical vulnerabilities. Review and update your dependencies.",
        isThreat: false
      },
      {
        id: 30,
        sender: "AWS Billing <aws-billing@amazon.com>",
        scenario: "Your AWS account has unusual usage patterns resulting in $5,000+ charges. Review activity: https://aws.amazon.com/billing/",
        isThreat: false
      },
      {
        id: 31,
        sender: "+1 (555) 123-4567",
        scenario: "ALERT: Your phone number will be deactivated. Respond Y to verify identity or N to cancel service.",
        isThreat: true
      },
      {
        id: 32,
        sender: "Slack <feedback@slack.com>",
        scenario: "Your Slack workspace requires immediate security update. Download the latest version: slack-update.exe",
        isThreat: true
      }
    ]
  }
];

export default function CyberShieldGame() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showLevelScore, setShowLevelScore] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", isCorrect: null });
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentLevel = levels[currentLevelIndex];
  const currentScenario = currentLevel.attacks[currentScenarioIndex];

  const getFeedbackMessage = (isCorrect, isThreat) => {
    if (isCorrect) {
      return isThreat 
        ? "Great catch! This was indeed a phishing attempt." 
        : "Correct! This was a legitimate message.";
    }
    return isThreat 
      ? "Oops! This was actually a phishing attempt. Look out for suspicious links and urgent requests." 
      : "This was actually safe. Remember to balance security with usability.";
  };

  const handleResponse = (isThreatSelected) => {
    let newTotalScore = totalScore;
    const isCorrect = currentScenario.isThreat === isThreatSelected;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      newTotalScore += 1;
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setFeedback({
      message: getFeedbackMessage(isCorrect, currentScenario.isThreat),
      isCorrect
    });
    setShowFeedback(true);

    // Hide feedback after 3 seconds
    setTimeout(() => {
      setShowFeedback(false);
      if (currentScenarioIndex < currentLevel.attacks.length - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
      } else {
        setShowLevelScore(true);
      }
    }, 3000);

    setTotalScore(newTotalScore);
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setCurrentScenarioIndex(0);
      setScore(0);
      setShowLevelScore(false);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="container">
      <div className="game-header">
        <h1>CyberShield: Defend the Network</h1>
        <div className="stats">
          <div className="stat-item">Level: {currentLevel.level}</div>
          <div className="stat-item">Score: {totalScore}</div>
          <div className="stat-item">Streak: {streak}</div>
        </div>
      </div>
      
      {gameOver ? (
        <div className="result">
          <h2>Game Over!</h2>
          <p>Your Total Score: {totalScore}/{levels.reduce((sum, level) => sum + level.attacks.length, 0)}</p>
          <div className="achievement">
            {totalScore >= levels.reduce((sum, level) => sum + level.attacks.length, 0) * 0.8 
              ? "🏆 Cybersecurity Expert!" 
              : totalScore >= levels.reduce((sum, level) => sum + level.attacks.length, 0) * 0.6 
                ? "🛡️ Security Specialist" 
                : "🎯 Security Trainee"}
          </div>
        </div>
      ) : showLevelScore ? (
        <div className="result">
          <h2>Level {currentLevel.level} Complete!</h2>
          <p>Score: {score}/{currentLevel.attacks.length}</p>
          <div className="level-feedback">
            {score === currentLevel.attacks.length 
              ? "🌟 Perfect Score! You're a phishing detection expert!" 
              : score >= currentLevel.attacks.length * 0.7 
                ? "👍 Good job! Keep practicing to improve." 
                : "📚 Keep learning! Review the common signs of phishing."}
          </div>
          <button className="next-btn" onClick={handleNextLevel}>
            Next Level
          </button>
        </div>
      ) : (
        <div className="game-content">
          <div className={`scenario-card ${showFeedback ? (feedback.isCorrect ? 'correct' : 'incorrect') : ''}`}>
            <div className="scenario-header">
              <h2>Level {currentLevel.level}</h2>
              <div className="progress">
                Scenario {currentScenarioIndex + 1}/{currentLevel.attacks.length}
              </div>
            </div>
            <div className="message-content">
              <h3>From: {currentScenario.sender}</h3>
              <p>{currentScenario.scenario}</p>
            </div>
            {showFeedback ? (
              <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                {feedback.message}
              </div>
            ) : (
              <div className="buttons">
                <button className="threat-btn" onClick={() => handleResponse(true)}>
                  ⚠️ Potential Threat
                </button>
                <button className="safe-btn" onClick={() => handleResponse(false)}>
                  ✅ Safe
                </button>
              </div>
            )}
          </div>
          <div className="tips">
            <h3>🔍 Remember to check for:</h3>
            <ul>
              <li>Suspicious sender addresses</li>
              <li>Urgent or threatening language</li>
              <li>Unusual requests</li>
              <li>Grammar and spelling errors</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
