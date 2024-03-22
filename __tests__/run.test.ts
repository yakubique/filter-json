import * as core from '@actions/core';
import * as helper from '../src/io-helper';
import { run } from '../src/run';

import { describe, expect } from '@jest/globals';
import { Types } from '../src/io-helper';


let getInputsMock: jest.SpiedFunction<typeof helper.getInputs>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;

describe('run.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getInputsMock = jest.spyOn(helper, 'getInputs').mockImplementation();
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();
        setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
    });

    it('should filter flat', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                fromFile: false,
                toFile: false,
                input: '[1,2,3,4,5,6]',
                values: ['4', '6'],
                type: Types.FlatJSON
            } as helper.ActionInputs;
        });

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', [1, 2, 3, 5]);
    });

    it('should filter nested', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                fromFile: false,
                toFile: false,
                input: JSON.stringify([{ a: 1 }, { a: 2 }, { a: 3 }]),
                values: ['3', '2'],
                key: 'a',
                type: Types.NestedJSON
            } as helper.ActionInputs;
        });

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', [{ a: 1 }]);
    });

    it('should error', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                input: 'not - json'
            } as helper.ActionInputs;
        });

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).not.toBeCalled();
        expect(setFailedMock).toBeCalled();
    });
});

