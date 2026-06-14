import { useContext } from 'react';

import { ErrorAlertContext, LoaderContext } from '../providers';
import { type CodeErrorType, type DoFetchCallFuncType } from './types';

export const useFetchCalls = () => {
    const { toggleLoader } = useContext(LoaderContext);
    const { showErrorMessage } = useContext(ErrorAlertContext);

    const performFetchCall: DoFetchCallFuncType = async ({
        callMethod,
        callArgs,
        successCallback,
        silent,
    }) => {
        try {
            if (!silent) {
                toggleLoader();
            }

            const response = await callMethod(...(callArgs ?? []));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            successCallback(data);
        } catch (error) {
            const message = (error as CodeErrorType).message;

            if (!silent && message) {
                showErrorMessage(message);
            }
        } finally {
            if (!silent) {
                toggleLoader();
            }
        }
    }

    return {
        performFetchCall,
    };
}