# from __future__ import annotations

# import asyncio
# from uuid import UUID

# from app import create_app
# from app.ai import knowledge_service

# PROJECT_ID = UUID("2b46da60-e8ce-48ae-8852-3f37d2f8d571")


# async def main():
#     results = await knowledge_service.search(
#         project_id=PROJECT_ID,
#         query="What is this paper about?",
#     )

#     print("\n========== RESULTS ==========\n")

#     if not results:
#         print("No results found.")
#         return

#     if isinstance(results, list):
#         for i, result in enumerate(results, start=1):
#             print(f"----- Result {i} -----")
#             print(result)
#             print()
#     else:
#         print(results)


# if __name__ == "__main__":
#     app = create_app()

#     with app.app_context():
#         asyncio.run(main())

import asyncio

import cognee
from cognee import SearchType
from cognee.tasks.ingestion.data_item import DataItem


async def main():
    item = DataItem(
    data="ResearchOS metadata test.",
    label="Test Paper",
    external_metadata={
        "document_name": "Test Paper",
        "paper_id": "123",
    },
)

    await cognee.remember(
        item,
        dataset_name="metadata-test",
    )

    results = await cognee.recall(
        query_text="ResearchOS",
        datasets=["metadata-test"],
        query_type=SearchType.CHUNKS,
        include_references=True,
    )

    print(results)


if __name__ == "__main__":
    asyncio.run(main())


