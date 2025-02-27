const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require( "path" );

// Importing the module 'url' 
const url = require('url');

const app = express();
const PORT = 3000;

// Enable CORS for Angular
app.use(cors());

// Create upload directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original file name
    }
});
const upload = multer({ storage: storage });

// Define upload route
app.post('/uploadFile', (req, res) => {
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Multer error occurred during upload.', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'An unknown error occurred during upload.', error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        console.log('File uploaded successfully:', req.file);
        res.status(200).json({ message: 'File uploaded successfully.' });
    });
});

// Serve uploaded files (optional)
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/uploadedFiles', (req, res) => {
    const filenames = fs.readdirSync(uploadDir);

    const fileurls = [];

    filenames.map((filename) => {
        // console.log(path.resolve(uploadDir,filename))
        console.log(url.pathToFileURL(uploadDir) + filename)
        fileurls.push("http://localhost:3000/uploads/" + filename);
    });

    res.end(JSON.stringify(fileurls));
})