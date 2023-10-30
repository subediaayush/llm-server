import { exec } from 'child_process';
import express from 'express';
import path from 'path';
import execute from './integrations/whisper/execute';
const app = express()
const port = 2475

import { upload } from './upload';
import { ModelDefinitionRegistry } from './model_factory';
import { register } from 'module';

const modelFactory = new ModelDefinitionRegistry();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

const multerHandler = upload.fields([{ name: 'image', count: 1}, { name: 'audio', count: 1}, { name: 'text', count: 1}, { name: 'model', count: 1 }])

app.post('{query}', multerHandler, (req: any, res: any) => {
    const params = {
        image: req.files.image,
        audio: req.files.audio,
        text: req.body.text,
        model: req.body.model,
        output: req.get("Accept")
    }
    
    const definition = modelFactory.getModelDefinition(params)
    if (definition?.isSupported()) {
        res.setHeader("Content-Type", params.output)
        res.setHeader("Access-Control-Allow-Origin", "*")
        
        const runner = definition.getRunner()
        const output = runner.run()
        res.end(output)
    } else {
        // Send error for now
        res.end('Error')
    }
    
})

app.post('whisper/audio', upload.single('file'), (req: any, ) => {
});


app.post('open_clip/image', upload.single('audio'), upload.single('image'), (req: any, res) => {
    const file = req.file;
    console.log(`Received  ${file}, ${JSON.stringify(file)}`)
    var result = execute(file.path)
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log(`Sending to client ${result}`)
    res.end(result)
});
// app.listen(3000, () => console.log('Server is started at port number 3000'));
