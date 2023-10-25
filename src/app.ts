import { exec } from 'child_process';
import express from 'express';
import path from 'path';
import execute from './execute';
const app = express()
const port = 2475

const upload = require('./upload');

app.get('/prompt', (req: any, res: any) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


// // Initialize multer middleware
// // const upload = multer({ storage });

// // Define a route to handle file uploads
app.post('/audio', upload.single('file'), (req: any, res) => {
    const file = req.file;
    console.log(`Received  ${file}, ${JSON.stringify(file)}`)
    var result = execute(file.path)
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log(`Sending to client ${result}`)
    res.end(result)
});

// app.listen(3000, () => console.log('Server is started at port number 3000'));
