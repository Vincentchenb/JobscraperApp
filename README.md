<img width="795" height="570" alt="image" src="https://github.com/user-attachments/assets/b30df34b-b007-48f5-924e-88c2bdb38445" /># JobPulse 🚀 
### Automated Desktop Job Aggregator & AI Matcher

JobScraper is a high-performance cross-platform desktop application built with **Electron** and **React**. It streamlines the job search process by aggregating listings from multiple platforms via RESTful APIs and using **Gemini AI** to provide real-time compatibility scores between job descriptions and user resumes.

---

## 📸 Project Preview
!(screenshots/dashboard-preview.png)
> <img width="795" height="570" alt="image" src="https://github.com/user-attachments/assets/7a8322d0-4862-43f2-8dfb-097cd82142f7" />


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

## 🏗️ Whats inside
JobPulse follows Electron security best practices by utilizing a **Multi-Process Architecture**:
my-app/
├── src/
│   ├── assets/              # Static assets (images, background art)
│   │   └── background.jpg   # App background image
│   ├── database.ts          # SQLite initialization and better-sqlite3 logic
│   ├── main.ts              # Electron Main Process (Node.js, API calls, DB I/O)
│   ├── preload.ts           # Secure IPC Bridge (Context Isolation layer)
│   ├── renderer.tsx         # React Entry Point (Vite Renderer Process)
│   ├── App.tsx              # Main React Component (UI State & Views)
│   └── index.css            # Global styles and Tailwind imports
├── .gitignore               # Excludes node_modules, .env, and jobs.db
├── forge.config.ts          # Electron Forge build configuration
├── index.html               # Vite entry HTML file
├── jobs.db                  # Local SQLite database (Auto-generated)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.main.config.ts      # Vite config for the Main process
├── vite.preload.config.ts   # Vite config for the Preload script
└── vite.renderer.config.ts  # Vite config for the React UI
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

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Set up environment variables:** Create a .env file in the root directory:
   ```Code Snippet
   GEMINI_API_KEY=your_gemini_key
   RAPID_API_KEY=your_jsearch_key
   
4. **Launch the application:**
   ```bash
   npm start
