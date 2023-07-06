from . import MIGRATIONS_FOLDER
import os


def create_empty_migration():

    n = 0
    for file in os.listdir(MIGRATIONS_FOLDER):
        if file.endswith(".py"):
            n += 1
    n += 1

    n = str(n).zfill(4)

    migration = """
def migration(cur):
    pass
"""

    output_file = f"{n}_migration.py"
    with open(f"{MIGRATIONS_FOLDER}/{output_file}", "w") as f:
        f.write(migration)

    print(f"Created migration {output_file}")




