from .result_compiler import compile_json_paths, convert_folder_names_to_json_paths, CompiledResult


def get_sem1_results() -> CompiledResult:
    results = [
            'O21_BTECH_I_1446',
            'O21_REV_BTECH_I_1483'
            ]

    json_paths = convert_folder_names_to_json_paths(results)

    return compile_json_paths(json_paths)

