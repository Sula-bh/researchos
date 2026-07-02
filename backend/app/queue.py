from redis import Redis
from rq import Queue

from app.config import Config

redis_connection = Redis.from_url(
    Config.REDIS_URL,
)

default_queue = Queue(
    "default",
    connection=redis_connection,
)