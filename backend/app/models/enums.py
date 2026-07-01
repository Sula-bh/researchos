from enum import StrEnum


class ExperimentStatus(StrEnum):
    DRAFT = "Draft"
    RUNNING = "Running"
    COMPLETED = "Completed"
    ARCHIVED = "Archived"