import React, { useState } from "react";
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
      { id: 6, sender: "newsletter@news.com", scenario: "Daily news digest: Read today’s top stories here.", isThreat: false },
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
];

export default function CyberShieldGame() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showLevelScore, setShowLevelScore] = useState(false);

  const currentLevel = levels[currentLevelIndex];
  const currentScenario = currentLevel.attacks[currentScenarioIndex];

  const handleResponse = (isThreatSelected) => {
    let newTotalScore = totalScore;

    if (currentScenario.isThreat === isThreatSelected) {
      setScore((prev) => prev + 1);
      newTotalScore += 1;
    }

    if (currentScenarioIndex < currentLevel.attacks.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setShowLevelScore(true);
    }

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
      <h1>CyberShield: Defend the Network</h1>
      {gameOver ? (
        <div className="result">
          <h2>Game Over!</h2>
          <p>Your Total Score: {totalScore}/{levels.reduce((sum, level) => sum + level.attacks.length, 0)}</p>
        </div>
      ) : showLevelScore ? (
        <div className="result">
          <h2>Level {currentLevel.level} Complete!</h2>
          <p>Score: {score}/{currentLevel.attacks.length}</p>
          <button className="next-btn" onClick={handleNextLevel}>
            Next Level
          </button>
        </div>
      ) : (
        <div className="scenario-card">
          <h2>Level {currentLevel.level}</h2>
          {currentScenario.sender && <h3>From: {currentScenario.sender}</h3>}
          <p>{currentScenario.scenario}</p>
          <div className="buttons">
            <button className="threat-btn" onClick={() => handleResponse(true)}>Potential Threat</button>
            <button className="safe-btn" onClick={() => handleResponse(false)}>Safe</button>
          </div>
        </div>
      )}
    </div>
  );
}
