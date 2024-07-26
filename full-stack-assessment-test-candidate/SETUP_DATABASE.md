# Setup the database

## Installation (Linux)

### Install PostgreSQL (Linux)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### Install PostGIS extension (Linux)

```bash
sudo apt install postgis postgresql-<version>-postgis-3
```

Replace `<version>` with the specific version numbers of PostgreSQL you are using. The `3` always refers to the latest `postgis` version available. For example, if you are using PostgreSQL 16:

```bash
sudo apt install postgis postgresql-13-postgis-3
```

Verify that PostGIS is installed correctly by running a query to check the PostGIS version:

```sql
SELECT PostGIS_Version();
```

To exit the PostgreSQL prompt, type `\q`.
To exit the PostgreSQL User Session, type `exit`.

## Installation (Windows)

### Install PostgreSQL (Windows)

[Download and install PostgreSQL](https://www.postgresql.org/download/windows/).

Keep the Application Stack Builder to install PostGIS extension later. Don't forget the password and the listening port (default: `5432`) set during the installation.

The path to the `PostgreSQL\16\bin` folder should be in the `PATH` variable. You can check that PosgreSQL is successfully installed with:

```powershell
psql --version
```

You can log into your database (default user: `postgres` with the password set up above):

```powershell
psql -U postgres
```

### Install PostGIS extension (Windows)

* Launch `Application Stack Builder`.
* Select your database version and port.
* Select, download and install PostGIS in `Categories/Spatial Extensions/PostGIS`.

## Create a PostgreSQL database with PostGIS extension

### Create database

Linux:

```bash
sudo -i -u postgres psql
```

Windows:

```powershell
psql -U postgres
```

The DB name is `bridge_db`:

```sql
CREATE DATABASE bridge_db;
```

### Connect to the db

```sql
\c bridge_db
```

### Enable PostGIS Extension

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Verify that PostGIS is installed by listing the extensions in the database

```sql
SELECT * FROM pg_extension;
```

## Create Tables inside the database

```sql
CREATE TABLE bridges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location GEOGRAPHY(Point, 4326),
    inspection_date DATE,
    status VARCHAR(50),
    traffic_load INTEGER
);
```

## Create a `bridge_manager` user

```sql
CREATE USER bridge_manager WITH PASSWORD 'g0lden_gat3';
```

## Grant all privileges on the `bridges` table to the `bridge_manager` user

Make sure you connect to the database first:

```sql
\c bridge_db
```

Then:

```sql
GRANT ALL PRIVILEGES ON TABLE bridges TO bridge_manager;
GRANT USAGE, SELECT ON SEQUENCE bridges_id_seq TO bridge_manager;
GRANT ALL PRIVILEGES ON SCHEMA public TO bridge_manager;
GRANT ALL PRIVILEGES ON DATABASE bridge_db TO bridge_manager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bridge_manager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bridge_manager;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO bridge_manager;
```

## Import data into the database from a CSV file

```bash
py import_csv_to_db.py
```

You may use this script to verify that the data has been successfully inserted into the database:

```bash
py verify_import_csv_to_db.py 
```

or verify manually by querying the table:

```sql
\c bridge_db;
SELECT * FROM bridges;
```

You should get something like this:

```sql
 id |        name        |                      location                      | inspection_date | status | traffic_load
----+--------------------+----------------------------------------------------+-----------------+--------+--------------
  1 | Golden Gate Bridge | 0101000020E610000050FC1873D79A5EC0D0D556EC2FE34240 | 2023-01-01      | Good   |        15000
  2 | Brooklyn Bridge    | 0101000020E61000004182E2C7988F5DC0F46C567DAE064140 | 2023-02-15      | Fair   |        10000
  3 | London Bridge      | 0101000020E6100000AAF1D24D628052C05E4BC8073D5B4440 | 2023-03-10      | Poor   |         5000 
```

## Useful links

* [https://johnmee.com/how-to-reinstall-postgresql-on-ubuntu](https://johnmee.com/how-to-reinstall-postgresql-on-ubuntu)
