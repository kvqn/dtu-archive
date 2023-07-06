import importlib
from . import cur, conn
from .list_migrations import _list_local_migrations, _list_remote_migrations

def apply_migrations():

    local_migrations = _list_local_migrations()
    remote_migrations = _list_remote_migrations()

    local_migrations.sort()

    for migration in local_migrations:
        if migration in remote_migrations:
            continue
        print(migration, end=' ')
        try:
            module = importlib.import_module("migrations." + migration)
            if "migration" not in dir(module):
                print("Migration " + migration + " does not have a migration function")
                return
            module.migration(cur)
        except Exception as e:
            print("\n")
            print("Migration " + migration + " failed")
            print(e)
            return
        else:
            conn.commit()
            cur.execute(f"insert into migrations values ('{migration}')")
            conn.commit()
            print("✓")





