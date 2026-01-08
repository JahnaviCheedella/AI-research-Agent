const fetchResearch = async (topic) => {
  const response = await fetch("http://localhost:8000/research", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to generate report.");
  }

  return response.json();
};

export default fetchResearch;
