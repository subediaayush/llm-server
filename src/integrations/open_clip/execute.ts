import { exec, execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

export function path_test(input_path: String) {
    console.log(input_path)
}

export default function execute(input_path: any) {
    const parent_path = path.dirname(input_path)
    const command = `python .\\src\\models\\open_clip\\app.py "${input_path}" "${parent_path}"`
    execSync(command).toString()
    const output_path = parent_path + "\\output.txt";
    const result = readFileSync(output_path).toString();

    return result
}