import { ActionInputs, getInputs, Types } from './io-helper';
import { buildOutput, inputJson, outputJson } from '@yakubique/atils/dist';
import * as core from '@actions/core';

enum Outputs {
    result = 'result',
}

export async function run() {
    const setOutputs = buildOutput(Outputs);

    try {
        const inputs: ActionInputs = getInputs();
        const input = inputJson(inputs.input, inputs.fromFile);

        const valuesMap = new Map<string, boolean>();
        inputs.values.forEach((item) => valuesMap.set(item, true));

        let result;

        if (inputs.type === Types.FlatJSON.toString()) {
            result = input.filter((item: any) => !valuesMap.has(item.toString()));
        } else if (inputs.type === Types.NestedJSON.toString()) {
            result = input.filter((item: any) => !valuesMap.has(item[inputs.key].toString()));
        }

        setOutputs({
            result: outputJson(result, inputs.toFile)
        });

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    }
}
