import { exec, execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import { WhisperRunner } from "../runners";

export default function execute(input_path: any) {

    const parent_path = path.dirname(input_path)
    const file_name = path.basename(input_path).replace(".wav", ".txt")
    var output_path = parent_path + "\\" + file_name

    return new WhisperRunner(input_path, output_path).run()
}