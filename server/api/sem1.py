from .result_compiler import compile_json_paths, convert_folder_names_to_json_paths, CompiledResult
from .types import UnprocessedStudent
import re
from fastapi import HTTPException


def get_sem1_results(branch : str | None) -> CompiledResult:
    results = [
            'O21_BTECH_I_1446',
            'O21_REV_BTECH_I_1483'
            ]

    if branch is None:
        check = lambda _ : True
    else:
        match = re.match(r"^[AB](\d+)+$", branch, re.IGNORECASE)
        if not match:
            raise HTTPException(status_code=400, detail="Invalid branch code")

        branch = branch.upper()
        check = lambda student : branch in student["rollno"]

    json_paths = convert_folder_names_to_json_paths(results)

    return compile_json_paths(json_paths, check)

