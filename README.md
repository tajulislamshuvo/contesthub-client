🏆 ContestHub – Online Contest Management Platform

ContestHub is a full-stack online contest platform where users can participate in contests, creators can host and manage contests, and admins can oversee the entire system.
The platform is designed to encourage fair competition, creativity, and skill-based participation.

🔗 Live Website

(Add your deployed website link here)

📌 Features Overview
👤 User Roles

ContestHub supports three distinct roles:

👥 User

Browse and explore all approved contests

Participate in contests

View personal submissions

View transaction/payment history

See contest winners for motivation

🎨 Creator

Create and publish contests

View and manage own contests

Review contest submissions

Track participants and engagement

🛡️ Admin

Approve or reject contests

Delete inappropriate contests

Manage users

Assign roles (Admin / Creator)

Monitor platform activities

🧭 Dashboard Overview (Role-Based)

Each role has a separate dashboard overview with quick-access cards:

User Dashboard

Total participations

Total submissions

Transaction history

Recent activity

Creator Dashboard

Total contests created

Total submissions received

Active contests

Contest performance insights

Admin Dashboard

Pending contests

Total users

Platform statistics

Role management shortcuts

🏅 Winner Showcase

Displays recent contest winners

Shows unique winners (no duplicate emails)

Includes motivational ContestHub-focused messages

Responsive carousel using Swiper

Helps inspire new participants

🔍 Contest Search

Search contests by type

Real-time backend-powered search

Case-insensitive matching

Displays “No contest found” message if empty

💳 Payments & Transactions

Secure payment handling

User-specific transaction history

Payment status tracking

Integrated with backend APIs

🎨 UI & Design

Fully responsive design (Mobile, Tablet, Desktop)

Blue-themed UI matching ContestHub branding

Clean dashboard cards

Smooth animations with Framer Motion

Carousel effects using Swiper.js

🛠️ Tech Stack
Frontend

React.js

React Router

Tailwind CSS

TanStack Query (React Query)

Axios

Framer Motion

Swiper.js

Backend

Node.js

Express.js

MongoDB

REST API architecture

Authentication

Role-based access control

Protected routes



📂 Project Structure (Frontend)
src/
│── Components/
│   ├── ContestCard/
│   ├── WinnerCard/
│   ├── Spinner/
│
│── Pages/
│   ├── Home/
│   ├── Dashboard/
│   ├── AllContest/
│
│── Hooks/
│   ├── useAuth.js
│   ├── useAxiosSecure.js
│
│── Routes/
│   ├── routes.jsx
│
│── App.jsx
│── main.jsx

⚙️ Backend API Endpoints (Sample)
GET    /contests?status=approved
GET    /contest-winner
GET    /payments?customerEmail=email
GET    /search?search=text
POST   /contests
PATCH  /contests/:id





📈 Future Improvements

Email notifications for winners

Contest ranking system

Advanced analytics dashboard



Comment system on contests

🤝 Contribution

Contributions are welcome!

Fork the repository

Create a new branch

Commit changes

Submit a pull request

🧑‍💻 Author

Tajul islam shuvo
Full Stack Developer
ContestHub Project

⭐ Acknowledgements

Tailwind CSS

React Query

Swiper.js

Framer Motion

MongoDB

