import { exec } from 'child_process';
import express from 'express';
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
    var command = `whisper "${file.path}" --model tiny.en --fp16 False --output_dir ./src/uploads`
    console.log('Executing', command)
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log("Error", err)
            res.send(err)
        }
        else if (stderr) console.log("StdErr", stderr)
        else if (stdout) {
            console.log("StdOut", stdout)
            res.appendHeader("Access-Control-Allow-Origin", "*")
            res.appendHeader("Access-Control-Allow-Headers", "*")
            res.send(stdout);
        }
    })
});

// app.listen(3000, () => console.log('Server is started at port number 3000'));
