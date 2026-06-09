import { useContext } from 'react';

import { LoaderContext } from '../providers';
import { type DoFetchCallFuncType } from './types';

export const useFetchCalls = () => {
    const { toggleLoader } = useContext(LoaderContext);

    const performFetchCall: DoFetchCallFuncType = async ({
        callMethod,
        callArgs,
        successCallback,
    }) => {
        try {
            toggleLoader();

            const response = await callMethod(...(callArgs ?? []));
            const data = await response.json();

            successCallback(data);
        } catch {

        } finally {
            toggleLoader();
        }
    }

    return {
        performFetchCall,
    };
}