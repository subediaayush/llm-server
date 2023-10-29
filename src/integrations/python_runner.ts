import { BinaryRunner } from "./binary_runner";

export class PythonRunner extends BinaryRunner {

    public constructor (name: string, outputPath: string, args: any) {
        var pCommand = "python .\\models\\" + name + "\\app.py";
        Object.keys(args).forEach(key => {
            pCommand = pCommand + " " + key + "=${" + key + "}"
        });
        super(name, pCommand, outputPath, args)
    }

}