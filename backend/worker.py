from app.config import Config
from redis import Redis
from rq import Worker

redis_connection = Redis.from_url(
    Config.REDIS_URL,
)

worker = Worker(
    ["default"],
    connection=redis_connection,
)

if __name__ == "__main__":
    worker.work()