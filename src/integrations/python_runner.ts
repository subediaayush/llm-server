import { BinaryRunner } from "./binary_runner";

export class PythonRunner extends BinaryRunner {

    public constructor (name: string, outputPath: string, args: any) {
        var pCommand = ".\\models\\" + name + "\\app.py";
        var toPass = Object.keys(args).map(key => "${" + key + "}");
        super(name, "python", [pCommand, ...toPass], outputPath, args)
    }

}