Tech Meetup 2026 — Backend API
A RESTful API built with Node.js, Express, and MongoDB powering the Tech Meetup 2026 event app. Handles attendee management, JWT authentication with refresh token rotation, rate limiting, input sanitization, and transactional emails.

🔗 Live API & Related Repos
• Live API: https://it-events-backend.onrender.com
• Frontend Repo: github.com/NifemiSoneye/IT-events-project
• Frontend Live: https://tech-event-teal.vercel.app

🛠 Tech Stack
• Node.js + Express + TypeScript — Server framework with full type safety
• MongoDB + Mongoose — NoSQL database with schema validation
• JWT (jsonwebtoken) — Access token (15min) + refresh token (7 days) with rotation
• bcrypt — Password hashing
• express-rate-limit — Brute-force protection on login route
• express-validator — Input sanitization and validation
• Resend — Transactional email on attendee registration
• cookie-parser — HttpOnly cookie handling for refresh tokens

📡 API Endpoints
Auth Routes — /auth
• POST / — Login (rate limited to 5 requests per 15 minutes)
• GET /refresh — Get new access token via refresh token cookie
• POST /logout — Clear refresh token and cookie
Attendee Routes — /api/attendees
• GET / — Get all attendees (public)
• POST / — Register new attendee + send confirmation email (public)
• PATCH /:id — Update attendee (protected)
• DELETE /:id — Delete attendee (protected)
• GET /analytics — Get registration stats (protected)

🔐 Security Features
• Refresh token rotation — old tokens invalidated on each refresh
• HttpOnly + Secure + SameSite=None cookies for cross-origin auth
• Rate limiting on login — 5 attempts per 15 minutes per IP
• Input sanitization on all POST/PATCH routes via express-validator
• CORS restricted to allowed origins only
• JWT verification middleware on all protected routes

🚀 Getting Started
Prerequisites
• Node.js 18+
• MongoDB Atlas account
• Resend account
Installation

1. Clone the repo:
   git clone https://github.com/NifemiSoneye/It-events-backend
2. Install dependencies:
   npm install
3. Add your .env file (see below)
4. Start dev server:
   npm run dev

🔐 Environment Variables
Create a .env file in the root:
NODE_ENV=development
DATABASE_URI=your_mongodb_atlas_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
RESEND_API_KEY=your_resend_api_key

☁️ Deployment
• Deployed on Render as a Node.js Web Service.
• Build command: npm install && npm run build && cp -r src/views dist/views && cp -r src/public dist/public
• Start command: node dist/server.js

👤 Author
GitHub: github.com/NifemiSoneye
