import { BinaryRunner } from "./binary_runner";

export class PythonRunner extends BinaryRunner {

    public constructor (name: string, outputPath: string, args: string[]) {
        var pCommand = ".\\models\\" + name + "\\app.py";
        super(name, "python", [pCommand, ...args], outputPath, args)
    }

}