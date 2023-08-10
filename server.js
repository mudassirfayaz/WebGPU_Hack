const express = require('express');
const THREE = require('three');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());


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

    const processedResult = processData(userInput);

    res.json({ success: true, message: 'Data processed successfully!', result: processedResult });
});

app.post('/render', (req, res) => {
    const data = req.body.data;
    const renderedImage = renderWithWebGPU(data);
    res.json({ image: renderedImage });
});

app.post('/process-data', (req, res) => {
    const userInput = req.body.data;

    // For now, we'll just return the data as-is
    res.json({ success: true, message: 'Data processed successfully!', data: userInput });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Route to accept and process user input

