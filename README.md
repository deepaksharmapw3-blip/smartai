# 🏥 Smart Health Care — Monorepo

An AI-powered smart health care application built with **Next.js** (frontend) and **FastAPI + Google Gemini** (backend).

---

## 📁 Project Structure

```
smart-health-care-monorepo/
├── frontend/          # Next.js 16 + React 19 + TypeScript + TailwindCSS
│   ├── app/           # Next.js App Router pages & layouts
│   ├── components/    # Reusable React components
│   ├── public/        # Static assets
│   └── package.json
├── backend/           # FastAPI + Google Gemini AI
│   ├── services/
│   │   └── gemini.py  # Gemini AI integration
│   ├── main.py        # FastAPI app entry point
│   └── test.py
├── docker-compose.yml # Run both services together
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.10+
- **Google Gemini API Key** (set in `backend/.env`)

---

### 1️⃣ Backend Setup (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GEMINI_API_KEY=your_api_key_here > .env

# Run the server
uvicorn main:app --reload --port 8000
```

The backend API will be available at **http://localhost:8000**

---

### 2️⃣ Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local if needed (e.g., to configure backend URL)
# echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local

# Run the development server
npm run dev
```

The frontend will be available at **http://localhost:3000**

---

### 3️⃣ Run with Docker Compose (Recommended)

```bash
# From the monorepo root
docker-compose up --build
```

This will start both services together:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## 🧩 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript  |
| Styling   | TailwindCSS 4                     |
| Backend   | FastAPI, Pydantic, Uvicorn        |
| AI        | Google Gemini 2.5 Flash           |
| PDF       | jsPDF                             |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable         | Description                   |
|-----------------|-------------------------------|
| `GEMINI_API_KEY` | Your Google Gemini API key   |

---

## 📜 API Endpoints

| Method | Endpoint   | Description                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Health check                       |
| POST   | `/predict` | Get AI health advice from symptoms |

### Example Request

```json
POST /predict
{
  "symptoms": "fever, headache, sore throat"
}
```

### Example Response

```json
{
  "response": "1. Possible Disease: ..."
}
```

---

## 🌐 Features

- 🩺 **Symptom Checker** — Describe symptoms and get AI-powered diagnosis
- 💊 **Medicine Reminder** — Track medications and reminders
- 📊 **Health Stats** — View personal health statistics
- 📋 **Report History** — Download health reports as PDF
- 🌍 **Multi-language** — AI responds in the user's preferred language

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See individual packages for license details.
