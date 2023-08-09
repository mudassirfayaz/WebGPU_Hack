const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Temporary storage for processed data
let processedData = {};

// Route to accept and process user input
app.post('/process-input', (req, res) => {
    const userInput = req.body.data;

    // Corrected the variable name here
    console.log("Received data:", userInput);

    // TODO: Process the userInput using WebGPU
    // For now, let's just mock the processed data
    processedData = {
        graphData: [/*... some mock data based on userInput ...*/]
    };

    res.json({ success: true, message: 'Data processed successfully!' });
});

// Route to send processed data to frontend
app.get('/get-graph-data', (req, res) => {
    res.json(processedData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
