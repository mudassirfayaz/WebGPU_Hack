const express = require('express');
const THREE = require('three');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(cors());

// In-memory storage for the data
let storedData = [];
console.log("Stored data:", storedData);



function setupScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    return { scene, camera };
}

function createBarChart(data) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const bars = [];

    data.forEach((value, index) => {
        const bar = new THREE.Mesh(geometry, material);
        bar.scale.y = value;
        bar.position.x = index * 1.5;
        bars.push(bar);
    });

    return bars;
}

function renderWithWebGPU(data) {
    const renderer = new THREE.WebGPURenderer();
    const { scene, camera } = setupScene();

    const bars = createBarChart(data);
    bars.forEach(bar => scene.add(bar));

    renderer.render(scene, camera);

    const imgData = renderer.domElement.toDataURL("image/png");
    return imgData;
}

function processData(inputData) {
    // Assuming inputData is an array of numbers
    const sum = inputData.reduce((acc, curr) => acc + curr, 0);
    return sum;
}

app.post('/submit-input', (req, res) => {
    const userInput = req.body.data;

    console.log("Received data:", userInput); 

    // Store the data
    storedData.push(userInput);
    console.log("Stored data:", storedData); 

    const processedResult = processData(userInput);
    res.json({ success: true, message: 'Data processed successfully!', result: processedResult });
});

app.post('/render', (req, res) => {
    const data = req.body.data;
    const renderedImage = renderWithWebGPU(data);
    res.json({ image: renderedImage });
});

app.post('/process-data', (req, res) => {
    const inputData = req.body.data;
    storedData = [...storedData, ...inputData];  // Store the data in the array
    console.log("Stored data:", storedData);  // Log the stored data
    res.json({ success: true, message: 'Data processed successfully!', data: inputData });
});

// New endpoint to retrieve the stored data
app.get('/get-data', (req, res) => {
    res.json(storedData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
