import mariadb
import os
import dotenv

dotenv.load_dotenv()

# Environment variables

MIGRATIONS_FOLDER = str(os.getenv("DTUARCHIVE_MIGRATIONS_FOLDER"))

MARIADB_USER = os.getenv("DTUARCHIVE_MARIADB_USER")
MARIADB_PASS = os.getenv("DTUARCHIVE_MARIADB_PASS")
MARIADB_HOST = os.getenv("DTUARCHIVE_MARIADB_HOST")
MARIADB_PORT = int(str(os.getenv("DTUARCHIVE_MARIADB_PORT")))
MARIADB_DB = os.getenv("DTUARCHIVE_MARIADB_DB")

# BACKUP_MARIADB_USER = os.getenv("DTUARCHIVE_BACKUP_MARIADB_USER")
# BACKUP_MARIADB_PASS = os.getenv("DTUARCHIVE_BACKUP_MARIADB_PASS")
# BACKUP_MARIADB_HOST = os.getenv("DTUARCHIVE_BACKUP_MARIADB_HOST")
# BACKUP_MARIADB_PORT = int(str(os.getenv("DTUARCHIVE_BACKUP_MARIADB_PORT")))
# BACKUP_MARIADB_DB = os.getenv("DTUARCHIVE_BACKUP_MARIADB_DB")

_conn = mariadb.connect(
    database=MARIADB_DB,
    user=MARIADB_USER,
    password=MARIADB_PASS,
    host=MARIADB_HOST,
    port=MARIADB_PORT,
)

if _conn is None:
    print("Error in connecting to database.")
    exit()
conn = _conn

cur = conn.cursor()
