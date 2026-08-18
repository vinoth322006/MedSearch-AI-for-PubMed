"""
Semantic search against PubMed articles using
MongoDB Atlas Automated Embedding.

No local embedding model is required.
Atlas generates the query embedding automatically.
"""


from pymongo import MongoClient

# --------------------------------------------------
# CONFIG
# --------------------------------------------------

CONNECTION_STRING = "mongodb+srv://prabhakar091105_db_user:Bie6lQZ8CxXTiTmu@pubmed-cluster.xdbb694.mongodb.net/"

DB_NAME = "pubmed_demo"
COLLECTION_NAME = "articles"
VECTOR_INDEX_NAME = "vector_index"

# Your Atlas AutoEmbed model
EMBEDDING_MODEL = "voyage-4"

# --------------------------------------------------
# SEMANTIC SEARCH
# --------------------------------------------------

def semantic_search(query_text, top_k=10):

    client = MongoClient(CONNECTION_STRING)

    try:
        collection = client[DB_NAME][COLLECTION_NAME]

        pipeline = [
            {
                "$vectorSearch": {
                    "index": VECTOR_INDEX_NAME,

                    # Your AutoEmbed index is configured
                    # on the "abstract" field
                    "path": "abstract",

                    # Atlas automatically embeds this text
                    "query": {
                        "text": query_text
                    },

                    # Compatible with your AutoEmbed model
                    "model": EMBEDDING_MODEL,

                    "numCandidates": 100,
                    "limit": top_k
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "title": 1,
                    "abstract": 1,
                    "mesh_terms": 1,
                    "authors": 1,
                    "journal": 1,
                    "pub_date": 1,

                    "score": {
                        "$meta": "vectorSearchScore"
                    }
                }
            }
        ]

        results = collection.aggregate(pipeline)

        return list(results)

    finally:
        client.close()


# --------------------------------------------------
# MAIN
# --------------------------------------------------

if __name__ == "__main__":

    query = input(
        "\nEnter your search query: "
    ).strip()

    if not query:
        print("Please enter a query.")
        exit()

    results = semantic_search(
        query,
        top_k=10
    )

    print("\n" + "=" * 80)
    print(f"TOP {len(results)} SEMANTIC SEARCH RESULTS")
    print("=" * 80)

    for i, article in enumerate(results, 1):

        print(f"\n{'─' * 80}")

        print(f"\n{i}. {article.get('title', 'N/A')}")

        print(
            f"\nPMID       : {article.get('_id', 'N/A')}"
        )

        print(
            f"Journal    : {article.get('journal', 'N/A')}"
        )

        print(
            f"Date       : {article.get('pub_date', 'N/A')}"
        )

        print(
            f"Score      : {article.get('score', 0):.6f}"
        )

        mesh = article.get("mesh_terms", [])

        if mesh:
            print(
                "MeSH       : "
                + ", ".join(map(str, mesh[:10]))
            )

        authors = article.get("authors", [])

        if authors:
            print(
                "Authors    : "
                + ", ".join(map(str, authors[:10]))
            )

        print("\nAbstract:")
        print(article.get("abstract", "N/A"))

    print(f"\n{'=' * 80}")
