import { exec, execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import { PythonRunner } from "../python_runner";

export function path_test(input_path: String) {
    console.log(input_path)
}

export default function execute(input_path: any) {
    const parent_path = path.dirname(input_path)
    return new PythonRunner("open_clip", parent_path, { input_path: input_path }).run()
}