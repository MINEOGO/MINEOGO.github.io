const imageLoader = document.getElementById('imageLoader');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

let img = new Image();
let currentImageLoaded = false;

// --- Initialization ---
downloadBtn.disabled = true; // Disable download initially

// --- Event Listeners ---
imageLoader.addEventListener('change', handleImageUpload);
topTextInput.addEventListener('input', redrawMeme);
bottomTextInput.addEventListener('input', redrawMeme);
downloadBtn.addEventListener('click', downloadMeme);

// --- Functions ---
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img = new Image(); // Create new Image object
            img.onload = () => {
                // Set canvas dimensions based on image
                canvas.width = img.width;
                canvas.height = img.height;
                currentImageLoaded = true;
                downloadBtn.disabled = false; // Enable download
                redrawMeme(); // Initial draw with potentially empty text
            };
            img.onerror = () => {
                console.error("Failed to load image.");
                alert("Error loading image. Please try a different file.");
                currentImageLoaded = false;
                downloadBtn.disabled = true;
            };
            img.src = event.target.result; // Set src AFTER defining onload
        }
        reader.onerror = () => {
            console.error("Failed to read file.");
            alert("Error reading file.");
            currentImageLoaded = false;
            downloadBtn.disabled = true;
        }
        reader.readAsDataURL(file);
    } else {
        // Reset if no file selected (or selection cancelled)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 300; // Reset to default or hide
        canvas.height = 200;
        currentImageLoaded = false;
        downloadBtn.disabled = true;
    }
}

function redrawMeme() {
    if (!currentImageLoaded) return; // Don't draw if no image

    // 1. Draw the base image
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    ctx.drawImage(img, 0, 0);

    // 2. Setup text style (classic Impact meme style)
    const fontSize = Math.floor(canvas.width / 10); // Dynamic font size
    const fontFamily = 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black'; // Outline
    ctx.lineWidth = Math.floor(fontSize / 20); // Outline thickness relative to font size
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top'; // Align top text to top edge

    // 3. Draw Top Text
    const topText = topTextInput.value.toUpperCase();
    const topTextX = canvas.width / 2;
    const topTextY = 10; // Padding from top
    ctx.strokeText(topText, topTextX, topTextY);
    ctx.fillText(topText, topTextX, topTextY);

    // 4. Draw Bottom Text
    ctx.textBaseline = 'bottom'; // Align bottom text to bottom edge
    const bottomText = bottomTextInput.value.toUpperCase();
    const bottomTextX = canvas.width / 2;
    const bottomTextY = canvas.height - 10; // Padding from bottom
    ctx.strokeText(bottomText, bottomTextX, bottomTextY);
    ctx.fillText(bottomText, bottomTextX, bottomTextY);
}

function downloadMeme() {
    if (!currentImageLoaded) return;

    const dataUrl = canvas.toDataURL('image/png'); // Get image data

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'memix-meme.png'; // Filename for the download

    // Trigger the download
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
}

// Initial placeholder message on canvas (optional)
function drawPlaceholder() {
    // Ensure canvas has some initial size if desired
    if (!canvas.width || !canvas.height) {
        canvas.width = 500; // Example default size
        canvas.height = 300;
    }
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Arial';
    ctx.fillText('Upload an image to start', canvas.width / 2, canvas.height / 2);
}

// Call placeholder if no image is loaded yet
if (!currentImageLoaded) {
   // drawPlaceholder(); // Uncomment if you want a placeholder message
}
