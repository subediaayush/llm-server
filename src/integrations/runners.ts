import path from "path";
import { BinaryRunner } from "./binary_runner";
import { PythonRunner } from "./python_runner";

export class WhisperRunner extends BinaryRunner {

    constructor(inputPath: string) {
        const parentPath = path.dirname(inputPath)
        const outputPath = parentPath + "\\output.txt"
    
        super("whipser", 'whisper "${input_path}" --model tiny.en --fp16 False --output_dir "${output_path}\" --output_format txt', outputPath, {
            "input_path": inputPath,
            "output_path": outputPath
        })
    }

}

export class OpenClipRunner extends PythonRunner {
    constructor(inputPath: string) {
        const parentPath = path.dirname(inputPath)
        const outputPath = parentPath + "\\output.txt"

        super("open_clip", parentPath, {
            "input_path": inputPath,
            "output_path": outputPath
        })
    }
}
