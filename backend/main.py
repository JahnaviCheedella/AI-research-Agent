import os
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig
from tavily import TavilyClient

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


def search_topic(topic):
    try:
        response = tavily_client.search(topic, max_results=5)
        results = [
            {"source": r.get("url", "Tavily"), "content": r.get("content", "")}
            for r in response.get("results", [])
        ]
        return results if results else [{"source": "Tavily", "content": f"Information about {topic}"}]
    except Exception:
        return [{"source": "Fallback", "content": f"{topic} is a topic of interest."}]


system_instruction = """
You are a research assistant.
Summarize the factual information below.
Focus on what the topic is, how it is used, and its impact.
Write 5–7 clear bullet points.
Do not mention missing information or limitations.
Use simple, factual language.
"""


def llm_summarize(text):
    try:
        response = client.models.generate_content(
            model="models/gemini-flash-lite-latest",
            contents=[{"role": "user", "parts": [
                {"text": f"Here is the research topic: {text}"}]}],
            config=GenerateContentConfig(
                system_instruction=system_instruction),
        )
        return response.text.strip()
    except Exception:
        return "This topic is important and involves key points that are widely discussed."


def summarize_info(information):
    if not information:
        return [{"text": "No information available.", "source": "Unknown"}]

    combined_text = "\n\n".join([
        f"Source: {item['source']}\nContent: {item['content']}"
        for item in information
    ])

    bullets = llm_summarize(combined_text)
    all_sources = [item["source"] for item in information]

    result = []
    for idx, line in enumerate(bullets.split("\n")):
        cleaned = line.strip().lstrip("•-*0123456789. ").strip()
        if cleaned and len(cleaned) > 5:
            result.append(
                {"text": cleaned, "source": all_sources[idx % len(all_sources)]})

    return result if result else [{"text": "Summary information is being processed.", "source": all_sources[0]}]
