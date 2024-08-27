# Flask Google Sheets Integration

This project is a Flask-based web application that interacts with Google Sheets. The application allows you to dynamically add rows to a specific range in a Google Spreadsheet through a REST API. The `SPREADSHEET_ID` and `RANGE_NAME` can be controlled via query parameters.

## Features

- **Add Data to Google Sheets**: Receive JSON data via a POST request and append it as a new row in a specified range of a Google Spreadsheet.
- **Dynamic Control**: Use query parameters to specify the target Google Spreadsheet and the range of cells to update.
- **Environment Variable Management**: Sensitive data such as Google Service Account credentials are securely managed using environment variables and a `.env` file.

## Requirements

- Python 3.6+
- Google Cloud Project with Sheets API enabled
- A Google Spreadsheet to interact with
- Flask
- Google API Client
- Python Dotenv

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/yourprojectname.git
    cd yourprojectname
    ```

2. **Create a Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Setup Google Cloud Credentials**:
    - Create a service account in your Google Cloud project and download the JSON credentials file.
    - Save the JSON credentials in your project directory or store the contents in an environment variable.

5. **Create a `.env` File**:
    Create a `.env` file in the root of your project and add the following environment variables:

    ```bash
    GOOGLE_SERVICE_ACCOUNT_JSON='{"type": "service_account", ...}'  # Your JSON credentials here
    ```

6. **Run the Flask App**:
    ```bash
    python app.py
    ```

## Usage

### Adding a Row to Google Sheets

To add a row to a Google Sheet, send a POST request to the `/add_row` endpoint with the following parameters:

- **Query Parameters**:
    - `spreadsheet_id`: The ID of the Google Spreadsheet.
    - `range_name`: The range of the cells you want to update (e.g., `Sheet1!B:E`).

- **Request Body**:
    - JSON data representing the values to insert. Ensure that the number of values matches the number of columns in the specified range.

#### Example Request

```bash
curl -X POST -H "Content-Type: application/json" -d '{"column1":"value1","column2":"value2"}' \
"http://127.0.0.1:5000/add_row?spreadsheet_id=1qGS2gSPCuFgZGRh7yIZXvtibJtrqQ9rrqNfLhIhBJTE&range_name=Transacciones!B:E"
