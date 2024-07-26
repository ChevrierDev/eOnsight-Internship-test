import psycopg2

def verify_imported_data():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="bridge_db",
        user="bridge_manager",
        password="g0lden_gat3"
    )

    # Create a cursor object
    with conn.cursor() as cur:
        # Execute a query to fetch all data from the bridges table
        cur.execute("SELECT id, name, ST_AsText(location), inspection_date, status, traffic_load FROM bridges;")
        
        # Fetch all rows from the executed query
        rows = cur.fetchall()
        
        # Print the column headers
        print("id | name | location | inspection_date | status | traffic_load")
        print("---|------|----------|-----------------|--------|--------------")
        
        # Print all rows
        for row in rows:
            print(f"{row[0]} | {row[1]} | {row[2]} | {row[3]} | {row[4]} | {row[5]}")

    # Close the connection
    conn.close()

# Call the function to verify the imported data
if __name__ == "__main__":
    verify_imported_data()
