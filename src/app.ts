import { exec } from 'child_process';
import express from 'express';
import path from 'path';
import execute from './integrations/whisper/execute';
const app = express()
const port = 2475

const upload = require('./upload');

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


app.post('whisper/audio', upload.single('file'), (req: any, res) => {
    const file = req.file;
    console.log(`Received  ${file}, ${JSON.stringify(file)}`)
    var result = execute(file.path)
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log(`Sending to client ${result}`)
    res.end(result)
});


app.post('open_clip/image', upload.single('file'), (req: any, res) => {
    const file = req.file;
    console.log(`Received  ${file}, ${JSON.stringify(file)}`)
    var result = execute(file.path)
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log(`Sending to client ${result}`)
    res.end(result)
});
// app.listen(3000, () => console.log('Server is started at port number 3000'));
