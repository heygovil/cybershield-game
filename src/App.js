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
      {
        id: 8,
        sender: "System Security <windows-defender@microsoft.windows-security.com>",
        scenario: "⚠️ MALWARE DETECTED! Your computer is infected with a virus. Download and run antivirus-cleaner.exe to remove threats immediately.",
        isThreat: true,
        type: "Malware Distribution"
      },
      {
        id: 9,
        sender: "CryptoLocker Warning <system@encrypted-files.com>",
        scenario: "Your files have been encrypted! Send 0.5 BTC to address 1A1zP1... within 24 hours to receive the decryption key.",
        isThreat: true,
        type: "Ransomware"
      },
      {
        id: 10,
        sender: "IT Support (John) <support@helpdesk.company.com>",
        scenario: "Hi, I'm new to IT support. Could you share your login credentials so I can help set up your new software?",
        isThreat: true,
        type: "Social Engineering"
      },
      {
        id: 11,
        sender: "+1 (555) 0123-4567",
        scenario: "ALERT: Unusual device login detected on your bank account. Reply with your account number and PIN to secure your account.",
        isThreat: true,
        type: "Smishing (SMS Phishing)"
      },
      {
        id: 12,
        sender: "Chrome Browser <no-reply@google.com>",
        scenario: "Your browser needs a critical security update. Install this extension to protect your passwords: chrome-security.extension",
        isThreat: true,
        type: "Malicious Browser Extension"
      },
      {
        id: 13,
        sender: "Network Scanner",
        scenario: "WARNING: Your WiFi network 'Coffee_Shop_Free' is unsecured. Anyone can view your internet traffic.",
        isThreat: false,
        type: "Security Alert"
      },
      {
        id: 14,
        sender: "Windows Firewall",
        scenario: "A program is requesting network access: Zoom Meeting Client (zoom.us). Allow or Block?",
        isThreat: false,
        type: "Legitimate Security Prompt"
      }
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
  const [confetti, setConfetti] = useState([]);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);

  const currentLevel = levels[currentLevelIndex];
  const currentScenario = currentLevel.attacks[currentScenarioIndex];
  const progress = ((currentScenarioIndex) / currentLevel.attacks.length) * 100;

  useEffect(() => {
    if (showScoreAnimation) {
      const timer = setTimeout(() => {
        setShowScoreAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showScoreAnimation]);

  const createConfetti = () => {
    const confettiCount = 50;
    const newConfetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2000);
  };

  const getEmojiReaction = (isCorrect) => {
    if (isCorrect) {
      return streak >= 3 ? "🎯" : "✨";
    }
    return "💡";
  };

  const getFeedbackMessage = (isCorrect, scenario) => {
    if (isCorrect) {
      if (scenario.isThreat) {
        const tips = {
          "Malware Distribution": "Good catch! Never download executable files (.exe) from unknown sources. Legitimate antivirus software doesn't distribute updates this way.",
          "Ransomware": "Excellent! Ransomware attacks often demand cryptocurrency payments. Always keep backups of your important files.",
          "Social Engineering": "Well done! Never share your credentials, even with IT staff. Legitimate IT support will never ask for your password.",
          "Smishing (SMS Phishing)": "Great job! Banks never request sensitive information via SMS. Always use official banking apps or websites.",
          "Malicious Browser Extension": "Perfect! Browser updates come through the browser itself, not via email. Only install extensions from official web stores.",
          "Phishing": "Good eye! This is a phishing attempt trying to steal your information. Always verify urgent requests through official channels."
        };
        return tips[scenario.type] || "Great catch! This was indeed a security threat.";
      }
      return "Correct! This is a legitimate message that requires appropriate action.";
    }
    
    const mistakes = {
      "Malware Distribution": "Be careful! This is a malware distribution attempt. Legitimate security software doesn't send executable files via email.",
      "Ransomware": "Watch out! This is a ransomware attack. Never pay the ransom - it doesn't guarantee file recovery.",
      "Social Engineering": "Be vigilant! This is a social engineering attack trying to manipulate you into sharing sensitive information.",
      "Smishing (SMS Phishing)": "Stay alert! This is an SMS phishing attempt. Never send sensitive information via text messages.",
      "Malicious Browser Extension": "Warning! This is attempting to trick you into installing malicious software. Browser updates come through the browser itself.",
      "Phishing": "Be careful! This was a phishing attempt. Always verify urgent requests through official channels."
    };
    return scenario.isThreat 
      ? (mistakes[scenario.type] || "This was actually a security threat. Always be cautious with unexpected messages.")
      : "This was actually safe. While it's good to be cautious, some security prompts are legitimate.";
  };

  const handleResponse = (isThreatSelected) => {
    let newTotalScore = totalScore;
    const isCorrect = currentScenario.isThreat === isThreatSelected;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      newTotalScore += 1;
      setStreak(prev => prev + 1);
      setShowScoreAnimation(true);
      if (streak >= 2) {
        createConfetti();
      }
    } else {
      setStreak(0);
    }

    setFeedback({
      message: getFeedbackMessage(isCorrect, currentScenario),
      isCorrect
    });
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentScenarioIndex < currentLevel.attacks.length - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
      } else {
        setShowLevelScore(true);
        if (score >= currentLevel.attacks.length * 0.8) {
          createConfetti();
        }
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
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: c.left,
            animationDuration: c.animationDuration,
            backgroundColor: c.backgroundColor
          }}
        />
      ))}
      
      <div className="game-header">
        <h1>CyberShield: Defend the Network</h1>
        <div className="stats">
          <div className="stat-item">
            Level: {currentLevel.level}
            <div className="level-badge">{currentLevel.level}</div>
          </div>
          <div className="stat-item">Score: {totalScore}</div>
          {streak >= 2 && (
            <div className="streak-counter">
              {streak} Streak
            </div>
          )}
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
          <button className="next-btn button-hover-effect" onClick={handleNextLevel}>
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
            
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${progress}%`,
                  '--progress-width': `${progress}%`
                }} 
              />
            </div>

            <div className="message-content">
              <h3>From: {currentScenario.sender}</h3>
              {currentScenario.type && (
                <div className="attack-type">
                  {currentScenario.type}
                </div>
              )}
              <p>{currentScenario.scenario}</p>
            </div>

            {showScoreAnimation && (
              <div 
                className="score-animation"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 40 + 30}%`
                }}
              >
                +1
              </div>
            )}

            {showFeedback ? (
              <>
                <div className="emoji-reaction">
                  {getEmojiReaction(feedback.isCorrect)}
                </div>
                <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                  {feedback.message}
                </div>
              </>
            ) : (
              <div className="buttons">
                <button className="threat-btn button-hover-effect" onClick={() => handleResponse(true)}>
                  ⚠️ Security Threat
                </button>
                <button className="safe-btn button-hover-effect" onClick={() => handleResponse(false)}>
                  ✅ Safe
                </button>
              </div>
            )}
          </div>

          <div className="tips">
            <h3>🔍 Security Tips:</h3>
            <ul>
              <li>Never download executable files (.exe) from emails</li>
              <li>Be suspicious of urgent or threatening messages</li>
              <li>Don't share passwords or sensitive info via email/SMS</li>
              <li>Verify requests through official channels</li>
              <li>Keep your software updated through official sources</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
