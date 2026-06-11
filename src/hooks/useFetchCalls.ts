import { useContext } from 'react';

import { ErrorAlertContext, LoaderContext } from '../providers';
import { type DoFetchCallFuncType } from './types';

export const useFetchCalls = () => {
    const { toggleLoader } = useContext(LoaderContext);
    const { showErrorMessage } = useContext(ErrorAlertContext);

    const performFetchCall: DoFetchCallFuncType = async ({
        callMethod,
        callArgs,
        successCallback,
    }) => {
        try {
            toggleLoader();

            const response = await callMethod(...(callArgs ?? []));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            successCallback(data);
        } catch (error) {
            if (error.message) {
                showErrorMessage(error.message);
            }
        } finally {
            toggleLoader();
        }
    }

    return {
        performFetchCall,
    };
}