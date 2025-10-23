
# URL Shortner

A simple and efficient **URL Shortener** built with **FastAPI (Backend)** and **React.js (Frontend)**.  
It allows users to shorten long URLs into compact, shareable links.

## Features

🔐 Secure and fast URL shortening  
- 🌐 RESTful API built with FastAPI  
- ⚛️ Modern UI built with React + Vite  
- 🗃️ Database integration using PostgreSQL / MySQL  
- 🔁 Redirect users to original URLs instantly  
- ⚙️ Environment variable support via `.env`  
- 🧩 Modular and clean code structure
Url-Shortner/

│
├── backend-urls/

│   ├── main.py

│   ├── models.py

│   ├── schemas.py

│   ├── crud.py


│   ├── database.py

│   └── requirements.txt
│
├── frontend-url/

│   ├── src/

│   │   ├── App.jsx

│   │   ├── main.jsx

│   │   └── components/

│   ├── package.json

│   ├── vite.config.js

│   └── public/
│
└── README.md
## Author

👤 **Author:** Raghu Ram  
🌐 **GitHub:** [raghuram-007](https://github.com/raghuram-007)  



![Author](https://img.shields.io/badge/Author-Raghu%20Ram-blue?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-raghuram--007-black?style=for-the-badge&logo=github&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## Tech Stack

**Frontend:** React.js (Vite) ,Tailwindcss 
**Backend:** FastAPI  
**Database:** PostgreSQL   

 ⚙️ Setup Instructions

### 🧩 1. Clone the repository
```bash
git clone https://github.com/raghuram-007/Url-Shortner.git
cd Url-Shortner

Setup backend (FastAPI)
python -m venv venv
venv\Scripts\activate        # On Windows
pip install -r requirements.txt
uvicorn main:app --reload

Setup frontend (React)
cd frontend-url
npm install
npm run dev
