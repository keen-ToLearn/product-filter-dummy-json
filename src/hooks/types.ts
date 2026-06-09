type CallMethodArgsType = string | number;

type SuccessCallArgsType = string | number;

type FetchCallHelperArgsType = {
    callMethod: (...args: CallMethodArgsType[]) => Promise<Response>;
    callArgs?: CallMethodArgsType[];
    successCallback: (...args: SuccessCallArgsType[]) => void;
}

export type DoFetchCallFuncType = (helper: FetchCallHelperArgsType) => Promise<void>;