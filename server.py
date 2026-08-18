from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from fetch import semantic_search



app = FastAPI(title="PubMed Semantic Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONNECTION_STRING = "mongodb+srv://prabhakar091105_db_user:Bie6lQZ8CxXTiTmu@pubmed-cluster.xdbb694.mongodb.net/"
DB_NAME = "pubmed_demo"
COLLECTION_NAME = "articles"

class SearchRequest(BaseModel):
    query: str
    top_k: int = 10

@app.post("/api/search")
async def search(body: SearchRequest):
    if not body.query:
        raise HTTPException(status_code=400, detail="Query is required")
    results = semantic_search(body.query, top_k=body.top_k)
    return {"results": results}

@app.get("/api/articles/{pmid}")
async def get_article(pmid: str):
    client = MongoClient(CONNECTION_STRING)
    try:
        article = client[DB_NAME][COLLECTION_NAME].find_one({"_id": pmid})
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        article["_id"] = str(article["_id"])
        return article
    finally:
        client.close()

@app.get("/health")
async def health():
    return {"status": "ok"}
