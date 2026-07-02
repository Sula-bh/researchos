import os

from app import create_app
from app.queue import redis_connection
from rq import SimpleWorker, Worker

WorkerClass = SimpleWorker if os.name == "nt" else Worker

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        worker = WorkerClass(
            ["default"],
            connection=redis_connection,
        )

        worker.work()