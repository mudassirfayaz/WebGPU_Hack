### User Input
The user is presented with a form where they can input two types of data: a string (e.g., "January" or "China") and an integer (e.g., 400 or 72). The form allows users to add multiple pairs of these data types.

The HTML form is defined in the `public/input.html` file, where users can enter the name and value (%). Users can also add more fields to input additional data pairs.

### Data Processing
Once the user submits the form, the data is collected and sent to the server for processing. The server-side code is defined in the `server.js` file.

1. **Storing Data**: The user input is stored in an SQLite database. The data is inserted into the database with the following SQL command:
   ```sql
   INSERT INTO data (country, rate) VALUES (?, ?)
   ```
   This command is executed for each data entry provided by the user.

2. **Rendering Charts**: The stored data can be used to render bar charts using WebGPU. The server uses Three.js to create a bar chart based on the input data and renders it using WebGPU.

3. **Retrieving Data**: A new endpoint (`/get-data`) is provided to retrieve the stored data from the SQLite database. The data is selected with the following SQL command:
   ```sql
   SELECT country, rate FROM data
   ```
   The retrieved rows are sent to the frontend as a JSON response.

### Summary
The data collection and preprocessing in this project are user-driven. Users input the data through a web form, and the server processes and stores the data in an SQLite database. The data is then used to render visualizations and can be retrieved for further analysis or display.

The code for handling user input is primarily found in the `public/input.html` file, while the server-side processing is implemented in the `server.js` file.