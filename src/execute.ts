import { exec, execSync } from "child_process";
import { readFileSync } from "fs";

export default function execute(path: any) {
    const command = `whisper "${path}" --model tiny.en --fp16 False --output_dir ./src/uploads`
    console.log("Running command", command)
    try {
        execSync(`whisper "${path}" --model tiny.en --fp16 False --output_dir ./src/uploads --output_format txt`).toString()
        var outputPath = path.replaceAll(".wav", ".txt") 
        var result = readFileSync(outputPath).toString();
        console.log("Generate output", result)
        return result;
    } catch (error) {
        console.log(`Error reading file ${error}`)
    }
}