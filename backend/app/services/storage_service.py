from __future__ import annotations

from pathlib import Path
from uuid import uuid4

from flask import current_app
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from app.exceptions.file import InvalidFileError

UPLOAD_DIR = Path("uploads")


def save_pdf(project_id: str, file: FileStorage) -> tuple[str, str]:
    """
    Saves a PDF and returns:

    (storage_key, original_file_name)
    """

    original_name = secure_filename(file.filename or "paper.pdf")

    extension = Path(original_name).suffix.lower()

    if extension != ".pdf":
        raise InvalidFileError("Only PDF files are allowed.")

    folder = current_app.config["UPLOAD_DIR"] / project_id
    folder.mkdir(parents=True, exist_ok=True)

    stored_name = f"{uuid4()}{extension}"

    storage_key = str(folder / stored_name)

    file.save(storage_key)

    return storage_key, original_name


def get_file_path(storage_key: str) -> Path:
    """
    Returns the absolute path of a stored file.
    """
    return current_app.config["BASE_DIR"] / storage_key

def file_exists(storage_key: str) -> bool:
    """
    Returns True if the stored file exists.
    """
    return get_file_path(storage_key).exists()


def delete_file(storage_key: str) -> None:
    """
    Deletes a stored file if it exists.
    """
    path = get_file_path(storage_key)

    if path.exists():
        path.unlink()