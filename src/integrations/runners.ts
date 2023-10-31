import path from "path";
import { BinaryRunner } from "./binary_runner";
import { PythonRunner } from "./python_runner";

export class WhisperRunner extends BinaryRunner {

    constructor(inputPath: string) {
        const changeFileExtension = (str: string, ext: string) => str.split('.')[0] + `.${ext}`

        const parentPath = path.dirname(inputPath)
        const filename = path.basename(inputPath)

        const outputPath = parentPath + "\\" + changeFileExtension(filename, 'txt')

        super("whisper", "whisper",
            ['${input_path}', '--model', 'tiny.en', '--fp16', 'False', '--output_dir', '${output_path}', '--output_format', 'txt'],
            outputPath,
            {
                "input_path": inputPath,
                "output_path": parentPath
            })

    }


}

export class OpenClipRunner extends PythonRunner {
    constructor(inputPath: string) {
        const parentPath = path.dirname(inputPath)
        const outputPath = parentPath + "\\output.txt"

        super("open_clip", outputPath, [`"${inputPath}"`, `"${parentPath}"`])
    }
}

export class Gpt4AllRunner extends PythonRunner {
    constructor(prompt: string) {
        const outputPath = ".\\uploads"

        super("gpt4all", `${outputPath}\\output.txt`, [prompt, `"${outputPath}"`])
    }
}
