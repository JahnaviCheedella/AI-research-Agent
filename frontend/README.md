# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Backend
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

# Frontend
cd frontend
npm install
npm start

🔄 End-to-End Flow
1. User types "quantum computing" and presses Enter
         ↓
2. Frontend dispatches runResearch({ topic, chatId })
         ↓
3. API call: POST http://localhost:8000/research { topic: "quantum computing" }
         ↓
4. Backend: Tavily searches the web → returns 5 URLs + content
         ↓
5. Backend: Gemini AI summarizes content into bullet points
         ↓
6. Backend returns: { summary: [{ text: "...", source: "url" }, ...] }
         ↓
7. Frontend: Redux store updated, ChatMessage component renders
         ↓
8. User sees AI summary with clickable source citations