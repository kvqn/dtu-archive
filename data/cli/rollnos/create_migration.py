import json
import os

from ..migration.create_empty_migration import new_migration_prefix
from ..migration import MIGRATIONS_FOLDER


def create_migration(rollnos_json):

    with open(rollnos_json) as f:
        rollnos = json.load(f)

    values = []
    for old, new in rollnos.items():
        values.append(f"('{old}', '{new}')")

    query = "insert into rollnos values\n" + ",\n".join(values) + "\n;"

    migration = f"""
# This file was created by rollnos utility.

def migration(cur):

    cur.execute(\"\"\"{query}
    \"\"\")

"""

    n = new_migration_prefix()

    output_file = os.path.join(MIGRATIONS_FOLDER, f"{n}_rollnos.py")

    with open(output_file, "w") as f:
        f.write(migration)

    print(f"Created migration {output_file}")



