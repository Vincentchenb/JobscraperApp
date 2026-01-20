# JobPulse 🚀 
### Automated Desktop Job Aggregator & AI Matcher

JobPulse is a high-performance cross-platform desktop application built with **Electron** and **React**. It streamlines the job search process by aggregating listings from multiple platforms via RESTful APIs and using **Gemini AI** to provide real-time compatibility scores between job descriptions and user resumes.

---

## 📸 Project Preview
![App Dashboard Placeholder](screenshots/dashboard-preview.png)
> *[Instructions: Replace the image above with a screenshot of your main app screen]*

---

## ✨ Key Features
- **Centralized Job Feed:** Aggregates real-time data from LinkedIn, Indeed, and Glassdoor using the Native Fetch API.
- **AI Compatibility Engine:** Leverages Gemini AI to analyze job descriptions and provide a 1-10 match score based on user skills.
- **Secure Onboarding:** Local user authentication and preference storage.
- **Local Persistence:** Uses SQLite for zero-latency data access and 100% user data privacy.
- **Native Notifications:** Desktop alerts for new jobs matching user-defined categories.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, TypeScript, Vite |
| **Backend** | Electron, Node.js |
| **Database** | SQLite (better-sqlite3) |
| **APIs** | Native Fetch API, JSearch (RapidAPI) |
| **AI/ML** | Google Gemini API (NLP) |

---

## 🏗️ Technical Architecture
JobPulse follows Electron security best practices by utilizing a **Multi-Process Architecture**:

1. **Main Process (Node.js):** Handles system-level tasks, SQLite database management, and AI/Job API requests.
2. **Preload Script:** A secure bridge that exposes specific, safe IPC (Inter-Process Communication) methods to the UI.
3. **Renderer Process (React):** A high-performance UI that manages application state and user interactions.

![Architecture Diagram](screenshots/architecture-diagram.png)
> *[Instructions: Add a diagram showing the flow between Electron Main, Preload, and React]*

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Vincentchenb/JobscraperApp.git](https://github.com/Vincentchenb/JobscraperApp.git)
   cd JobscraperApp/my-app
