import { readFileSync } from "fs";
import { applyCommand } from "./command_processor";
import { execSync, spawn } from "child_process";

export class BinaryRunner {

    name: string;
    executable: string;
    command: string[];
    outputPath: string;
    args: any
    
    public constructor (name: string, executable: string, command: string[], outputPath: string, args: any) {
        this.name = name;
        this.executable = executable;
        this.command = command;
        this.outputPath = outputPath;
        this.args = args;
    }

    run(cb: (result?: any, err?: any) => void) {
        const commandArgs = applyCommand(this.command, this.args)
        const execution = spawn(this.executable, commandArgs)
        console.log(`${this.executable} ${commandArgs.join(' ')}`)

        execution.stderr.on('data', (d) => {
            console.log(`${this.executable}.err`, d.toString())
        })

        execution.stdout.on('data', (d) => {
            console.log(`${this.executable}.out`, d.toString())
        })

        execution.on('close', (c) => {
            if (c == 0) {
                var result = readFileSync(this.outputPath).toString();
                cb(result)
            } else {
                cb(undefined, new Error(`Process ${this.executable} terminated with error ${c}`))
            }
        })

    }

}