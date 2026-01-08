from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main import search_topic, summarize_info

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummaryItem(BaseModel):
    text: str
    source: str

class ResearchRequest(BaseModel):
    topic: str

class ResearchResponse(BaseModel):
    summary: list[SummaryItem]

@app.get("/")
def root():
    return {"status": "Backend is running"}

@app.post("/research", response_model=ResearchResponse)
def research_topic(request: ResearchRequest):
    information = search_topic(request.topic)
    summary = summarize_info(information)
    return {"summary": summary}