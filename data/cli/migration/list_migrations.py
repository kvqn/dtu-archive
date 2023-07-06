from . import cur, MIGRATIONS_FOLDER
import os

def _list_local_migrations():
    local_migrations = []
    for i in os.listdir(MIGRATIONS_FOLDER):
        if i.endswith(".py"):
            local_migrations.append(i[:-3])

    return local_migrations

def _list_remote_migrations():
    remote_migrations = []
    try:
        cur.execute("select * from migrations")
        for i in cur.fetchall():
            remote_migrations.append(i[0])
    except Exception:
        pass

    return remote_migrations


def list_migrations():

    local_migrations = _list_local_migrations()
    remote_migrations = _list_remote_migrations()

    local_migrations.sort()
    # print(local_migrations)

    for i in remote_migrations:
        if i not in local_migrations:
            print("Migration inconsistency. Remote migration not found locally: ", i)
            return

    for i in local_migrations:
        print(f"[{'󰄬' if i in remote_migrations else ' '}] {i}")

