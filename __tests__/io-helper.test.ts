import * as core from '@actions/core';
import { describe, expect } from '@jest/globals';
import { ActionInputs, getInputs, Inputs, Types } from '../src/io-helper';

let getInputMock: jest.SpiedFunction<typeof core.getInput>;

describe('io-helper.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
    });

    it('should get proper input', () => {
        getInputMock.mockImplementation((name, _) => {
            switch (name) {
                case Inputs.Input:
                    return '1,2,3,4,5';
                case Inputs.Type:
                    return Types.NestedJSON;
                case Inputs.Key:
                    return 'a';
                case Inputs.Values:
                    return '1,2,3,4';
                case Inputs.FromFile:
                    return 'false';
                case Inputs.ToFile:
                    return 'false';
                default:
                    return '';
            }
        });

        const inputs = getInputs();
        expect(inputs).toEqual({
            input: '1,2,3,4,5',
            type: 'nested-json',
            key: 'a',
            values: ['1', '2', '3', '4'],
            fromFile: false,
            toFile: false
        } as ActionInputs);
    });
});

