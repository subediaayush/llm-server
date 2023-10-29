import { BinaryRunner } from "./binary_runner";
import { PythonRunner } from "./python_runner";

export class WhisperRunner extends BinaryRunner {

    constructor(inputPath: string, outputPath: string) {
        super("whipser", 'whisper "${input_path}" --model tiny.en --fp16 False --output_dir "${output_path}\" --output_format txt', outputPath, {
            "input_path": inputPath,
            "output_path": outputPath
        })
    }

}

export class OpenClipRunner extends PythonRunner {
    constructor(inputPath: string, outputPath: string) {
        super("open_clip", outputPath, {
            "input_path": inputPath,
            "output_path": outputPath
        })
    }
}
