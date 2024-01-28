import * as core from '@actions/core';
import { ActionInputs, getInputs, Types } from './io-helper';

enum Outputs {
    result = 'result',
}

function setOutputs(response: any, log?: boolean) {
    let message = '';
    for (const key in Outputs) {
        const field: string = (Outputs as any)[key];
        if (log) {
            message += `\n  ${field}: ${JSON.stringify(response[field])}`;
        }
        core.setOutput(field, response[field]);
    }

    if (log) {
        core.info('Outputs:' + message);
    }
}

(async function run() {
    try {
        const inputs: ActionInputs = getInputs();
        const input = JSON.parse(inputs.input) as any[]

        const valuesMap = new Map<string, boolean>()
        inputs.values.forEach((item) => valuesMap.set(item, true))

        if (inputs.type === Types.FlatJSON.toString()) {
            setOutputs({
                result: input.filter((item) => !valuesMap.has(item.toString()))
            })
            return
        }

        if (inputs.type === Types.NestedJSON.toString()) {
            setOutputs({
                result: input.filter((item) => !valuesMap.has(item[inputs.key].toString()))
            })
        }

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    }
})();
