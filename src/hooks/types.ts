type CallMethodArgsType = string | number;

type FetchCallHelperArgsType<D> = {
    callMethod: (...args: CallMethodArgsType[]) => Promise<Response>;
    callArgs?: CallMethodArgsType[];
    successCallback: (data: D) => void;
    silent?: boolean;
}

export type DoFetchCallFuncType = <D>(helper: FetchCallHelperArgsType<D>) => Promise<void>;

export type CodeErrorType = {
    message: string;
}