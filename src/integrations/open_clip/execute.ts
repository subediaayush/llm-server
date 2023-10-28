import { exec, execSync } from "child_process";
import { readFileSync } from "fs";

export function path_test(input_path: String) {
    console.log(input_path)
}

export default function execute(input_path: any) {
    return input_path
    // const command = `python "${input_path}" --model tiny.en --fp16 False --output_dir ./src/uploads`
    // console.log("Running command", command)
    // try {
    //     execSync(command).toString()
    //     var outputPath = input_path.replaceAll(".wav", ".txt") 
    //     var result = readFileSync(outputPath).toString();
    //     console.log("Generate output", result)
    //     return result;
    // } catch (error) {
    //     console.log(`Error reading file ${error}`)
    // }
}