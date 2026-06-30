from __future__ import annotations

from pathlib import Path
from uuid import uuid4

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

    folder = UPLOAD_DIR / project_id
    folder.mkdir(parents=True, exist_ok=True)

    stored_name = f"{uuid4()}{extension}"

    storage_key = str(folder / stored_name)

    file.save(storage_key)

    return storage_key, original_name