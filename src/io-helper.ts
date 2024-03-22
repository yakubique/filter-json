import * as core from '@actions/core';
import { getBooleanInput, getOptional } from '@yakubique/atils/dist';

export enum Inputs {
    Input = 'input',
    Type = 'type',
    Key = 'key',
    Values = 'values',
    FromFile = 'from_file',
    ToFile = 'to_file',
}

export enum Types {
    FlatJSON = 'flat-json',
    NestedJSON = 'nested-json'
}


export interface ActionInputs {
    input: string;
    type: string;
    key: string;
    values: string[];
    fromFile: boolean;
    toFile: boolean;
}

export function getInputs(): ActionInputs {
    const result: ActionInputs = {} as ActionInputs;

    result.input = `${core.getInput(Inputs.Input, { required: true })}`;
    result.type = getOptional(Inputs.Type, Types.FlatJSON, { required: false });

    if (result.type == Types.NestedJSON) {
        result.key = core.getInput(Inputs.Key, { required: true });
    }

    const values = core.getInput(Inputs.Values, { required: true });
    result.values = values.split(',');

    result.fromFile = getBooleanInput(Inputs.FromFile, { required: false });
    result.toFile = getBooleanInput(Inputs.ToFile, { required: false });

    return result;
}
