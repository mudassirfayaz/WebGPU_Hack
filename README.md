# WebGPU Backend

This project serves as the backend for a WebGPU application. It's designed to process user input, simulate it with WebGPU, and then send the results to the frontend to be visualized.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/djpapzin/webgpu.git
   ```

2. Navigate to the project directory:
   ```bash
   cd webgpu-backend
   ```

3. Install the required packages:
   ```bash
   npm install
   ```

### Running the Server

To start the server, run:

```bash
node server.js
```

The server will start, and you should see a message indicating it's running on `http://localhost:3000`.

## API Endpoints

- **POST /process-input**: Accepts user input for processing.
- **GET /get-graph-data**: Returns the processed data to be visualized on the frontend.

## Future Work

- Integrate WebGPU for data processing.
- Enhance the API for more complex simulations.
- Implement error handling and validation for user input.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
