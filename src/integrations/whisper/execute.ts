import { exec, execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

export default function execute(input_path: any) {
    const parent_path = path.dirname(input_path)
    const command = `whisper "${input_path}" --model tiny.en --fp16 False --output_dir "${parent_path}\" --output_format txt`
    console.log("Running command", command)
    try {
        execSync(command).toString()
        const file_name = path.basename(input_path).replace(".wav", ".txt")
        var output_path = parent_path + "\\" + file_name
        console.log("Writing to file ", output_path)
        var result = readFileSync(output_path).toString();
        console.log("Generate output to path", result)
        return result;
    } catch (error) {
        console.log(`Error reading file ${error}`)
    }
}