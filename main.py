import os
import json
from flask import Flask, request, jsonify
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build
from dotenv import load_dotenv  # Import the load_dotenv function

# Load the .env file
load_dotenv()

app = Flask(__name__)

# Load Google Sheets credentials from environment variable
service_account_info = json.loads(os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON'))
credentials = ServiceAccountCredentials.from_json_keyfile_dict(service_account_info, scopes=[
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
])

# The ID and range of the spreadsheet.
SPREADSHEET_ID = '1qGS2gSPCuFgZGRh7yIZXvtibJtrqQ9rrqNfLhIhBJTE'  # Replace with your Spreadsheet ID
RANGE_NAME = 'Transacciones!B:E'  # Replace with your sheet name and range

service = build('sheets', 'v4', credentials=credentials)
sheet = service.spreadsheets()

@app.route('/add_row', methods=['POST'])
def add_row():
    data = request.json  # Get JSON data from the request

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        # Fetch the current data in the range to find the first empty row
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
        values = result.get('values', [])

        # Determine the first empty row based on the length of the fetched values
        next_row = len(values) + 1  # Add 1 since Google Sheets is 1-indexed

        # Define the range for the next row in columns B:E
        target_range = f'Transacciones!B{next_row}:E{next_row}'

        # Assuming data is a dictionary where keys match your spreadsheet headers
        # The list should match the number of columns (B to E => 4 columns)
        values_to_insert = [list(data.values())]

        body = {
            'values': values_to_insert
        }

        # Append the data to the specific range
        result = sheet.values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=target_range,
            valueInputOption="RAW",
            body=body
        ).execute()

        return jsonify({"message": "Row added successfully", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
