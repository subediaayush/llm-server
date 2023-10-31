import path from "path";
import { BinaryRunner } from "./integrations/binary_runner"
import { PythonRunner } from "./integrations/python_runner"
import { OpenClipRunner, WhisperRunner } from "./integrations/runners"
import { MulterFile } from "./interface/file";

export class ModelDefinitionRegistry {

    getModelDefinition(params: ModelDefinitionRootParams): ModelDefinition | undefined {
        switch(params.model) {
            case 'whisper':
                return new WhisperModelDefinition(params);
            case 'open_clip':
                return new OpenClipModelDefinition(params);
        }
    }

}

export class ModelDefinition {

    args: ModelDefinitionRootParams

    constructor(args: ModelDefinitionRootParams) {
        this.args = args;
    }

    getRunner(params?: ModelDefinitionParams | any | undefined): BinaryRunner {
        throw new Error("Not Implemented");
    }
    isSupported(): boolean {
        throw new Error("Not Implemented");
    }
}

interface ModelDefinitionRootParams {
    image: MulterFile;
    audio: MulterFile;
    text: string;
    model: string;
    output: string;
}

export interface ModelDefinitionParams {}

interface WhisperModelDefinitionParams extends ModelDefinitionParams {
    inputPath: string;
}

interface OpenClipModelDefinitionParams extends ModelDefinitionParams {
    inputPath: string;
}

class WhisperModelDefinition extends ModelDefinition {
    
    getRunner(params?: any): BinaryRunner {
        const inputPath = ".\\uploads\\" + path.basename(this.args.audio.path)
        return new WhisperRunner(inputPath)
    }

    isSupported(): boolean {
        return this.args.audio && (this.args.output.startsWith("*/*") || this.args.output.startsWith("text/plain"))
    }
}

class OpenClipModelDefinition extends ModelDefinition {
    
    getRunner(params?: any): BinaryRunner {
        const inputPath = ".\\uploads\\" + path.basename(this.args.image.path)
        return new OpenClipRunner(inputPath)
    }

    isSupported(): boolean {
        return this.args.image && (this.args.output.startsWith("*/*") || this.args.output.startsWith("text/plain"))
    }
}
