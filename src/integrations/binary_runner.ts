import { readFileSync } from "fs";
import { applyCommand } from "./command_processor";
import { execSync } from "child_process";

export class BinaryRunner {

    name: string;
    command: string;
    outputPath: string;
    args: any

    public constructor (name: string, command: string, outputPath: string, args: any) {
        this.name = name;
        this.command = command;
        this.outputPath = outputPath;
        this.args = args;
    }

    run() {
        var processedCommand = applyCommand(this.command, this.args)
        execSync(processedCommand);
        var result = readFileSync(this.outputPath).toString();
        return result;
    }

}