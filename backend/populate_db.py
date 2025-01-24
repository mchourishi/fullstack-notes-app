import sys
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

def main():
    try:
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        client.admin.command('ping')  # Check connection
    except ConnectionFailure:
        print("Failed to connect to MongoDB. Please ensure MongoDB is running.")
        sys.exit(1)

    db = client['vicinity_db']
    collection = db['data']

    # Delete existing data in the collection
    delete_result = collection.delete_many({})
    print(f"Deleted {delete_result.deleted_count} documents from the collection.")

    # Sample data to insert
    sample_data = [
        { "message": "Hello from Vicinity!" },
        { "message": "This is a test document." },
        { "message": "Sample data for applicants." },
        { "message": "Good luck with the coding challenge!" }
    ]

    # Insert sample data
    insert_result = collection.insert_many(sample_data)
    print(f"Inserted {len(insert_result.inserted_ids)} documents into the database.")

if __name__ == '__main__':
    main()
