from .create_sem_result import ResultConfig, Result, transform_rollno
import json
import os
import re
import tomlkit


def list_subjects(args):
    """Checks the jsons and prints a list of subjects for the filtered students"""

    config_file = args.config
    if not os.path.exists(config_file):
        print("Config file does not exist.")
        return

    with open(config_file, "r") as f:
        config = ResultConfig.parse_obj(tomlkit.parse(f.read()))

    subjects = dict()
    for file in config.input_files:
        with open(file, "r") as f:
            result : Result = json.load(f)
            for student in result["students"]:
                rollno = student["rollno"]
                if config.do_rollno_transformation:
                    rollno = transform_rollno(rollno, config)
                match = re.match(config.rollno_regex, rollno)
                if not match:
                    continue
                for subject in student["grades"]:
                    if subject not in subjects:
                        subjects[subject] = 0
                    subjects[subject] += 1

    print("Subjects:")
    flag_for_deletion = []
    if "FEC" not in subjects:
        subjects["FEC"] = 0
    for subject, count in subjects.items():
        if subject.startswith("FEC") and subject != "FEC":
            subjects["FEC"] += count
            flag_for_deletion.append(subject)
    if subjects["FEC"] == 0:
        flag_for_deletion.append("FEC")
    for subject in flag_for_deletion:
        del subjects[subject]

    for subject, count in sorted(subjects.items()):
        print(f"{subject} ({count})")





