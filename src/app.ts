import { exec } from 'child_process';
import express, { NextFunction } from 'express';
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

app.options('/query', (req: any, res: any) => {
    console.log("Received query options request")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.send('ok')
})

app.post('/query', multerHandler, (req: any, res: any, next: NextFunction) => {
    console.log("Received query request")
    const params = {
        image: req.files.image ? req.files.image[0] : undefined,
        audio: req.files.audio ? req.files.audio[0] : undefined,
        text: req.body.text,
        model: req.body.model,
        output: req.get("Accept")
    }
    
    const definition = modelFactory.getModelDefinition(params)
    if (definition?.isSupported()) {
        res.setHeader("Content-Type", params.output)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "*")
        
        const runner = definition.getRunner()
        console.log(`Obtained runner ${{...runner}}`)
        runner.run((result, err) => {
            if (err) next(err)
            else res.end(result)
            console.log("Sent response ", result ? result : err)
        })
    } else {
        // Send error for now
        console.log("Sent error because not supported", params)
        next(new Error("Model operation not supported"))
    }
    
})

// app.post('whisper/audio', upload.single('file'), (req: any, ) => {
// });


// app.post('open_clip/image', upload.single('audio'), upload.single('image'), (req: any, res) => {
//     const file = req.file;
//     console.log(`Received  ${file}, ${JSON.stringify(file)}`)
//     var result = execute(file.path)
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     console.log(`Sending to client ${result}`)
//     res.end(result)
// });
// app.listen(3000, () => console.log('Server is started at port number 3000'));
